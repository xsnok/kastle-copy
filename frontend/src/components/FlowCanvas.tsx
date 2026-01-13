import { ReactFlow, Background, Controls, type Node, type Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ActionNode } from "./ActionNode";

const nodeTypes = {
  action: ActionNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "action",
    position: { x: 250, y: 0 },
    data: { label: "Introduction" },
  },
  {
    id: "2",
    type: "action",
    position: { x: 250, y: 150 },
    data: { label: "Verify SSN" },
  },
  {
    id: "3",
    type: "action",
    position: { x: 250, y: 300 },
    data: { label: "Pull Loan Details" },
  },
  {
    id: "4",
    type: "action",
    position: { x: 250, y: 450 },
    data: { label: "Process Payment" },
  },
  {
    id: "5",
    type: "action",
    position: { x: 250, y: 600 },
    data: { label: "End Call", description: "Thank the user and End Call" },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "SSN collected",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "#f8fafc", fillOpacity: 1 },
    labelStyle: { fill: "#64748b", fontWeight: 500, fontSize: 10 },
    style: { stroke: "#e2e8f0", strokeWidth: 2 },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    label: "User verified",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "#f8fafc", fillOpacity: 1 },
    labelStyle: { fill: "#64748b", fontWeight: 500, fontSize: 10 },
    style: { stroke: "#e2e8f0", strokeWidth: 2 },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    label: "New Edge",
    labelBgPadding: [8, 4],
    labelBgBorderRadius: 4,
    labelBgStyle: { fill: "#f8fafc", fillOpacity: 1 },
    labelStyle: { fill: "#64748b", fontWeight: 500, fontSize: 10 },
    style: { stroke: "#e2e8f0", strokeWidth: 2 },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    style: { stroke: "#e2e8f0", strokeWidth: 2 },
  },
];

export function FlowCanvas() {
  return (
    <div className="w-full h-full bg-[#fbfcfd]">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.5 }}
      >
        <Background color="#e2e8f0" variant={"dots" as any} gap={20} size={1} />
        <Controls 
          position="bottom-left" 
          className="bg-white border-slate-200 shadow-sm"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}
