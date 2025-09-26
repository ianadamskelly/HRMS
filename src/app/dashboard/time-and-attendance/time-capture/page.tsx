
'use client';

import { useState, useEffect } from 'react';
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
import { Badge } from "@/components/ui/badge";
import { Clock, LogIn, LogOut, MapPin, Edit, Book, Calendar, PlusCircle } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const timesheetData = [
  { date: "2023-11-20", clockIn: "09:02 AM", clockOut: "05:05 PM", total: "8h 3m" },
  { date: "2023-11-19", clockIn: "08:58 AM", clockOut: "05:01 PM", total: "8h 3m" },
  { date: "2023-11-18", clockIn: "09:10 AM", clockOut: "05:15 PM", total: "8h 5m" },
];

const projects = ["Project Alpha", "Project Bravo", "Client Support"];

export default function TimeCapturePage() {
    const [currentTime, setCurrentTime] = useState('');
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [lastActionTime, setLastActionTime] = useState<string | null>(null);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleClockInOut = () => {
        setIsClockedIn(!isClockedIn);
        setLastActionTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    }

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Time & Attendance" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Clock /> Clock In/Out Interface</CardTitle>
                        <CardDescription>Simple, one-click interface for recording time.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg">
                            <p className="text-6xl font-bold font-mono tracking-wider">{currentTime}</p>
                            <p className="text-muted-foreground">{new Date().toDateString()}</p>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <Button size="lg" className="w-48 h-16 text-lg" onClick={handleClockInOut}>
                                {isClockedIn ? <><LogOut className="mr-2"/>Clock Out</> : <><LogIn className="mr-2"/>Clock In</>}
                            </Button>
                            <Badge variant={isClockedIn ? "default" : "secondary"}>
                                {isClockedIn ? `Clocked In since ${lastActionTime}` : "Clocked Out"}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline flex items-center gap-2"><Calendar /> My Timesheet</CardTitle>
                                <CardDescription>Your recorded time entries for the current pay period.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Clock In</TableHead>
                                            <TableHead>Clock Out</TableHead>
                                            <TableHead>Total Hours</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {timesheetData.map((entry, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{entry.date}</TableCell>
                                                <TableCell>{entry.clockIn}</TableCell>
                                                <TableCell>{entry.clockOut}</TableCell>
                                                <TableCell className="font-medium">{entry.total}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline flex items-center gap-2"><Book /> Project/Task Tracking</CardTitle>
                                <CardDescription>Allocate your time to specific projects or tasks.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid sm:grid-cols-3 gap-4 items-end">
                                <div className="space-y-2">
                                    <Label>Project</Label>
                                    <Select><SelectTrigger><SelectValue placeholder="Select Project" /></SelectTrigger>
                                        <SelectContent>{projects.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                     <Label>Hours</Label>
                                    <Input type="number" placeholder="e.g. 4.5" />
                                </div>
                                <Button className="w-full sm:w-auto"><PlusCircle className="mr-2 h-4 w-4" /> Add Entry</Button>
                            </CardContent>
                        </Card>

                         <Card>
                            <CardHeader>
                                <CardTitle className="font-headline flex items-center gap-2"><Edit /> Supervisor/Bulk Entry</CardTitle>
                                <CardDescription>Allows managers to input time entries or corrections for employees.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                     <Select><SelectTrigger><SelectValue placeholder="Select Employee" /></SelectTrigger></Select>
                                     <Input type="date" />
                                     <Input type="time" />
                                     <Input type="time" />
                                </div>
                                <Textarea placeholder="Reason for Change (mandatory for corrections)" />
                            </CardContent>
                            <CardFooter>
                                <Button>Submit Correction</Button>
                            </CardFooter>
                        </Card>

                    </div>
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline flex items-center gap-2"><MapPin /> Geo-Fencing & GPS</CardTitle>
                                <CardDescription>Your location is recorded for validation when clocking in/out.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                                     <Image 
                                        src="https://picsum.photos/seed/map/600/400"
                                        alt="Map showing current location"
                                        width={600}
                                        height={400}
                                        className="object-cover"
                                        data-ai-hint="map location"
                                     />
                                </div>
                                <p className="text-sm text-muted-foreground mt-4">Location: 123 Main St, Anytown, USA</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </main>
        </div>
    );
}
