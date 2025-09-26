
'use client';

import { DashboardHeader } from "@/components/dashboard-header";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Send, User, MessageSquare, BarChart2, AlertTriangle, PieChart as PieChartIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { ChartContainer } from "@/components/ui/chart";

const reasonsForLeavingData = [
  { name: 'Compensation', value: 40, fill: 'hsl(var(--chart-1))' },
  { name: 'Management', value: 25, fill: 'hsl(var(--chart-2))'  },
  { name: 'Career Growth', value: 20, fill: 'hsl(var(--chart-3))'  },
  { name: 'Work-Life Balance', value: 10, fill: 'hsl(var(--chart-4))'  },
  { name: 'Other', value: 5, fill: 'hsl(var(--chart-5))'  },
];

const chartConfig = {
  value: {
    label: 'Employees',
  },
  Compensation: {
    label: 'Compensation',
    color: 'hsl(var(--chart-1))',
  },
  Management: {
    label: 'Management',
    color: 'hsl(var(--chart-2))',
  },
  'Career Growth': {
    label: 'Career Growth',
    color: 'hsl(var(--chart-3))',
  },
  'Work-Life Balance': {
    label: 'Work-Life Balance',
    color: 'hsl(var(--chart-4))',
  },
  Other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
}


export default function ExitInterviewPage() {
    const [date, setDate] = useState<Date>();

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Exit Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Exit Interview Scheduling */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <CalendarIcon className="h-6 w-6" /> Exit Interview Scheduling
                        </CardTitle>
                        <CardDescription>Schedule the confidential meeting and send the pre-interview questionnaire.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                             <div>
                                <Label htmlFor="employee-select">Departing Employee</Label>
                                <Select defaultValue="john-doe">
                                    <SelectTrigger id="employee-select">
                                        <SelectValue placeholder="Select an employee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="john-doe">John Doe</SelectItem>
                                        <SelectItem value="jane-smith">Jane Smith (Terminated)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div>
                                <Label>Schedule Interview Date</Label>
                                 <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex gap-4">
                        <Button>Schedule & Send Calendar Invite</Button>
                        <Button variant="outline"><Send className="mr-2 h-4 w-4" /> Send Survey Link</Button>
                    </CardFooter>
                </Card>

                {/* Confidential Feedback Collection */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                           <MessageSquare /> Confidential Feedback Collection
                        </CardTitle>
                        <CardDescription>Structured questionnaire for the HR Representative to conduct the interview with John Doe.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold">Reason for Leaving</h3>
                            <RadioGroup>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="compensation" id="r1" /><Label htmlFor="r1">Compensation/Benefits</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="management" id="r2" /><Label htmlFor="r2">Management/Leadership</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="career" id="r3" /><Label htmlFor="r3">Career Growth/Opportunity</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="balance" id="r4" /><Label htmlFor="r4">Work-Life Balance</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="culture" id="r5" /><Label htmlFor="r5">Company Culture</Label></div>
                            </RadioGroup>
                            <Textarea placeholder="Additional details on reason for leaving..." />
                        </div>
                         <div className="space-y-4">
                            <h3 className="font-semibold">Feedback on Management</h3>
                            <Textarea placeholder="Describe your relationship with your direct manager..." />
                        </div>
                         <div className="space-y-4">
                            <h3 className="font-semibold">Feedback on Role & Responsibilities</h3>
                            <Textarea placeholder="How did you find your day-to-day responsibilities?" />
                        </div>
                         <div className="space-y-4">
                            <h3 className="font-semibold">Final Comments & Suggestions</h3>
                            <Textarea placeholder="Is there anything else you would like to share?" />
                        </div>
                    </CardContent>
                     <CardFooter>
                        <Button>Submit Interview Notes</Button>
                    </CardFooter>
                </Card>

                {/* Data Analysis & Reporting */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <BarChart2 /> Data Analysis & Reporting
                        </CardTitle>
                        <CardDescription>Aggregated insights from all exit interviews.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-4">
                            <h3 className="font-semibold">Key Retention Metrics (Q3 2023)</h3>
                             <div className="grid grid-cols-2 gap-4">
                                <Card className="p-4">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Turnover Rate</CardTitle>
                                    <p className="text-3xl font-bold">8.2%</p>
                                </Card>
                                 <Card className="p-4">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">Cost of Attrition</CardTitle>
                                    <p className="text-3xl font-bold">$1.2M</p>
                                </Card>
                             </div>
                             <div className="flex items-center gap-2 p-3 text-sm rounded-md bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800/50">
                                <AlertTriangle className="h-5 w-5" />
                                <div>
                                    <span className="font-semibold">Actionable Insight:</span> The Engineering department has a 25% higher turnover rate than the company average.
                                </div>
                            </div>
                        </div>
                        <div>
                             <h3 className="font-semibold mb-4">Common Reasons for Leaving</h3>
                             <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
                                <PieChart>
                                    <Tooltip
                                    cursor={false}
                                    content={<div className="text-sm bg-background p-2 rounded-lg border shadow-sm">Custom Tooltip</div>}
                                    />
                                    <Pie
                                        data={reasonsForLeavingData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        labelLine={false}
                                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                    >
                                    {reasonsForLeavingData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                    </Pie>
                                    <Legend content={<div className="text-sm">Custom Legend</div>}/>
                                </PieChart>
                            </ChartContainer>
                        </div>
                    </CardContent>
                </Card>

            </main>
        </div>
    );
}
