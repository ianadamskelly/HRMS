
'use client';

import { DashboardHeader } from "@/components/dashboard-header";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Link as LinkIcon, Users, Target } from "lucide-react";
import Link from "next/link";


const skillGapData = [
  { skill: "React", current: 75, required: 90, gap: 15 },
  { skill: "Node.js", current: 80, required: 85, gap: 5 },
  { skill: "TypeScript", current: 60, required: 80, gap: 20 },
  { skill: "SQL", current: 70, required: 75, gap: 5 },
  { skill: "Project Mgmt", current: 65, required: 85, gap: 20 },
];

const chartConfig = {
    current: { label: "Current Proficiency", color: "hsl(var(--chart-2))" },
    required: { label: "Required Proficiency", color: "hsl(var(--chart-1))" },
};

const complianceData = [
    { course: "Annual Safety Training", department: "All", status: "95% Complete" },
    { course: "Harassment Prevention", department: "All", status: "88% Complete" },
    { course: "Data Privacy (GDPR)", department: "Engineering", status: "92% Complete" },
]

const careerPaths = [
    { currentRole: "Software Engineer", nextRole: "Senior Software Engineer" },
    { currentRole: "Software Engineer", nextRole: "DevOps Engineer" },
]

export default function NeedsAssessmentPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Training & Development" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Skill Inventory & Gap Analysis */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Target /> Skill Inventory & Gap Analysis</CardTitle>
                        <CardDescription>Visualize skill strengths and gaps across teams and departments.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <Select defaultValue="engineering">
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by Team" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="engineering">Engineering</SelectItem>
                                    <SelectItem value="product">Product</SelectItem>
                                    <SelectItem value="design">Design</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue="all">
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by Job Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Levels</SelectItem>
                                    <SelectItem value="junior">Junior</SelectItem>
                                    <SelectItem value="mid">Mid-level</SelectItem>
                                    <SelectItem value="senior">Senior</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                            <BarChart data={skillGapData} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="skill" tickLine={false} tickMargin={10} axisLine={false} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="current" fill="var(--color-current)" radius={4} />
                                <Bar dataKey="required" fill="var(--color-required)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                
                {/* Performance Integration */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><LinkIcon /> Performance Integration</CardTitle>
                        <CardDescription>Identify recurring performance deficiencies that could be resolved through targeted training.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            This section links to the Performance Management module to analyze performance data and identify training needs based on appraisal results.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Link href="/dashboard/performance/performance-appraisal" passHref>
                            <Button variant="outline">
                                Go to Performance Module <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

                {/* Compliance Tracking */}
                <Card>
                     <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Users /> Compliance Tracking</CardTitle>
                        <CardDescription>Identify and track mandatory training needs based on employee role, location, or seniority.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Training Course</TableHead>
                                    <TableHead>Assigned To</TableHead>
                                    <TableHead>Completion Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {complianceData.map((course, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{course.course}</TableCell>
                                        <TableCell>{course.department}</TableCell>
                                        <TableCell><Badge variant="secondary">{course.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                Enroll Group
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Career Path Mapping */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Users /> Career Path Mapping</CardTitle>
                        <CardDescription>Allow employees to view the skills required for their next desired role to drive personalized training requests.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        {careerPaths.map((path, index) => (
                             <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{path.currentRole}</CardTitle>
                                    <CardDescription>Explore next steps</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-center gap-4 text-center">
                                        <div>
                                            <p className="font-semibold">{path.currentRole}</p>
                                            <p className="text-xs text-muted-foreground">Current Role</p>
                                        </div>
                                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold">{path.nextRole}</p>
                                            <p className="text-xs text-muted-foreground">Next Role</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="link" className="p-0">View Skill Requirements</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardContent>
                </Card>

            </main>
        </div>
    );
}
