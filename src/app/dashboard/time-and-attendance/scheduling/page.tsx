
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar, ChevronLeft, ChevronRight, PlusCircle, Copy, Send, User, Clock } from "lucide-react";
import { format, startOfWeek, addDays, subDays } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const employees = [
  { id: "EMP001", name: "John Doe", avatar: "https://picsum.photos/seed/user1/40/40" },
  { id: "EMP002", name: "Jane Smith", avatar: "https://picsum.photos/seed/user2/40/40" },
  { id: "EMP003", name: "Peter Jones", avatar: "https://picsum.photos/seed/user3/40/40" },
  { id: "EMP004", name: "Sarah Miller", avatar: "https://picsum.photos/seed/user4/40/40" },
];

const shifts = [
    { employeeId: "EMP001", day: 1, start: "09:00", end: "17:00", role: "Cashier" },
    { employeeId: "EMP002", day: 1, start: "12:00", end: "20:00", role: "Stocker" },
    { employeeId: "EMP001", day: 2, start: "09:00", end: "17:00", role: "Cashier" },
    { employeeId: "EMP003", day: 2, start: "08:00", end: "16:00", role: "Manager" },
    { employeeId: "EMP004", day: 3, start: "10:00", end: "18:00", role: "Customer Service" },
];

export default function SchedulingPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const weekStartsOn = 1; // Monday
    const weekStart = startOfWeek(currentDate, { weekStartsOn });
    
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));
    const handlePrevWeek = () => setCurrentDate(subDays(currentDate, 7));


    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Time & Attendance" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <CardTitle className="font-headline flex items-center gap-2"><Calendar/> Employee Scheduling</CardTitle>
                                <CardDescription>Create, manage, and publish employee work schedules.</CardDescription>
                            </div>
                             <div className="flex items-center gap-2">
                                <Button variant="outline" onClick={handlePrevWeek}><ChevronLeft className="h-4 w-4"/></Button>
                                <span className="font-semibold text-lg">{format(weekStart, 'MMMM yyyy')}</span>
                                <Button variant="outline" onClick={handleNextWeek}><ChevronRight className="h-4 w-4"/></Button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-6">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button><PlusCircle className="mr-2 h-4 w-4"/>Add Shift</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Shift</DialogTitle>
                                        <DialogDescription>Schedule a new shift for an employee.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <Label>Employee</Label>
                                            <Select><SelectTrigger><SelectValue placeholder="Select Employee" /></SelectTrigger></Select>
                                        </div>
                                         <div className="space-y-2">
                                            <Label>Date</Label>
                                            <Input type="date"/>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Start Time</Label>
                                                <Input type="time"/>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>End Time</Label>
                                                <Input type="time"/>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Role/Position</Label>
                                            <Input placeholder="e.g., Cashier, Manager"/>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Save Shift</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <Button variant="outline"><Copy className="mr-2 h-4 w-4"/>Copy Previous Week</Button>
                             <Button variant="secondary" className="ml-auto"><Send className="mr-2 h-4 w-4"/>Publish Schedule</Button>
                        </div>
                    </CardHeader>
                    <CardContent className="overflow-x-auto">
                        <div className="grid grid-cols-[150px_repeat(7,1fr)] min-w-[900px]">
                            {/* Header Row */}
                            <div className="font-semibold p-2 border-b">Employee</div>
                            {weekDays.map(day => (
                                <div key={day.toString()} className="font-semibold text-center p-2 border-b">
                                    <p>{format(day, 'EEE')}</p>
                                    <p className="text-muted-foreground text-sm">{format(day, 'd')}</p>
                                </div>
                            ))}

                            {/* Employee Rows */}
                            {employees.map(employee => (
                                <div key={employee.id} className="col-span-8 grid grid-cols-[150px_repeat(7,1fr)] border-b">
                                    <div className="p-2 flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={employee.avatar} alt={employee.name} />
                                            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium text-sm">{employee.name}</span>
                                    </div>
                                    {weekDays.map((day, dayIndex) => {
                                        const employeeShifts = shifts.filter(s => s.employeeId === employee.id && s.day === dayIndex);
                                        return (
                                            <div key={day.toString()} className="p-2 border-l min-h-[80px] space-y-2">
                                                {employeeShifts.map((shift, shiftIndex) => (
                                                    <div key={shiftIndex} className="bg-primary/10 text-primary-foreground p-2 rounded-lg text-xs">
                                                        <p className="font-bold flex items-center gap-1"><Clock className="h-3 w-3"/>{shift.start} - {shift.end}</p>
                                                        <p className="flex items-center gap-1"><User className="h-3 w-3"/>{shift.role}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Key Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-secondary rounded-lg">
                            <p className="text-sm text-muted-foreground">Total Scheduled Hours</p>
                            <p className="text-2xl font-bold">128</p>
                        </div>
                         <div className="p-4 bg-secondary rounded-lg">
                            <p className="text-sm text-muted-foreground">Projected Labor Cost</p>
                            <p className="text-2xl font-bold">$2,560</p>
                        </div>
                        <div className="p-4 bg-secondary rounded-lg">
                            <p className="text-sm text-muted-foreground">Unfilled Shifts</p>
                            <p className="text-2xl font-bold">3</p>
                        </div>
                    </CardContent>
                 </Card>
            </main>
        </div>
    );
}
