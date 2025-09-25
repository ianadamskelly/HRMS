import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type DashboardHeaderProps = {
    title: string;
};

export function DashboardHeader({ title }: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <div className="md:hidden">
                <SidebarTrigger />
            </div>
            <h1 className="flex-1 text-xl font-semibold font-headline">{title}</h1>
            <Avatar>
                <AvatarImage src="https://picsum.photos/seed/avatar/40/40" alt="User Avatar" />
                <AvatarFallback>HR</AvatarFallback>
            </Avatar>
        </header>
    );
}
