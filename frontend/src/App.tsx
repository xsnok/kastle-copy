import "./App.css";
import { AppLayout } from "./components/AppLayout";
import { TopNav } from "./components/TopNav";
import { FlowCanvas } from "./components/FlowCanvas";
import { FloatingToolbar } from "./components/FloatingToolbar";
import { LiveCaptions } from "./components/LiveCaptions";
import { useTranscription } from "./hooks/useTranscription";

function App() {
  const { isRecording, transcript, isFinal, toggleRecording, error } =
    useTranscription();

  return (
    <AppLayout>
      <TopNav />
      <div className="flex-1 relative overflow-hidden">
        <FlowCanvas />
        <LiveCaptions
          transcript={transcript}
          isRecording={isRecording}
          isFinal={isFinal}
          error={error}
        />
        <FloatingToolbar
          isRecording={isRecording}
          toggleRecording={toggleRecording}
        />
      </div>
    </AppLayout>
  );
}

export default App;
