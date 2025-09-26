
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Badge } from "@/components/ui/badge";
import { AlertCircle, SlidersHorizontal, BarChart2, Link, Edit, Users, Eye } from "lucide-react";

const jobGrades = [
  { grade: "P1", min: 60000, mid: 75000, max: 90000 },
  { grade: "P2", min: 80000, mid: 100000, max: 120000 },
  { grade: "P3", min: 110000, mid: 135000, max: 160000 },
  { grade: "M1", min: 140000, mid: 170000, max: 200000 },
  { grade: "M2", min: 180000, mid: 220000, max: 260000 },
];

const marketComparisonData = [
  { role: "Software Engineer", internal: 100000, market50th: 105000, market75th: 125000 },
  { role: "Product Manager", internal: 135000, market50th: 140000, market75th: 160000 },
  { role: "UX Designer", internal: 90000, market50th: 95000, market75th: 110000 },
];

const payEquityData = [
  { group: "Male", avgSalary: 115000 },
  { group: "Female", avgSalary: 112000 },
  { group: "Group C", avgSalary: 118000 },
  { group: "Group D", avgSalary: 110000 },
];

const chartConfig = {
  avgSalary: {
    label: "Avg. Salary",
    color: "hsl(var(--chart-1))",
  },
};


export default function SalaryStructurePage() {
    const [proposedSalary, setProposedSalary] = useState(125000);
    const band = jobGrades.find(g => proposedSalary >= g.min && proposedSalary <= g.max);


    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Benefits" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><SlidersHorizontal /> Job Grading and Banding</CardTitle>
                        <CardDescription>Define and maintain a structure that groups similar jobs into grades and pay bands.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Grade</TableHead>
                                        <TableHead>Minimum Salary</TableHead>
                                        <TableHead>Midpoint</TableHead>
                                        <TableHead>Maximum Salary</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {jobGrades.map(grade => (
                                        <TableRow key={grade.grade}>
                                            <TableCell className="font-bold">{grade.grade}</TableCell>
                                            <TableCell className="font-mono">${grade.min.toLocaleString()}</TableCell>
                                            <TableCell className="font-mono">${grade.mid.toLocaleString()}</TableCell>
                                            <TableCell className="font-mono">${grade.max.toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="bg-muted/50 p-6 rounded-lg">
                            <h3 className="font-semibold mb-4">Modeling Tool</h3>
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">Model the financial impact of changing pay bands.</p>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select Grade" /></SelectTrigger>
                                    <SelectContent>
                                        {jobGrades.map(g => <SelectItem key={g.grade} value={g.grade}>{g.grade}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <div className="space-y-2">
                                    <Label>Adjust Midpoint (%)</Label>
                                    <Input type="number" defaultValue="5" />
                                </div>
                                <Button className="w-full">Calculate Impact</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Link /> Market Data Integration</CardTitle>
                        <CardDescription>Benchmark internal pay rates against real-time market data.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Internal Midpoint</TableHead>
                                    <TableHead>Market 50th Percentile</TableHead>
                                    <TableHead>Market 75th Percentile</TableHead>
                                    <TableHead>Compa-Ratio (vs 75th)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {marketComparisonData.map(data => {
                                    const ratio = (data.internal / data.market75th) * 100;
                                    return (
                                        <TableRow key={data.role}>
                                            <TableCell className="font-medium">{data.role}</TableCell>
                                            <TableCell className="font-mono">${data.internal.toLocaleString()}</TableCell>
                                            <TableCell className="font-mono">${data.market50th.toLocaleString()}</TableCell>
                                            <TableCell className="font-mono">${data.market75th.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge variant={ratio < 95 ? "destructive" : ratio > 105 ? "secondary" : "default"}>{ratio.toFixed(1)}%</Badge>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="gap-4">
                        <Button>Refresh Market Data</Button>
                        <Button variant="outline"><Edit className="mr-2 h-4 w-4"/> Set Custom Benchmarks</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><BarChart2 /> Pay Equity Analysis</CardTitle>
                        <CardDescription>Analyze compensation data for potential pay disparities based on protected characteristics.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                            <BarChart data={payEquityData} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="group" tickLine={false} tickMargin={10} axisLine={false} />
                                <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                                <Tooltip
                                    cursor={false}
                                    formatter={(value) => `$${Number(value).toLocaleString()}`}
                                />
                                <Bar dataKey="avgSalary" fill="var(--color-avgSalary)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter className="gap-4">
                        <Button variant="outline"><Users className="mr-2 h-4 w-4"/> Filter by Department</Button>
                        <Button variant="outline"><Eye className="mr-2 h-4 w-4"/> View Detailed Report</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Salary Change Workflow</CardTitle>
                        <CardDescription>Manages the approval process for new hire salaries, promotions, transfers, and merit increases.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="font-semibold">Guardrails</h3>
                            <p className="text-sm text-muted-foreground">Test a proposed salary against the defined pay bands.</p>
                            <div className="space-y-2">
                                <Label>Job Grade</Label>
                                <Select defaultValue="P2">
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {jobGrades.map(g => <SelectItem key={g.grade} value={g.grade}>{g.grade} - {g.min.toLocaleString()} to {g.max.toLocaleString()}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="proposed-salary">Proposed Salary</Label>
                                <Input id="proposed-salary" type="number" value={proposedSalary} onChange={(e) => setProposedSalary(Number(e.target.value))} />
                            </div>
                        </div>
                        <div className="flex items-center justify-center p-6 bg-muted/50 rounded-lg">
                            {band ? (
                                <div className="text-center">
                                    <p className="text-lg">Proposed salary is within the</p>
                                    <p className="text-3xl font-bold text-primary">{band.grade} Grade</p>
                                    <p className="text-muted-foreground mt-2">({`$${band.min.toLocaleString()} - $${band.max.toLocaleString()}`})</p>
                                </div>
                            ) : (
                                <div className="text-center text-destructive flex items-center gap-2">
                                    <AlertCircle />
                                    <div>
                                        <p className="text-lg font-semibold">Salary is outside of defined bands.</p>
                                        <p className="text-sm">Please adjust or provide justification.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

            </main>
        </div>
    );
}
