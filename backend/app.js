require("dotenv").config();
const express = require("express");
const { WebSocketServer } = require("ws");
const { AssemblyAI } = require("assemblyai");

const app = express();
const port = process.env.PORT || 3000;

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY,
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  let realtimeService;
  let isReady = false;

  const startTranscription = async () => {
    try {
      realtimeService = client.streaming.transcriber({
        sampleRate: 16000,
        formatTurns: true,
      });

      realtimeService.on("open", ({ id }) => {
        isReady = true;
        console.log(
          `AssemblyAI Real-time connection opened with session ID: ${id}`
        );
      });

      realtimeService.on("error", (error) => {
        isReady = false;
        console.error("AssemblyAI error:", error);
        ws.send(JSON.stringify({ type: "error", message: error.message }));
      });

      realtimeService.on("close", () => {
        isReady = false;
        console.log("AssemblyAI Real-time connection closed");
      });

      realtimeService.on("transcript", (transcript) => {
        if (!transcript.text) return;
        ws.send(
          JSON.stringify({
            type: "transcript",
            text: transcript.text,
            isFinal: transcript.message_type === "FinalTranscript",
          })
        );
      });

      await realtimeService.connect();
    } catch (error) {
      console.error("Failed to connect to AssemblyAI:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Failed to connect to transcription service",
        })
      );
    }
  };

  startTranscription();

  ws.on("message", (data) => {
    if (realtimeService && isReady) {
      // Data from browser is expected to be binary PCM16 at 16kHz
      try {
        realtimeService.sendAudio(data);
      } catch (err) {
        console.error("Error sending audio to AssemblyAI:", err);
      }
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    if (realtimeService) {
      realtimeService.close();
    }
  });
});

app.get("/", (req, res) => {
  res.send("Transcription server is running");
});
