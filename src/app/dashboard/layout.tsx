import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { Briefcase } from "lucide-react";
import { DashboardNav } from "@/components/dashboard-nav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 p-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <Briefcase className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="text-lg font-semibold font-headline text-primary">HRM Simplified</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <DashboardNav />
                </SidebarContent>
            </Sidebar>
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
