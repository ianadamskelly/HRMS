
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowRight, CheckCircle, Clock, Download, FileCheck, FileDown, Lock, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";


const timesheetStatus = [
    { employee: "John Doe", department: "Retail", hours: { regular: 40, overtime: 2.5 }, status: "Approved" },
    { employee: "Jane Smith", department: "Retail", hours: { regular: 38, overtime: 0 }, status: "Pending Approval" },
    { employee: "Peter Jones", department: "Warehouse", hours: { regular: 40, overtime: 5 }, status: "Approved" },
    { employee: "Sarah Miller", department: "Retail", hours: { regular: 0, overtime: 0 }, status: "Pending Submission" },
];

const getBadgeVariant = (status: string) => {
    switch (status) {
        case "Approved": return "default";
        case "Pending Approval": return "secondary";
        case "Pending Submission": return "outline";
        default: return "outline";
    }
};

const totalHours = timesheetStatus.reduce((acc, emp) => acc + emp.hours.regular + emp.hours.overtime, 0);
const approvedCount = timesheetStatus.filter(e => e.status === "Approved").length;
const approvalProgress = (approvedCount / timesheetStatus.length) * 100;

export default function TimesheetApprovalPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Time & Attendance" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Timecard Approval Workflow */}
                <Card>
                    <CardHeader>
                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <CardTitle className="font-headline flex items-center gap-2"><FileCheck /> Timecard Approval Workflow</CardTitle>
                                <CardDescription>Review and approve employee timesheets for Pay Period: Nov 16, 2023 - Nov 30, 2023</CardDescription>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Approval Deadline</p>
                                <p className="font-semibold">Dec 2, 2023 @ 5:00 PM</p>
                            </div>
                        </div>
                        <div className="pt-4 space-y-2">
                             <div className="flex items-center gap-4">
                                <span className="text-sm font-medium">{Math.round(approvalProgress)}% Approved</span>
                                <Progress value={approvalProgress} className="flex-1" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]"><Checkbox /></TableHead>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Regular Hours</TableHead>
                                    <TableHead>Overtime Hours</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {timesheetStatus.map((emp, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Checkbox /></TableCell>
                                        <TableCell className="font-medium">{emp.employee}</TableCell>
                                        <TableCell>{emp.department}</TableCell>
                                        <TableCell className="font-mono">{emp.hours.regular.toFixed(2)}</TableCell>
                                        <TableCell className="font-mono">{emp.hours.overtime.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge variant={getBadgeVariant(emp.status)}>
                                                {emp.status === "Approved" && <CheckCircle className="mr-2 h-4 w-4" />}
                                                {(emp.status === "Pending Approval" || emp.status === "Pending Submission") && <Clock className="mr-2 h-4 w-4" />}
                                                {emp.status}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button>Approve Selected (2)</Button>
                    </CardFooter>
                </Card>

                {/* Payroll Data Extraction */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><FileDown /> Payroll Data Extraction</CardTitle>
                        <CardDescription>Generate a final, locked file for seamless transfer to the Payroll module.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
                        <Select defaultValue="csv">
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Select Format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="csv">CSV Export</SelectItem>
                                <SelectItem value="api">Payroll API</SelectItem>
                                <SelectItem value="sftp">Secure FTP</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button>
                            <Download className="mr-2 h-4 w-4" />
                            Export Approved Hours
                        </Button>
                         <Button variant="secondary" className="ml-auto">
                            Lock Period & Send to Payroll <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Error Reconciliation Report */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><ShieldCheck /> Error Reconciliation Report</CardTitle>
                        <CardDescription>A final verification check to prevent major payroll errors due to data anomalies.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Alert variant="destructive">
                            <AlertTitle className="font-headline">Variance Detected</AlertTitle>
                            <AlertDescription>
                                Total approved overtime hours (22.5) are 40% higher than the previous pay period (16.0). Please verify before locking the pay period.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
                
                {/* Historical Data Lock */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Lock /> Historical Data Lock</CardTitle>
                        <CardDescription>Once payroll is run, time records are locked. Any changes require a strict, auditable correction process.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <p className="text-sm text-muted-foreground">The timesheet for Pay Period: Nov 1, 2023 - Nov 15, 2023 is locked. To make a retroactive change, please use the Supervisor Correction tool.</p>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline">View Audit Trail</Button>
                    </CardFooter>
                </Card>

            </main>
        </div>
    );
}
