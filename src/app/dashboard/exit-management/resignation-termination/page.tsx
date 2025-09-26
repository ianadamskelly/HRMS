
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Upload, Bell, Shield, FileText, CheckCircle, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const workflowTasks = [
    { id: "hr-notify", department: "HR", task: "Schedule exit interview", status: "Pending" },
    { id: "it-access", department: "IT", task: "Deactivate all system access (scheduled for EOD)", status: "Pending" },
    { id: "facilities-badge", department: "Facilities", task: "Deactivate office access badge", status: "Pending" },
    { id: "payroll-final", department: "Payroll", task: "Prepare final paycheck", status: "Pending" },
    { id: "manager-assets", department: "Manager", task: "Retrieve company assets (laptop, phone)", status: "Pending" },
]

export default function ResignationTerminationPage() {
    const [date, setDate] = useState<Date>();

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Exit Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Separation Case Initiation */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                           <FileText /> Separation Case Initiation
                        </CardTitle>
                        <CardDescription>
                            Digital initiation of the exit process, classifying the separation type, and recording the official last day of employment.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="employee-select">Select Employee</Label>
                                <Select defaultValue="john-doe">
                                    <SelectTrigger id="employee-select">
                                        <SelectValue placeholder="Select an employee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="john-doe">John Doe</SelectItem>
                                        <SelectItem value="jane-smith">Jane Smith</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div>
                                <Label htmlFor="separation-type">Separation Type</Label>
                                <Select>
                                    <SelectTrigger id="separation-type">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="voluntary">Voluntary Resignation</SelectItem>
                                        <SelectItem value="involuntary">Involuntary Termination</SelectItem>
                                        <SelectItem value="retirement">Retirement</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Last Day of Employment</Label>
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
                            <div>
                                <Label htmlFor="document-upload">Upload Documentation (e.g. Resignation Letter)</Label>
                                <div className="flex items-center gap-2 p-4 border-2 border-dashed rounded-lg">
                                    <Upload className="h-6 w-6 text-muted-foreground" />
                                    <Input id="document-upload" type="file" className="text-sm border-none shadow-none pl-0 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Initiate Separation</Button>
                    </CardFooter>
                </Card>

                {/* Automated Workflow & Notifications */}
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Bell /> Automated Workflow & Notifications</CardTitle>
                        <CardDescription>Automatically triggered checklist of tasks and role-based notifications to key internal stakeholders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">The following tasks will be automatically created and assigned upon initiation.</p>
                        <div className="space-y-4">
                            {workflowTasks.map(task => (
                                <div key={task.id} className="flex items-center space-x-3 p-3 bg-secondary rounded-md">
                                    <Checkbox id={task.id} checked={task.status === 'Completed'} />
                                    <div>
                                        <Label htmlFor={task.id}>{task.task}</Label>
                                        <p className="text-xs text-muted-foreground">Owner: {task.department}</p>
                                    </div>
                                    <Badge variant={task.status === 'Completed' ? 'default' : 'outline'} className="ml-auto">
                                        {task.status === "Completed" ? <CheckCircle className="mr-2 h-4 w-4" /> : <Clock className="mr-2 h-4 w-4" />}
                                        {task.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Compliance & Legal Review */}
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Shield /> Compliance & Legal Review</CardTitle>
                        <CardDescription>Flags legal or contractual obligations and provides location-specific templates.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 border border-yellow-200 dark:border-yellow-800/50 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                           <h4 className="font-semibold text-yellow-900 dark:text-yellow-200">Obligations Flagged for John Doe (California):</h4>
                            <ul className="list-disc list-inside mt-2 text-sm text-yellow-800 dark:text-yellow-300">
                                <li>Final paycheck must be paid on the last day of employment.</li>
                                <li>Provide notice of COBRA and unemployment benefits.</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold">Jurisdictional Templates</h4>
                            <p className="text-sm text-muted-foreground">Pre-configured legal document templates for the employee's location and reason for departure.</p>
                            <div className="mt-2 flex gap-4">
                                <Button variant="outline">Separation Agreement (CA)</Button>
                                <Button variant="outline">Final Pay Acknowledgement (CA)</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </main>
        </div>
    );
}
