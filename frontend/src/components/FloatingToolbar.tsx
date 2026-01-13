import { Button } from "./ui/button";
import { Zap, Plus, SlidersHorizontal } from "lucide-react";
import { Separator } from "./ui/separator";

interface FloatingToolbarProps {
  isRecording: boolean;
  toggleRecording: () => void;
}

export function FloatingToolbar({
  isRecording,
  toggleRecording,
}: FloatingToolbarProps) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white border shadow-lg rounded-full px-4 py-2 flex items-center gap-2 z-50">
      <Button
        variant="ghost"
        className={`gap-2 rounded-full px-4 transition-colors ${
          isRecording
            ? "bg-red-50 text-red-600 hover:bg-red-100"
            : "hover:bg-slate-50"
        }`}
        onClick={toggleRecording}
      >
        <Zap
          size={16}
          className={isRecording ? "text-red-600" : "text-slate-600"}
        />
        <span className="text-sm font-medium">
          {isRecording ? "Stop Workflow" : "Test Workflow"}
        </span>
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <div className="flex flex-col items-center px-4 leading-tight">
        <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
          Fri Aug 16
        </span>
        <span className="text-xs text-slate-600">5:03 PM PDT</span>
      </div>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Button
        variant="ghost"
        className="gap-2 rounded-full px-4 hover:bg-slate-50"
      >
        <Plus size={16} className="text-slate-600" />
        <span className="text-sm font-medium">Add node</span>
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-slate-50"
      >
        <SlidersHorizontal size={16} className="text-slate-600" />
      </Button>
    </div>
  );
}
