
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Link as LinkIcon, Book, User, GitCommitVertical, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const idpData = [
    { 
        employee: { name: "John Doe", avatar: "https://picsum.photos/seed/user1/40/40" },
        progress: 60,
        status: "On Track",
    },
    { 
        employee: { name: "Jane Smith", avatar: "https://picsum.photos/seed/user2/40/40" },
        progress: 25,
        status: "Behind Schedule",
    }
];

const developmentGoals = [
    { goal: "Improve Project Management Skills", status: "In Progress" },
    { goal: "Achieve AWS Solutions Architect Certification", status: "Not Started" },
]

const competencyData = [
    { competency: "Leadership", employeeRating: 6, managerRating: 7 },
    { competency: "Communication", employeeRating: 8, managerRating: 8 },
    { competency: "Technical Acumen", employeeRating: 9, managerRating: 7 },
]

const assignments = [
    { type: "Mentorship", details: "Paired with Jane Smith (VP of Product)", status: "Active" },
    { type: "Stretch Assignment", details: "Lead the 'Phoenix Project' initiative", status: "Planned" },
]

const getStatusBadge = (status: string) => {
    if (status.includes("Track")) return "default";
    if (status.includes("Behind")) return "destructive";
    return "secondary";
}

export default function DevelopmentPlansPage() {

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Talent Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-headline">Individual Development Plans (IDPs)</CardTitle>
                            <CardDescription>
                                Creates and tracks structured, long-term development plans for key employees.
                            </CardDescription>
                        </div>
                        <Button><PlusCircle className="mr-2 h-4 w-4"/> New IDP</Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {idpData.map((plan, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium flex items-center gap-2">
                                             <Avatar className="h-8 w-8">
                                                <AvatarImage src={plan.employee.avatar} alt={plan.employee.name} />
                                                <AvatarFallback>{plan.employee.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            {plan.employee.name}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Progress value={plan.progress} className="w-[60%]" />
                                                <span className="text-xs text-muted-foreground">{plan.progress}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusBadge(plan.status)}>
                                                {plan.status === "Behind Schedule" && <AlertTriangle className="mr-2 h-4 w-4" />}
                                                {plan.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">View Plan</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">IDP Details: John Doe</CardTitle>
                        <CardDescription>Development objectives, actions, and milestones.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {developmentGoals.map((goal, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold">{goal.goal}</p>
                                        <Badge variant={goal.status === "In Progress" ? "secondary" : "outline"}>{goal.status}</Badge>
                                    </div>
                                    <Link href="/dashboard/training/implementation">
                                        <Button variant="ghost" size="sm"><Book className="mr-2 h-4 w-4"/>Assign Course</Button>
                                    </Link>
                                </div>
                                <div className="pl-6 mt-4 space-y-3">
                                    <p className="text-sm flex items-center gap-2"><GitCommitVertical className="h-4 w-4 text-muted-foreground" /> Milestone 1: Complete 'Advanced Project Management' course (Complete)</p>
                                    <p className="text-sm flex items-center gap-2"><GitCommitVertical className="h-4 w-4 text-muted-foreground" /> Milestone 2: Shadow a senior PM on a live project (In Progress)</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Competency Self-Assessment (John Doe)</CardTitle>
                        <CardDescription>Comparison of self-assessment vs. manager assessment.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {competencyData.map((item, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 items-center mb-6 last:mb-0">
                                <Label className="font-semibold">{item.competency}</Label>
                                <div className="space-y-4">
                                     <div className='flex items-center gap-4'>
                                        <span className="w-24 text-sm text-muted-foreground">Employee:</span>
                                        <Slider defaultValue={[item.employeeRating]} max={10} step={1} disabled />
                                        <span className="font-bold w-8 text-center">{item.employeeRating}</span>
                                     </div>
                                      <div className='flex items-center gap-4'>
                                        <span className="w-24 text-sm text-muted-foreground">Manager:</span>
                                        <Slider defaultValue={[item.managerRating]} max={10} step={1} />
                                         <span className="font-bold w-8 text-center">{item.managerRating}</span>
                                     </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><User /> Experiential Assignment Tracking (John Doe)</CardTitle>
                        <CardDescription>Job rotations, stretch assignments, and mentorships.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Assignment Type</TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {assignments.map((a, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">{a.type}</TableCell>
                                        <TableCell>{a.details}</TableCell>
                                        <TableCell><Badge variant="outline">{a.status}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button><PlusCircle className="mr-2 h-4 w-4"/>Log New Assignment</Button>
                    </CardFooter>
                </Card>

            </main>
        </div>
    );
}
