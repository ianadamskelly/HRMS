
'use client';

import { useState } from 'react';
import { DashboardHeader } from "@/components/dashboard-header";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, User, Users, Users2, Filter, GitBranch, ArrowRight, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from '@/components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


const criticalRoles = [
  { id: "ceo", title: "Chief Executive Officer", risk: "High", successors: 1, benchStrength: "Weak" },
  { id: "cfo", title: "Chief Financial Officer", risk: "Medium", successors: 2, benchStrength: "Moderate" },
  { id: "cto", title: "Chief Technology Officer", risk: "Low", successors: 3, benchStrength: "Strong" },
];

const successorsData = [
    { name: "Jane Smith", currentRole: "Chief Operating Officer", readiness: "Ready Now", readinessValue: 100, avatar: "https://picsum.photos/seed/user2/40/40" },
    { name: "John Doe", currentRole: "VP of Product", readiness: "Ready in 1-3 Years", readinessValue: 66, avatar: "https://picsum.photos/seed/user1/40/40" },
];

const gapAnalysisData = {
    required: ["Global Market Strategy", "Investor Relations", "Capital Allocation", "Public Company Governance"],
    current: ["Capital Allocation", "Public Company Governance"],
};

const talentPools = [
    { name: "Future Financial Leaders", size: 12, readiness: "High" },
    { name: "Emerging Tech Leads", size: 8, readiness: "Medium" },
];

const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
        case "High": return "destructive";
        case "Medium": return "secondary";
        case "Low": return "default";
        default: return "outline";
    }
}

const getReadinessBadgeVariant = (readiness: string) => {
    if (readiness.includes("Now")) return "default";
    if (readiness.includes("1-3")) return "secondary";
    if (readiness.includes("3-5")) return "outline";
    return "outline";
};


export default function SuccessionPlanningPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Talent Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Critical Role Mapping */}
                <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-headline flex items-center gap-2"><Users2/> Critical Role Mapping</CardTitle>
                            <CardDescription>Identify and manage roles deemed critical to the organization's success.</CardDescription>
                        </div>
                        <Button><PlusCircle className="mr-2 h-4 w-4"/>Add Critical Role</Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Critical Position</TableHead>
                                    <TableHead>Succession Risk</TableHead>
                                    <TableHead>Identified Successors</TableHead>
                                    <TableHead>Bench Strength</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {criticalRoles.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell className="font-medium">{role.title}</TableCell>
                                        <TableCell><Badge variant={getRiskBadgeVariant(role.risk)}>{role.risk}</Badge></TableCell>
                                        <TableCell>{role.successors}</TableCell>
                                        <TableCell>{role.benchStrength}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">Manage Plan</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Successor Identification & Gap Analysis */}
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Succession Plan for: Chief Executive Officer</CardTitle>
                        <CardDescription>Designated successors and competency gap analysis.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="font-semibold">Successor Candidates</h3>
                            {successorsData.map((s, i) => (
                                <Card key={i} className="p-4">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12"><AvatarImage src={s.avatar} /><AvatarFallback>{s.name.charAt(0)}</AvatarFallback></Avatar>
                                        <div>
                                            <p className="font-bold">{s.name}</p>
                                            <p className="text-sm text-muted-foreground">{s.currentRole}</p>
                                        </div>
                                         <Badge variant={getReadinessBadgeVariant(s.readiness)} className="ml-auto">{s.readiness}</Badge>
                                    </div>
                                    <Progress value={s.readinessValue} className="mt-4 h-2" />
                                </Card>
                            ))}
                        </div>
                        <div className="space-y-4">
                             <h3 className="font-semibold">Competency Gap Analysis (Jane Smith)</h3>
                             <div className="space-y-2">
                                <h4 className="text-sm font-medium">Required Competencies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {gapAnalysisData.required.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                                </div>
                             </div>
                             <div className="space-y-2">
                                <h4 className="text-sm font-medium">Jane's Current Competencies</h4>
                                 <div className="flex flex-wrap gap-2">
                                    {gapAnalysisData.current.map(skill => <Badge key={skill}>{skill}</Badge>)}
                                </div>
                             </div>
                              <div className="space-y-2">
                                <h4 className="text-sm font-medium text-destructive">Identified Gaps</h4>
                                 <div className="flex flex-wrap gap-2">
                                    {gapAnalysisData.required.filter(r => !gapAnalysisData.current.includes(r)).map(gap => <Badge key={gap} variant="destructive">{gap}</Badge>)}
                                </div>
                             </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline">Create Development Plan for Jane Smith <ArrowRight className="ml-2 h-4 w-4"/></Button>
                    </CardFooter>
                 </Card>

                 {/* Organizational Chart Overlay */}
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><GitBranch /> Organizational Chart Overlay</CardTitle>
                        <CardDescription>Visualize the "bench strength" for each key position.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <div className="p-6 border rounded-lg text-center bg-muted">
                            <p className="font-semibold">Interactive Organizational Chart</p>
                            <p className="text-sm text-muted-foreground">Positions are color-coded to indicate bench strength (Green: Strong, Yellow: Moderate, Red: Weak).</p>
                             {/* Placeholder for Org Chart */}
                            <div className="mt-4 text-sm font-mono">
                                <div className="inline-block p-2 border-2 rounded-md bg-red-100 border-red-300">CEO [1]</div>
                                <div className="flex justify-center"><div className="w-px h-6 bg-border"></div></div>
                                <div className="flex justify-around relative before:absolute before:h-px before:bg-border before:w-full before:top-1/2 before:-translate-y-3">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-px h-6 bg-border"></div>
                                        <div className="inline-block p-2 border-2 rounded-md bg-yellow-100 border-yellow-300">CFO [2]</div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                         <div className="w-px h-6 bg-border"></div>
                                        <div className="inline-block p-2 border-2 rounded-md bg-green-100 border-green-300">CTO [3]</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost"><Eye className="mr-2 h-4 w-4"/> View Full Org Chart</Button>
                    </CardFooter>
                 </Card>

                 {/* Talent Pool Management */}
                 <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-headline flex items-center gap-2"><Users /> Talent Pool Management</CardTitle>
                            <CardDescription>Create and maintain dynamic talent pools for project assignments and development.</CardDescription>
                        </div>
                        <Button><PlusCircle className="mr-2 h-4 w-4" />Create Pool</Button>
                    </CardHeader>
                    <CardContent>
                         <div className="flex flex-wrap gap-4 mb-6">
                            <Select defaultValue="all-locations">
                                <SelectTrigger className="w-full sm:w-[200px]"><SelectValue placeholder="Filter by Location" /></SelectTrigger>
                            </Select>
                             <Select defaultValue="all-skills">
                                <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter by Skill" /></SelectTrigger>
                            </Select>
                             <Button variant="outline" className="ml-auto">
                                <Filter className="mr-2 h-4 w-4"/>
                                Filter Pools
                            </Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Talent Pool</TableHead>
                                    <TableHead>Employees in Pool</TableHead>
                                    <TableHead>Average Readiness</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {talentPools.map(pool => (
                                    <TableRow key={pool.name}>
                                        <TableCell className="font-medium">{pool.name}</TableCell>
                                        <TableCell>{pool.size}</TableCell>
                                        <TableCell><Badge variant={pool.readiness === 'High' ? 'default' : 'secondary'}>{pool.readiness}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                 </Card>

            </main>
        </div>
    );
}
