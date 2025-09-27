import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/context/auth-context';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { signOutUser } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

type DashboardHeaderProps = {
    title: string;
};

export function DashboardHeader({ title }: DashboardHeaderProps) {
    const { user } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOutUser();
        router.push('/login');
    };

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <div className="md:hidden">
                <SidebarTrigger />
            </div>
            <h1 className="flex-1 text-xl font-semibold font-headline">{title}</h1>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar>
                            <AvatarImage src={user?.photoURL || "https://picsum.photos/seed/avatar/40/40"} alt={user?.displayName || "User Avatar"} />
                            <AvatarFallback>{user?.email?.[0].toUpperCase() || 'U'}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.displayName || 'HR Manager'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                        </p>
                    </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
}
