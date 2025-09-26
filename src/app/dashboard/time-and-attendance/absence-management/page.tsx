
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
import { Calendar as CalendarIcon, PlusCircle, Check, X, Users, Briefcase, Sun, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format, addDays } from 'date-fns';
import type { DateRange } from "react-day-picker";

const leaveBalances = [
    { type: "Vacation / PTO", balance: 12.5, unit: "days", icon: Sun },
    { type: "Sick Leave", balance: 8, unit: "days", icon: Briefcase },
    { type: "FMLA Entitlement", balance: 12, unit: "weeks", icon: Shield },
];

const teamLeaveRequests = [
    { employee: "John Doe", type: "Vacation", dates: "Nov 23, 2023 - Nov 26, 2023", status: "Approved" },
    { employee: "Jane Smith", type: "Sick Leave", dates: "Nov 20, 2023", status: "Approved" },
    { employee: "Peter Jones", type: "Vacation", dates: "Dec 22, 2023 - Jan 2, 2024", status: "Pending" },
];

const getBadgeVariant = (status: string) => {
    switch (status) {
        case "Approved": return "default";
        case "Pending": return "secondary";
        case "Rejected": return "destructive";
        default: return "outline";
    }
}


export default function AbsenceManagementPage() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 4),
    });

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Time & Attendance" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Accrual Balance Tracking */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">My Leave Balances</CardTitle>
                        <CardDescription>Your available time off balances as of today.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-3">
                        {leaveBalances.map((balance, index) => (
                            <Card key={index} className="p-6 flex items-center gap-4">
                                <balance.icon className="h-8 w-8 text-primary" />
                                <div>
                                    <p className="text-2xl font-bold">{balance.balance} <span className="text-base font-normal text-muted-foreground">{balance.unit}</span></p>
                                    <p className="text-sm text-muted-foreground">{balance.type}</p>
                                </div>
                            </Card>
                        ))}
                    </CardContent>
                </Card>

                {/* Leave Request & Calendar View */}
                 <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline flex items-center gap-2"><Users/> Team Calendar</CardTitle>
                                <CardDescription>View approved and pending leave for your team.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Calendar
                                    mode="range"
                                    numberOfMonths={2}
                                    className="p-0"
                                />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-1">
                        <Card>
                             <CardHeader>
                                <CardTitle className="font-headline">Request Leave</CardTitle>
                                <CardDescription>Submit a new leave request.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Leave Type</Label>
                                    <Select>
                                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="vacation">Vacation / PTO</SelectItem>
                                            <SelectItem value="sick">Sick Leave</SelectItem>
                                            <SelectItem value="fmla">FMLA</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Select Dates</Label>
                                     <Popover>
                                        <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date?.from ? (
                                            date.to ? (
                                                <>{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}</>
                                            ) : (
                                                format(date.from, "LLL dd, y")
                                            )
                                            ) : (
                                            <span>Pick a date range</span>
                                            )}
                                        </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={date?.from}
                                            selected={date}
                                            onSelect={setDate}
                                            numberOfMonths={2}
                                        />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label>Notes (Optional)</Label>
                                    <Textarea placeholder="Add any additional details for your manager." />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full"><PlusCircle className="mr-2 h-4 w-4"/>Submit Request</Button>
                            </CardFooter>
                        </Card>
                    </div>
                 </div>


                {/* Manager Approval/Rejection Workflow */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Manager View: Leave Requests</CardTitle>
                        <CardDescription>Review and take action on pending requests from your team.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Leave Type</TableHead>
                                    <TableHead>Dates</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {teamLeaveRequests.map((req, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{req.employee}</TableCell>
                                        <TableCell>{req.type}</TableCell>
                                        <TableCell>{req.dates}</TableCell>
                                        <TableCell><Badge variant={getBadgeVariant(req.status)}>{req.status}</Badge></TableCell>
                                        <TableCell className="text-right space-x-2">
                                            {req.status === 'Pending' ? (
                                                <>
                                                    <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"><Check className="mr-2 h-4 w-4"/>Approve</Button>
                                                    <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"><X className="mr-2 h-4 w-4"/>Reject</Button>
                                                </>
                                            ) : (
                                                 <span className="text-sm text-muted-foreground">No actions</span>
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
