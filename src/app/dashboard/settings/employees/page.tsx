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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, ArrowRight, ArrowLeft, Calendar as CalendarIcon, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const employeesData = [
  {
    id: "EMP001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Software Engineer",
    department: "Engineering",
    status: "Active",
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Product Manager",
    department: "Product",
    status: "Active",
  },
  {
    id: "EMP003",
    name: "Sam Wilson",
    email: "sam.wilson@example.com",
    role: "UX Designer",
    department: "Design",
    status: "On Leave",
  },
    {
    id: "EMP004",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    role: "Data Scientist",
    department: "Data & Analytics",
    status: "Active",
  },
    {
    id: "EMP005",
    name: "Bob Brown",
    email: "bob.b@example.com",
    role: "Software Engineer",
    department: "Engineering",
    status: "Terminated",
  },
];

const departments = ["Engineering", "Product", "Design", "Marketing", "Sales", "Human Resources"];
const locations = ["New York, NY", "San Francisco, CA", "Remote"];
const jobGrades = ["P1", "P2", "P3", "M1", "M2"];


const getBadgeVariant = (status: string) => {
    switch (status) {
        case "Active":
            return "default";
        case "On Leave":
            return "secondary";
        case "Terminated":
            return "destructive";
        default:
            return "outline";
    }
}

const steps = [
    { id: 1, title: "Initiate Profile" },
    { id: 2, title: "Personal Data" },
    { id: 3, title: "Organizational Data" },
    { id: 4, title: "Compensation" },
    { id: 5, title: "Compliance" },
];

type AddEmployeeWizardProps = {
    initialData?: {
        fullName?: string;
        email?: string;
        jobTitle?: string;
        department?: string;
        salary?: number;
    };
    onEmployeeCreated?: () => void;
};

export function AddEmployeeWizard({ initialData, onEmployeeCreated }: AddEmployeeWizardProps) {
    const [step, setStep] = useState(1);
    const [startDate, setStartDate] = useState<Date>();
    const [dob, setDob] = useState<Date>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Form state for pre-filling
    const [fullName, setFullName] = useState(initialData?.fullName || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [jobTitle, setJobTitle] = useState(initialData?.jobTitle || '');
    const [department, setDepartment] = useState(initialData?.department || '');
    const [salary, setSalary] = useState(initialData?.salary?.toString() || '');

    useEffect(() => {
        if (initialData) {
            setFullName(initialData.fullName || '');
            setEmail(initialData.email || '');
            setJobTitle(initialData.jobTitle || '');
            setDepartment(initialData.department || '');
            setSalary(initialData.salary?.toString() || '');
        }
    }, [initialData]);

    const nextStep = () => setStep(prev => Math.min(prev + 1, steps.length));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    const progress = (step / steps.length) * 100;

    const handleCreateEmployee = () => {
        // In a real app, you would submit all collected data to your backend here
        console.log("Creating employee...");
        if (onEmployeeCreated) {
            onEmployeeCreated();
        }
        setIsDialogOpen(false); // Close dialog on creation
    };

    return (
        <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle className="font-headline">Add New Employee</DialogTitle>
                <DialogDescription>
                   Step {step} of {steps.length}: {steps[step - 1].title}
                </DialogDescription>
            </DialogHeader>
            <Progress value={progress} className="w-full" />
            <div className="py-4 space-y-6">
                {step === 1 && (
                    <div className="space-y-4">
                        <h3 className="font-semibold">Initiate Profile</h3>
                        <div className="space-y-2">
                            <Label htmlFor="employee-id">Employee ID</Label>
                            <Input id="employee-id" placeholder="Enter internal unique identifier or leave blank to auto-generate" />
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className="space-y-4">
                        <h3 className="font-semibold">Personal Data</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="full-name">Full Name</Label>
                                <Input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. John Doe" />
                            </div>
                            <div className="space-y-2">
                                <Label>Date of Birth</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !dob && "text-muted-foreground")}>
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {dob ? format(dob, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={dob} onSelect={setDob} captionLayout="dropdown-buttons" fromYear={1960} toYear={2010} /></PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Contact Email</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. john.doe@email.com" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="phone">Contact Phone</Label>
                                <Input id="phone" type="tel" placeholder="e.g. +1 123 456 7890" />
                            </div>
                        </div>
                         <div className="space-y-2 border-t pt-4">
                            <h4 className="font-medium">Emergency Contact</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Input placeholder="Contact Name" />
                                <Input placeholder="Relationship" />
                                <Input placeholder="Contact Phone" />
                            </div>
                        </div>
                    </div>
                )}
                 {step === 3 && (
                    <div className="space-y-4">
                        <h3 className="font-semibold">Organizational Data</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="job-title">Job Title</Label>
                                <Input id="job-title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g. Software Engineer" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="department">Department</Label>
                                <Select value={department} onValueChange={setDepartment}><SelectTrigger id="department"><SelectValue placeholder="Select department" /></SelectTrigger><SelectContent>{departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Select><SelectTrigger id="location"><SelectValue placeholder="Select location" /></SelectTrigger><SelectContent>{locations.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="manager">Manager</Label>
                                <Select><SelectTrigger id="manager"><SelectValue placeholder="Select manager" /></SelectTrigger><SelectContent>{employeesData.filter(e => e.status === 'Active').map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent></Select>
                            </div>
                             <div className="space-y-2 md:col-span-2">
                                <Label>Start Date (Original Hire Date)</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={startDate} onSelect={setStartDate} /></PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                )}
                 {step === 4 && (
                    <div className="space-y-4">
                        <h3 className="font-semibold">Compensation Data</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="salary">Base Salary / Pay Rate</Label>
                                <Input id="salary" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g. 90000" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="pay-grade">Pay Grade/Band</Label>
                                <Select><SelectTrigger id="pay-grade"><SelectValue placeholder="Select grade" /></SelectTrigger><SelectContent>{jobGrades.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent></Select>
                            </div>
                        </div>
                    </div>
                )}
                 {step === 5 && (
                    <div className="space-y-4">
                        <h3 className="font-semibold">Compliance Data</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="i9-form">Form I-9</Label>
                                    <Input id="i9-form" type="file" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="w4-form">Form W-4</Label>
                                    <Input id="w4-form" type="file" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contract">Contract</Label>
                                    <Input id="contract" type="file" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tax-jurisdiction">Tax Jurisdiction</Label>
                                    <Input id="tax-jurisdiction" placeholder="e.g. USA/California" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bank-details">Bank Details (for Payroll)</Label>
                                    <Input id="bank-details" placeholder="e.g. Bank Name, Account Number" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <DialogFooter className="justify-between">
                <div>
                   {step > 1 && (
                        <Button variant="outline" onClick={prevStep}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                    )}
                </div>
                 <div>
                    {step < steps.length ? (
                        <Button onClick={nextStep}>
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                         <DialogClose asChild>
                            <Button onClick={handleCreateEmployee}>Create Employee Profile</Button>
                        </DialogClose>
                    )}
                 </div>
            </DialogFooter>
        </DialogContent>
    )
}

export default function EmployeesPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Employees" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">Employee Database</CardTitle>
              <CardDescription>
                Manage all employee details and records.
              </CardDescription>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                      <PlusCircle className="mr-2" />
                      Add Employee
                    </Button>
                </DialogTrigger>
                <AddEmployeeWizard />
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search employees..."
                    className="pl-8 w-full sm:w-[300px]"
                />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeesData.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-mono">{employee.id}</TableCell>
                    <TableCell className="font-medium">
                      {employee.name}
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(employee.status)}>{employee.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
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
