"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
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
  Settings,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { 
    href: "/dashboard/recruitment", 
    label: "Recruitment", 
    icon: Users,
    subItems: [
        { href: "/dashboard/recruitment#job-analysis", label: "Job Analysis" },
        { href: "/dashboard/recruitment#sourcing", label: "Sourcing" },
        { href: "/dashboard/recruitment#screening", label: "Screening" },
        { href: "/dashboard/recruitment#interviews", label: "Interviews" },
        { href: "/dashboard/recruitment#selection", label: "Selection" },
    ]
  },
  { 
    href: "/dashboard/onboarding", 
    label: "Onboarding", 
    icon: ClipboardList,
    subItems: [
        { href: "/dashboard/onboarding#paperwork", label: "Paperwork" },
        { href: "/dashboard/onboarding#orientation", label: "Orientation" },
        { href: "/dashboard/onboarding#training", label: "Training" },
        { href: "/dashboard/onboarding#socialization", label: "Socialization" },
    ]
  },
  { 
    href: "/dashboard/training", 
    label: "Training", 
    icon: BookOpen,
    subItems: [
        { href: "/dashboard/training#needs-assessment", label: "Needs Assessment" },
        { href: "/dashboard/training#program-design", label: "Program Design" },
        { href: "/dashboard/training#implementation", label: "Implementation" },
        { href: "/dashboard/training#evaluation", label: "Evaluation" },
    ] 
  },
  { 
    href: "/dashboard/performance", 
    label: "Performance", 
    icon: TrendingUp,
    subItems: [
        { href: "/dashboard/performance#goal-setting", label: "Goal Setting" },
        { href: "/dashboard/performance#continuous-feedback", label: "Continuous Feedback" },
        { href: "/dashboard/performance#performance-appraisal", label: "Performance Appraisal" },
    ]
  },
  { 
    href: "/dashboard/compensation", 
    label: "Payroll", 
    icon: DollarSign,
    subItems: [
        { href: "/dashboard/compensation#calculation", label: "Calculation" },
        { href: "/dashboard/compensation#disbursement", label: "Disbursement" },
        { href: "/dashboard/compensation#record-keeping", label: "Record Keeping" },
        { href: "/dashboard/compensation#compensation-analysis", label: "Compensation Analysis" },
    ]
  },
  { href: "/dashboard/benefits", label: "Benefits", icon: Gift },
  { 
    href: "/dashboard/exit-management", 
    label: "Exit Management", 
    icon: LogOut,
    subItems: [
        { href: "/dashboard/exit-management#resignation-termination", label: "Resignation/Termination" },
        { href: "/dashboard/exit-management#exit-interview", label: "Exit Interview" },
        { href: "/dashboard/exit-management#offboarding", label: "Offboarding" },
    ]
  },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  useEffect(() => {
    // This code will only run on the client side
    setHash(window.location.hash);

    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const isParentActive = (item: any) => {
    if (item.href === '/dashboard' && pathname !== '/dashboard') {
        return false;
    }
    return pathname.startsWith(item.href);
  }

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          {item.subItems ? (
             <Collapsible>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                        asChild={false}
                        isActive={isParentActive(item)}
                        tooltip={item.label}
                        className="justify-between"
                     >
                        <Link href={item.href} className="flex items-center gap-2">
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                        <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="ml-7 mt-1 flex flex-col border-l pl-2">
                        {item.subItems.map((subItem) => (
                            <Link key={subItem.href} href={subItem.href} passHref>
                               <SidebarMenuButton
                                    asChild={false}
                                    isActive={pathname + (hash || '') === subItem.href}
                                    variant="ghost"
                                    className="h-auto justify-start py-1 text-xs"
                                >
                                    {subItem.label}
                                </SidebarMenuButton>
                            </Link>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuButton
                asChild
                isActive={isParentActive(item)}
                tooltip={item.label}
            >
                <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
                </Link>
            </SidebarMenuButton>
          )}
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
