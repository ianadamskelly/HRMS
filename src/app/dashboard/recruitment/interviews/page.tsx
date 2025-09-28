
'use client';

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Video, Check, ChevronsUpDown, X as XIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";


const upcomingInterviews = [
  {
    candidate: "John Doe",
    role: "Software Engineer",
    date: "2023-11-10",
    time: "2:00 PM EST",
    interviewers: ["Alice", "Bob"],
    stage: "Technical Round",
    status: "Scheduled",
  },
  {
    candidate: "Jane Smith",
    role: "Product Manager",
    date: "2023-11-12",
    time: "10:30 AM PST",
    interviewers: ["Charlie"],
    stage: "Hiring Manager",
    status: "Scheduled",
  },
    {
    candidate: "Sam Wilson",
    role: "UX Designer",
    date: "2023-11-08",
    time: "4:00 PM GMT",
    interviewers: ["David", "Eve"],
    stage: "Portfolio Review",
    status: "Completed",
  },
];

const managers = [
    { value: 'alice', label: 'Alice Johnson' },
    { value: 'bob', label: 'Bob Brown' },
    { value: 'charlie', label: 'Charlie Davis' },
    { value: 'david', label: 'David Wilson' },
    { value: 'eve', label: 'Eve Miller' },
]

const getBadgeVariant = (status: string) => {
    switch (status) {
        case "Scheduled":
            return "default";
        case "Completed":
            return "secondary";
        default:
            return "outline";
    }
}

function ScheduleInterviewDialog() {
    const [selectedInterviewers, setSelectedInterviewers] = useState<string[]>([]);

    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle>Schedule Interview</DialogTitle>
                <DialogDescription>
                    Coordinate a new interview for a candidate. An invitation will be sent to all parties.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="candidate-name">Candidate</Label>
                    <Input id="candidate-name" placeholder="Enter candidate name" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select>
                            <SelectTrigger id="role">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="swe">Software Engineer</SelectItem>
                                <SelectItem value="pm">Product Manager</SelectItem>
                                <SelectItem value="ux">UX Designer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="interview-stage">Interview Stage</Label>
                         <Select>
                            <SelectTrigger id="interview-stage">
                                <SelectValue placeholder="Select stage" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="screening">Initial Screening</SelectItem>
                                <SelectItem value="technical">Technical Round</SelectItem>
                                <SelectItem value="manager">Hiring Manager</SelectItem>
                                <SelectItem value="final">Final Round / On-site</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Input id="time" type="time" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label>Interviewers</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-full justify-between"
                            >
                                <span className="truncate">
                                {selectedInterviewers.length > 0
                                    ? selectedInterviewers
                                        .map(val => managers.find(m => m.value === val)?.label)
                                        .join(', ')
                                    : "Select interviewers..."}
                                </span>
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                            <Command>
                                <CommandInput placeholder="Search managers..." />
                                <CommandList>
                                    <CommandEmpty>No managers found.</CommandEmpty>
                                    <CommandGroup>
                                        {managers.map((manager) => (
                                            <CommandItem
                                                key={manager.value}
                                                onSelect={() => {
                                                    setSelectedInterviewers(current => 
                                                        current.includes(manager.value)
                                                            ? current.filter(val => val !== manager.value)
                                                            : [...current, manager.value]
                                                    )
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedInterviewers.includes(manager.value) ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {manager.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {selectedInterviewers.map(val => {
                            const manager = managers.find(m => m.value === val);
                            return (
                                <Badge
                                    key={val}
                                    variant="secondary"
                                >
                                    {manager?.label}
                                    <button
                                        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        onClick={() => setSelectedInterviewers(current => current.filter(v => v !== val))}
                                    >
                                      <XIcon className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </button>
                                </Badge>
                            );
                        })}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="notes">Notes / Instructions</Label>
                    <Textarea id="notes" placeholder="Include any specific instructions for the interviewers or candidate."/>
                </div>
            </div>
            <DialogFooter>
                 <DialogClose asChild>
                    <Button type="submit">Schedule Interview</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

export default function InterviewsPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Recruitment" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">Interviews</CardTitle>
              <CardDescription>
                Schedule, manage, and evaluate candidate interviews.
              </CardDescription>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Schedule Interview
                    </Button>
                </DialogTrigger>
                <ScheduleInterviewDialog />
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Interviewers</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingInterviews.map((interview, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {interview.candidate}
                    </TableCell>
                    <TableCell>{interview.role}</TableCell>
                    <TableCell>
                      {interview.date} at {interview.time}
                    </TableCell>
                    <TableCell>{interview.interviewers.join(", ")}</TableCell>
                    <TableCell>{interview.stage}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(interview.status)}>{interview.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        {interview.status === "Scheduled" && (
                             <Button variant="outline" size="sm">
                                <Video className="mr-2 h-4 w-4" />
                                Join Call
                            </Button>
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
