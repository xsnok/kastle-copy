import { Handle, Position } from "@xyflow/react";
import { Zap } from "lucide-react";
import { Button } from "./ui/button";

export interface ActionNodeData {
  label: string;
  description?: string;
  isEnd?: boolean;
}

export function ActionNode({ data }: { data: ActionNodeData }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm min-w-[240px] text-sm overflow-hidden">
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-2 h-2 !bg-slate-400 border-none" 
      />
      
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 p-2 rounded-md border border-slate-100">
              <Zap className="w-4 h-4 text-slate-500 fill-slate-500/20" />
            </div>
            <span className="font-semibold text-slate-700">{data.label}</span>
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            className="h-7 text-[11px] px-3 bg-slate-50 text-slate-500 hover:bg-slate-100 border-none font-medium"
          >
            Prompt
          </Button>
        </div>
        
        {data.description && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <p className="text-slate-500 text-xs leading-relaxed">
              {data.description}
            </p>
          </div>
        )}
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-2 h-2 !bg-slate-400 border-none" 
      />
    </div>
  );
}
