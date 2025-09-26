
"use client";

import React from "react";
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
    id: "recruitment",
    label: "Recruitment", 
    icon: Users,
    subItems: [
        { href: "/dashboard/recruitment/job-analysis", label: "Job Analysis" },
        { href: "/dashboard/recruitment/sourcing", label: "Sourcing" },
        { href: "/dashboard/recruitment/screening", label: "Screening" },
        { href: "/dashboard/recruitment/interviews", label: "Interviews" },
        { href: "/dashboard/recruitment/selection", label: "Selection" },
    ]
  },
  { 
    id: "onboarding",
    label: "Onboarding", 
    icon: ClipboardList,
    subItems: [
        { href: "/dashboard/onboarding/paperwork", label: "Paperwork" },
        { href: "/dashboard/onboarding/orientation", label: "Orientation" },
        { href: "/dashboard/onboarding/training", label: "Training" },
        { href: "/dashboard/onboarding/socialization", label: "Socialization" },
    ]
  },
  { 
    id: "training",
    label: "Training", 
    icon: BookOpen,
    subItems: [
        { href: "/dashboard/training/needs-assessment", label: "Needs Assessment" },
        { href: "/dashboard/training/program-design", label: "Program Design" },
        { href: "/dashboard/training/implementation", label: "Implementation" },
        { href: "/dashboard/training/evaluation", label: "Evaluation" },
    ] 
  },
  { 
    id: "performance",
    label: "Performance", 
    icon: TrendingUp,
    subItems: [
        { href: "/dashboard/performance/goal-setting", label: "Goal Setting" },
        { href: "/dashboard/performance/continuous-feedback", label: "Continuous Feedback" },
        { href: "/dashboard/performance/performance-appraisal", label: "Performance Appraisal" },
    ]
  },
  { 
    id: "payroll",
    label: "Payroll", 
    icon: DollarSign,
    subItems: [
        { href: "/dashboard/compensation/calculation", label: "Calculation" },
        { href: "/dashboard/compensation/disbursement", label: "Disbursement" },
        { href: "/dashboard/compensation/record-keeping", label: "Record Keeping" },
        { href: "/dashboard/compensation/compensation-analysis", label: "Compensation Analysis" },
    ]
  },
  { 
    id: "benefits",
    label: "Benefits", 
    icon: Gift,
    subItems: [
        { href: "/dashboard/benefits/salary-structure", label: "Salary Structure" },
        { href: "/dashboard/benefits/incentives", label: "Incentives" },
        { href: "/dashboard/benefits/benefits", label: "Benefits" },
    ]
  },
  { 
    id: "exit",
    label: "Exit Management", 
    icon: LogOut,
    subItems: [
        { href: "/dashboard/exit-management/resignation-termination", label: "Resignation/Termination" },
        { href: "/dashboard/exit-management/exit-interview", label: "Exit Interview" },
        { href: "/dashboard/exit-management/offboarding", label: "Offboarding" },
    ]
  },
  { 
    id: "settings",
    label: "Settings", 
    icon: Settings,
    subItems: [
        { href: "/dashboard/settings/organization", label: "Organization" },
        { href: "/dashboard/settings/roles", label: "Roles" },
        { href: "/dashboard/settings/employees", label: "Employees" },
        { href: "/dashboard/settings/integrations", label: "Integrations" },
        { href: "/dashboard/settings/templates", label: "Templates" },
    ]
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  const isParentActive = (item: any) => {
    if (item.href === '/dashboard' && pathname !== '/dashboard') {
        return false;
    }
    if(item.href) {
        return pathname.startsWith(item.href);
    }
    if(item.subItems) {
        return item.subItems.some((sub:any) => pathname.startsWith(sub.href));
    }
    return false;
  }

  // A helper to construct the main link for a collapsible menu
  const getParentHref = (item: any) => {
    if (item.href) return item.href;
    if (item.subItems && item.subItems.length > 0) {
      return item.subItems[0].href;
    }
    return '#';
  }

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          {item.subItems ? (
             <Collapsible key={item.id} defaultOpen={isParentActive(item)}>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                        asChild={false}
                        isActive={isParentActive(item)}
                        tooltip={item.label}
                        className="justify-between"
                     >
                        <Link href={getParentHref(item)} className="flex items-center gap-2">
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
                                    isActive={pathname === subItem.href}
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
                <Link href={item.href!}>
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
