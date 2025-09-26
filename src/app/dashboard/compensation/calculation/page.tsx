
'use client';

import { useState } from "react";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, AlertTriangle } from "lucide-react";


const grossPayData = {
    regularPay: 4000.00,
    overtime: 300.00,
    bonus: 500.00,
    total: 4800.00
};

const taxDeductions = [
    { type: "Federal Income Tax", amount: 550.00 },
    { type: "State Income Tax", amount: 210.00 },
    { type: "Social Security (FICA)", amount: 297.60 },
    { type: "Medicare (FICA)", amount: 69.60 },
];

const voluntaryDeductions = [
    { type: "401(k) Contribution", amount: 200.00 },
    { type: "Health Insurance Premium", amount: 150.00 },
    { type: "Dental Insurance", amount: 25.00 },
];

const totalTaxes = taxDeductions.reduce((acc, item) => acc + item.amount, 0);
const totalVoluntary = voluntaryDeductions.reduce((acc, item) => acc + item.amount, 0);
const totalDeductions = totalTaxes + totalVoluntary;
const netPay = grossPayData.total - totalDeductions;

const payrollRunLog = [
    { id: "RUN-001", employee: "John Doe", period: "11/01/2023 - 11/15/2023", status: "Completed", netPay: 3507.80 },
    { id: "RUN-002", employee: "Jane Smith", period: "11/01/2023 - 11/15/2023", status: "Completed", netPay: 3820.50 },
    { id: "RUN-003", employee: "All Employees", period: "10/16/2023 - 10/31/2023", status: "Completed", netPay: 125430.00 },
];


export default function CalculationPage() {
    const [isCalculated, setIsCalculated] = useState(false);
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Payroll" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Run Payroll Calculation</CardTitle>
                        <CardDescription>Determine gross pay, subtract taxes and other deductions for an employee or group.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
                        <Select defaultValue="john-doe">
                            <SelectTrigger className="w-full sm:w-[220px]">
                                <SelectValue placeholder="Select Employee" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="john-doe">John Doe</SelectItem>
                                <SelectItem value="jane-smith">Jane Smith</SelectItem>
                                <SelectItem value="all-employees">All Employees</SelectItem>
                            </SelectContent>
                        </Select>
                         <Select defaultValue="pp-22">
                            <SelectTrigger className="w-full sm:w-[220px]">
                                <SelectValue placeholder="Select Pay Period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pp-22">11/01/2023 - 11/15/2023</SelectItem>
                                <SelectItem value="pp-21">10/16/2023 - 10/31/2023</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button className="w-full sm:w-auto" onClick={() => setIsCalculated(true)}>
                            <PlayCircle className="mr-2 h-4 w-4" /> Run Calculation
                        </Button>
                    </CardContent>
                </Card>

                {isCalculated && (
                    <div className="space-y-8">
                        <Card>
                             <CardHeader>
                                <CardTitle className="font-headline">Payroll Run for John Doe</CardTitle>
                                <CardDescription>Period: 11/01/2023 - 11/15/2023</CardDescription>
                            </CardHeader>
                        </Card>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <Card className="lg:col-span-1">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold">Gross Pay</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Regular Pay</TableCell>
                                                <TableCell className="text-right font-mono">${grossPayData.regularPay.toFixed(2)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Overtime Pay</TableCell>
                                                <TableCell className="text-right font-mono">${grossPayData.overtime.toFixed(2)}</TableCell>
                                            </TableRow>
                                             <TableRow>
                                                <TableCell>Bonus</TableCell>
                                                <TableCell className="text-right font-mono">${grossPayData.bonus.toFixed(2)}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter className="bg-secondary p-4 rounded-b-lg">
                                    <p className="font-bold w-full flex justify-between">
                                        <span>Total Gross Pay</span>
                                        <span className="font-mono">${grossPayData.total.toFixed(2)}</span>
                                    </p>
                                </CardFooter>
                            </Card>
                            <div className="lg:col-span-2 space-y-8">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold">Tax & Statutory Deductions</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableBody>
                                                {taxDeductions.map(ded => (
                                                    <TableRow key={ded.type}>
                                                        <TableCell>{ded.type}</TableCell>
                                                        <TableCell className="text-right font-mono">-${ded.amount.toFixed(2)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                                 <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold">Voluntary Deductions</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableBody>
                                                {voluntaryDeductions.map(ded => (
                                                    <TableRow key={ded.type}>
                                                        <TableCell>{ded.type}</TableCell>
                                                        <TableCell className="text-right font-mono">-${ded.amount.toFixed(2)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <Card className="bg-primary/10 border-primary/20">
                            <CardHeader className="flex-row items-center justify-between">
                                <CardTitle className="font-headline text-primary">Net Pay</CardTitle>
                                <p className="text-4xl font-bold font-mono text-primary">${netPay.toFixed(2)}</p>
                            </CardHeader>
                            <CardContent className="flex flex-col md:flex-row md:items-center justify-around gap-4 text-center">
                                 <div>
                                    <p className="text-muted-foreground text-sm">Total Gross Pay</p>
                                    <p className="text-2xl font-semibold font-mono">${grossPayData.total.toFixed(2)}</p>
                                </div>
                                <p className="text-3xl font-thin text-muted-foreground">-</p>
                                <div>
                                    <p className="text-muted-foreground text-sm">Total Deductions</p>
                                    <p className="text-2xl font-semibold font-mono">${totalDeductions.toFixed(2)}</p>
                                </div>
                                 <p className="text-3xl font-thin text-muted-foreground">=</p>
                                <div>
                                    <p className="text-muted-foreground text-sm">Final Take-Home</p>
                                    <p className="text-2xl font-semibold font-mono">${netPay.toFixed(2)}</p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col items-start gap-4">
                                <Button>Finalize & Proceed to Disbursement</Button>
                                 <div className="flex items-center gap-2 p-3 text-sm rounded-md bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800/50">
                                    <AlertTriangle className="h-5 w-5" />
                                    <div>
                                        <span className="font-semibold">Automated Validation:</span> An unusually high bonus amount was detected. Please review before finalizing.
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                )}

                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Payroll Run Log</CardTitle>
                        <CardDescription>History of recent payroll calculation runs.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Run ID</TableHead>
                                    <TableHead>Employee(s)</TableHead>
                                    <TableHead>Pay Period</TableHead>
                                    <TableHead>Net Pay</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {payrollRunLog.map(run => (
                                    <TableRow key={run.id}>
                                        <TableCell className="font-mono">{run.id}</TableCell>
                                        <TableCell>{run.employee}</TableCell>
                                        <TableCell>{run.period}</TableCell>
                                        <TableCell className="font-mono">${run.netPay.toFixed(2)}</TableCell>
                                        <TableCell><Badge>{run.status}</Badge></TableCell>
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
