
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Book, Check, SlidersHorizontal, Workflow, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const overtimeRules = [
    { jurisdiction: "Federal (USA)", rule: "1.5x pay over 40 hours/week" },
    { jurisdiction: "California", rule: "1.5x pay over 8 hours/day, 2x over 12 hours/day" },
    { jurisdiction: "New York", rule: "1.5x pay over 40 hours/week (specific industries vary)" },
];

const flaggedViolations = [
    { employee: "John Doe", date: "2023-11-21", violation: "Late Clock-in", details: "Clocked in at 09:15 for 09:00 shift", status: "Pending" },
    { employee: "Jane Smith", date: "2023-11-20", violation: "Missed Meal Break", details: "Worked 6.5 hours without a break", status: "Pending" },
    { employee: "Peter Jones", date: "2023-11-19", violation: "Unauthorized Overtime", details: "Worked 30 mins past shift end", status: "Approved" },
]

const getBadgeVariant = (status: string) => {
    switch (status) {
        case "Approved": return "default";
        case "Pending": return "secondary";
        case "Rejected": return "destructive";
        default: return "outline";
    }
}


export default function RuleEnginePage() {

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Time & Attendance" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Automated Policy Application */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><SlidersHorizontal/> Automated Policy Application</CardTitle>
                        <CardDescription>Configure rules for standard time calculations. These rules are applied before overtime.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="space-y-4 p-6 bg-secondary rounded-lg">
                            <h3 className="font-semibold">Rounding Rules</h3>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="rounding-switch">Enable Punch Rounding</Label>
                                <Switch id="rounding-switch" defaultChecked />
                            </div>
                            <Select>
                                <SelectTrigger><SelectValue placeholder="Select rounding rule" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5min">Nearest 5 minutes</SelectItem>
                                    <SelectItem value="15min">Nearest 15 minutes (quarter-hour)</SelectItem>
                                    <SelectItem value="grace">5-minute grace period</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-4 p-6 bg-secondary rounded-lg">
                            <h3 className="font-semibold">Break Rules</h3>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="break-switch">Automatically Deduct Breaks</Label>
                                <Switch id="break-switch" />
                            </div>
                            <p className="text-sm text-muted-foreground">e.g., automatically deduct a 30-minute unpaid break for shifts over 6 hours.</p>
                        </div>
                        <div className="space-y-4 p-6 bg-secondary rounded-lg">
                            <h3 className="font-semibold">Shift Differentials</h3>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="diff-switch">Enable Differentials</Label>
                                <Switch id="diff-switch" />
                            </div>
                            <p className="text-sm text-muted-foreground">Define pay premiums for evening, weekend, or holiday shifts.</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save Policies</Button>
                    </CardFooter>
                </Card>

                {/* Overtime Calculation */}
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Book/> Jurisdictional Library for Overtime</CardTitle>
                        <CardDescription>Maintain a library of pre-built labor rules for different states/countries.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Jurisdiction</TableHead>
                                    <TableHead>Overtime Rule</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {overtimeRules.map((rule, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{rule.jurisdiction}</TableCell>
                                        <TableCell>{rule.rule}</TableCell>
                                        <TableCell className="text-right"><Badge>Active</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline">Update Library</Button>
                    </CardFooter>
                </Card>

                {/* Compliance Flagging & Exception Handling */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Workflow/> Compliance & Exception Workflow</CardTitle>
                        <CardDescription>Review, annotate, and approve any punches that violate a rule before the time record is locked.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Violation</TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Manager Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {flaggedViolations.map((v, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{v.employee}</TableCell>
                                        <TableCell>{v.date}</TableCell>
                                        <TableCell className="flex items-center gap-2 text-yellow-600"><AlertTriangle className="h-4 w-4"/>{v.violation}</TableCell>
                                        <TableCell className="text-muted-foreground">{v.details}</TableCell>
                                        <TableCell><Badge variant={getBadgeVariant(v.status)}>{v.status}</Badge></TableCell>
                                        <TableCell className="text-right space-x-2">
                                            {v.status === "Pending" ? (
                                                <>
                                                     <Button variant="outline" size="icon" className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"><Check className="h-4 w-4"/></Button>
                                                     <Button variant="outline" size="icon" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"><X className="h-4 w-4"/></Button>
                                                </>
                                            ) : (
                                                <span className="text-xs text-muted-foreground">Actioned</span>
                                            )}
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
