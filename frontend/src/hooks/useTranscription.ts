import { useState, useCallback, useRef } from "react";

export function useTranscription() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isFinal, setIsFinal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  const stopRecording = useCallback(() => {
    setIsRecording(false);

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      // Connect to FastAPI backend
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const ws = new WebSocket(`${protocol}//localhost:8000/ws/transcribe`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("Connected to transcription server");
        setIsRecording(true);
        setTranscript("");
        setError(null);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setTranscript(data.text);
        setIsFinal(data.final);
      };

      ws.onerror = (event) => {
        console.error("WebSocket error:", event);
        setError("Connection error");
      };

      ws.onclose = () => {
        console.log("Disconnected from transcription server");
        stopRecording();
      };

      processor.onaudioprocess = (e) => {
        if (ws.readyState === WebSocket.OPEN) {
          const inputData = e.inputBuffer.getChannelData(0);
          // Convert Float32 to Int16 PCM
          const pcmData = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            const s = Math.max(-1, Math.min(1, inputData[i]));
            pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
          }
          ws.send(pcmData.buffer);
        }
      };

      source.connect(processor);
      processor.connect(audioContext.destination);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Failed to access microphone");
    }
  }, [stopRecording]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  return {
    isRecording,
    transcript,
    isFinal,
    error,
    toggleRecording,
  };
}
