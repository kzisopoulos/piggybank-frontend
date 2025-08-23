import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { AppSidebar } from "./sidebar/app-sidebar";

export default function AppLayout() {
  return (
    <SidebarProvider className="h-full">
      <AppSidebar />
      <main className="h-full w-full flex flex-col">
        <SidebarTrigger />
        <section className="flex-1 px-2 py-3">
          <Outlet />
        </section>
      </main>
    </SidebarProvider>
  );
}
