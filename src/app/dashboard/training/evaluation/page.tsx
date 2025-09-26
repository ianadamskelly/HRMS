
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
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { ArrowRight, Book, HelpCircle, Link as LinkIcon, PlusCircle } from "lucide-react";
import Link from "next/link";

const kirkpatrickData = [
  { level: "Reaction", score: 88 },
  { level: "Learning", score: 75 },
  { level: "Behavior", score: 60 },
  { level: "Results", score: 45 },
];

const kirkpatrickChartConfig = {
    score: { label: "Score", color: "hsl(var(--chart-1))" },
};

const roiData = [
  { month: "Jan", roi: 1.2, cost: 5000 },
  { month: "Feb", roi: 1.5, cost: 5500 },
  { month: "Mar", roi: 1.8, cost: 5200 },
  { month: "Apr", roi: 2.1, cost: 6000 },
  { month: "May", roi: 2.5, cost: 5800 },
];

const roiChartConfig = {
    roi: { label: "ROI", color: "hsl(var(--chart-1))" },
};

const kpis = [
    { label: "Reduced Errors", value: "-15%", change: "improvement" },
    { label: "Productivity Score", value: "+12%", change: "improvement" },
    { label: "Employee Turnover", value: "-5%", change: "improvement" },
]

export default function EvaluationPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Training & Development" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Kirkpatrick Model Reporting */}
                <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-headline">Kirkpatrick Model Reporting</CardTitle>
                            <CardDescription>Evaluate training effectiveness across four levels.</CardDescription>
                        </div>
                        <Button variant="outline"><PlusCircle className="mr-2 h-4 w-4"/>Create Survey</Button>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={kirkpatrickChartConfig} className="min-h-[250px] w-full">
                            <BarChart data={kirkpatrickData} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="level" tickLine={false} tickMargin={10} axisLine={false} />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="score" fill="var(--color-score)" radius={4} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                {/* Testing and Quizzing */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Testing and Quizzing</CardTitle>
                        <CardDescription>Create and administer pre- and post-tests to measure knowledge gain.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        <Button><PlusCircle className="mr-2 h-4 w-4"/>Create Quiz</Button>
                        <Button variant="outline"><Book className="mr-2 h-4 w-4"/>Manage Question Bank</Button>
                    </CardContent>
                </Card>

                {/* Training ROI Metrics */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Training ROI Metrics</CardTitle>
                        <CardDescription>Correlate training with key business metrics.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {kpis.map(kpi => (
                                <div key={kpi.label} className="p-4 bg-secondary rounded-lg">
                                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                                    <p className="text-2xl font-bold">{kpi.value}</p>
                                </div>
                            ))}
                        </div>
                        <ChartContainer config={roiChartConfig} className="min-h-[250px] w-full">
                           <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={roiData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis yAxisId="left" />
                                    <Tooltip />
                                    <Legend />
                                    <Line yAxisId="left" type="monotone" dataKey="roi" stroke="var(--color-roi)" strokeWidth={2} name="Training ROI" />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                
                {/* Skills Updating */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><LinkIcon /> Skills Updating</CardTitle>
                        <CardDescription>Close the loop by updating employee skill inventories upon training completion.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            After a training program or certification is successfully completed, the employee's skill inventory can be updated in the Needs Assessment module.
                        </p>
                    </CardContent>
                    <CardFooter>
                       <Link href="/dashboard/training/needs-assessment" passHref>
                           <Button variant="outline">
                                Go to Needs Assessment <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>

            </main>
        </div>
    );
}
