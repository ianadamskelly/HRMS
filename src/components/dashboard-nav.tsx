"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Users,
  ClipboardList,
  BookOpen,
  TrendingUp,
  DollarSign,
  Gift,
  LogOut,
  LayoutGrid,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/recruitment", label: "Recruitment", icon: Users },
  { href: "/dashboard/onboarding", label: "Onboarding", icon: ClipboardList },
  { href: "/dashboard/training", label: "Training", icon: BookOpen },
  { href: "/dashboard/performance", label: "Performance", icon: TrendingUp },
  { href: "/dashboard/compensation", label: "Compensation", icon: DollarSign },
  { href: "/dashboard/benefits", label: "Benefits", icon: Gift },
  { href: "/dashboard/exit-management", label: "Exit Management", icon: LogOut },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
