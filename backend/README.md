# Real-Time Transcription Backend

FastAPI backend for real-time audio transcription using AssemblyAI's streaming API.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment variables:
- Copy `.env.example` to `.env`
- Add your AssemblyAI API key to `.env`

3. Run the server:
```bash
python main.py
```

Or with uvicorn directly:
```bash
uvicorn main:app --host 0.0.0.0 --port 3000 --reload
```

## API Endpoints

### GET: `/`
Root endpoint that returns server info.

### WebSocket: `/ws`
Real-time audio transcription endpoint.

**Input:** Raw PCM audio data (Int16Array, 16kHz sample rate)

**Output:** JSON messages
```json
{
  "type": "transcript",
  "text": "transcribed text",
  "isFinal": true
}
```

### GET: `/health`
Health check endpoint.

## Configuration

The server uses the following AssemblyAI streaming parameters:
- Sample rate: 16kHz
- Format turns: enabled
- End of turn confidence threshold: 0.7
- Language: English

Adjust these in `main.py` if needed.
