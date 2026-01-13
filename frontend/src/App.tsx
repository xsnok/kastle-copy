import "./App.css";
import { AppLayout } from "./components/AppLayout";
import { TopNav } from "./components/TopNav";
import { FlowCanvas } from "./components/FlowCanvas";
import { FloatingToolbar } from "./components/FloatingToolbar";

function App() {
  return (
    <AppLayout>
      <TopNav />
      <div className="flex-1 relative overflow-hidden">
        <FlowCanvas />
        <FloatingToolbar />
      </div>
    </AppLayout>
  );
}

export default App;
