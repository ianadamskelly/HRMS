
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
import { PlusCircle, Calendar as CalendarIcon, Upload, ArrowRight, PieChart as PieChartIcon, BarChart, Users, Link as LinkIcon, Download } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';


const sessions = [
    { name: "Q4 2023 Engineering Talent Review", date: "2023-11-28", status: "Completed" },
    { name: "Annual Leadership Review 2023", date: "2023-12-15", status: "Scheduled" },
];

const documents = [
    { name: "Q4 Performance Summary.pdf", size: "2.5MB" },
    { name: "High-Potential Employee List.xlsx", size: "450KB" },
    { name: "Succession Plan Draft.pptx", size: "5.2MB" },
];

const diversityData = [
  { name: 'Group A', value: 40, fill: 'hsl(var(--chart-1))' },
  { name: 'Group B', value: 25, fill: 'hsl(var(--chart-2))' },
  { name: 'Group C', value: 20, fill: 'hsl(var(--chart-3))' },
  { name: 'Other', value: 15, fill: 'hsl(var(--chart-5))' },
];

const nineBoxDistribution = [
    { name: 'Future Leader', count: 5 },
    { name: 'Core Employee', count: 12 },
    { name: 'High Impact Performer', count: 8 },
    { name: 'Underperformer', count: 2 },
];


const actionItems = [
    { assignee: { name: "Jane Smith", avatar: "https://picsum.photos/seed/user2/40/40" }, action: "Finalize IDP", status: "Completed" },
    { assignee: { name: "John Doe", avatar: "https://picsum.photos/seed/user1/40/40" }, action: "Confirm as successor for CTO", status: "In Progress" },
    { assignee: { name: "Michael Chen", avatar: "https://picsum.photos/seed/user5/40/40" }, action: "Approve promotion path", status: "Pending" },
]


export default function TalentReviewPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Talent Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-headline flex items-center gap-2"><CalendarIcon /> Talent Review Session Scheduling</CardTitle>
                            <CardDescription>Manage the workflow for formal talent review meetings.</CardDescription>
                        </div>
                        <Button><PlusCircle className="mr-2 h-4 w-4"/>Schedule New Review</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-8">
                             <div>
                                <h3 className="font-semibold mb-4">Upcoming/Past Sessions</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Session Name</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sessions.map((s, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium">{s.name}</TableCell>
                                                <TableCell>{s.date}</TableCell>
                                                <TableCell><Badge variant={s.status === 'Completed' ? 'secondary' : 'default'}>{s.status}</Badge></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                             </div>
                             <div>
                                <h3 className="font-semibold mb-4">Document Repository (Q4 2023 Review)</h3>
                                <div className="space-y-3">
                                    {documents.map((doc, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 bg-secondary rounded-md">
                                            <div>
                                                <p className="font-medium text-sm">{doc.name}</p>
                                                <p className="text-xs text-muted-foreground">{doc.size}</p>
                                            </div>
                                            <Button variant="ghost" size="sm"><Download className="mr-2 h-4 w-4"/>Download</Button>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" className="mt-4 w-full"><Upload className="mr-2 h-4 w-4"/>Upload Preparatory Materials</Button>
                             </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><BarChart /> Visual Reporting Dashboards</CardTitle>
                        <CardDescription>Executive summaries and interactive reports on key talent metrics.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div>
                             <h3 className="font-semibold mb-4 text-center">9-Box Distribution</h3>
                             <ChartContainer config={{}} className="mx-auto aspect-square h-[250px]">
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={nineBoxDistribution} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis dataKey="name" type="category" width={120} />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="hsl(var(--chart-1))" />
                                    </BarChart>
                                </ResponsiveContainer>
                             </ChartContainer>
                             <div className="text-center mt-2">
                                <Link href="/dashboard/talent-management/high-potential">
                                     <Button variant="link">Drill-Down to 9-Box Grid <ArrowRight className="ml-2 h-4 w-4"/></Button>
                                </Link>
                             </div>
                        </div>
                         <div>
                             <h3 className="font-semibold mb-4 text-center">Talent Pipeline Diversity</h3>
                             <ChartContainer config={{}} className="mx-auto aspect-square h-[250px]">
                                <PieChart>
                                    <Tooltip cursor={false} />
                                    <Pie data={diversityData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        {diversityData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Users /> Action Recording & Workflow Triggers</CardTitle>
                        <CardDescription>Systematically record finalized decisions and trigger next steps in other modules.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Assignee</TableHead>
                                    <TableHead>Action Item</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Trigger Next Step</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {actionItems.map((item, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium flex items-center gap-2">
                                            <Avatar className="h-8 w-8"><AvatarImage src={item.assignee.avatar} /><AvatarFallback>{item.assignee.name.charAt(0)}</AvatarFallback></Avatar>
                                            {item.assignee.name}
                                        </TableCell>
                                        <TableCell>{item.action}</TableCell>
                                        <TableCell><Badge variant={item.status === 'Completed' ? 'default' : 'secondary'}>{item.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Link href="/dashboard/talent-management/development-plans">
                                                <Button variant="outline" size="sm" disabled={item.status === 'Completed'}>
                                                    <LinkIcon className="mr-2 h-4 w-4"/>
                                                    Update IDP/Succession
                                                </Button>
                                            </Link>
                                        </TableCell>
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

