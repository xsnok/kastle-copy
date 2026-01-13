import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Folder } from "lucide-react";

export function TopNav() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-white px-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-2 text-slate-500">
              <Folder size={16} />
              Journeys
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium text-slate-900">
              6abfa5c6-06ec-492f-844f-d4617bae6991
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-4">
        {/* Additional header items if any */}
      </div>
    </header>
  );
}
