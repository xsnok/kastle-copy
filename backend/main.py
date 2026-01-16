import asyncio
import json
import logging
from typing import Type

import assemblyai as aai
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from assemblyai.streaming.v3 import (
    BeginEvent,
    StreamingClient,
    StreamingClientOptions,
    StreamingError,
    StreamingEvents,
    StreamingParameters,
    StreamingSessionParameters,
    TerminationEvent,
    TurnEvent,
)

from dotenv import load_dotenv
import os

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

API_KEY = os.getenv("ASSEMBLYAI_API_KEY")

app = FastAPI()

# Add CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def register_handlers(client: StreamingClient, websocket: WebSocket, loop):

    def on_begin(self: Type[StreamingClient], event: BeginEvent):
        logger.info(f"Session started: {event.id}")

    def on_turn(self: Type[StreamingClient], event: TurnEvent):
        payload = {
            "text": event.transcript,
            "final": event.end_of_turn,
        }

        # Use run_coroutine_threadsafe to send from AssemblyAI's thread
        asyncio.run_coroutine_threadsafe(
            websocket.send_text(json.dumps(payload)),
            loop
        )

        if event.end_of_turn and not event.turn_is_formatted:
            self.set_params(
                StreamingSessionParameters(format_turns=True)
            )

    def on_terminated(self: Type[StreamingClient], event: TerminationEvent):
        logger.info(
            f"Session terminated: {event.audio_duration_seconds}s processed"
        )

    def on_error(self: Type[StreamingClient], error: StreamingError):
        logger.error(f"AssemblyAI error: {error}")

    client.on(StreamingEvents.Begin, on_begin)
    client.on(StreamingEvents.Turn, on_turn)
    client.on(StreamingEvents.Termination, on_terminated)
    client.on(StreamingEvents.Error, on_error)

@app.websocket("/ws/transcribe")
async def websocket_transcribe(websocket: WebSocket):
    await websocket.accept()

    # Get the current event loop
    loop = asyncio.get_running_loop()

    client = StreamingClient(
        StreamingClientOptions(
            api_key=API_KEY,
            api_host="streaming.assemblyai.com",
        )
    )

    register_handlers(client, websocket, loop)

    client.connect(
        StreamingParameters(
            sample_rate=16000,
            format_turns=True,
            end_of_turn_confidence_threshold=0.7,
            min_end_of_turn_silence_when_confident=160,
            max_turn_silence=2400,
            language="en",
        )
    )

    try:
        while True:
            audio_chunk = await websocket.receive_bytes()
            client.stream(audio_chunk)

    except WebSocketDisconnect:
        logger.info("Client disconnected")

    finally:
        client.close()
