import { validateRequest } from "@/authSlice";
import { redirect } from "next/navigation";
import React from "react";
import StoreProvider from "./StoreProvider";
import SetionProvider from "./SetionProvider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import VideoContextProvider from "./VideoContextProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  if (!session.user) redirect("/login");

  return (
    <StoreProvider>
      <SetionProvider value={session}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="bg-card sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-3">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />

                {/* <Breadcrumb>
                  <BookAppointmentBreadcrumb />
                </Breadcrumb> */}
              </div>
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </SetionProvider>
    </StoreProvider>
  );
}
