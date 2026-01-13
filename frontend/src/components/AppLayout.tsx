import * as React from "react";
import {
  MessageSquare,
  Book,
  GitBranch,
  PieChart,
  Plug,
  Castle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const items = [
  { title: "Conversations", icon: MessageSquare },
  { title: "Knowledge", icon: Book },
  { title: "Workflows", icon: GitBranch, active: true },
  { title: "Analytics", icon: PieChart },
  { title: "Integrations", icon: Plug },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen w-full overflow-hidden bg-slate-50">
        <Sidebar collapsible="icon" className="border-r bg-white w-16 group-data-[state=expanded]:w-64">
          <SidebarHeader className="flex items-center justify-center p-4">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-indigo-600 text-white">
              <Castle size={20} />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="px-2 mt-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={item.active}
                    className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                      item.active
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="ml-3 font-medium group-data-[state=collapsed]:hidden">
                      {item.title}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
