
'use client';

import { useState, useEffect, useRef } from 'react';
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
import { PlusCircle, Search, ArrowRight, ArrowLeft, Calendar as CalendarIcon, Upload, Loader2, Copy } from "lucide-react";
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
import { getDepartments, getPayGrades, getEmployees, type Employee } from '@/firebase/firestore';
import { functions } from '@/firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from '@/components/ui/alert-dialog';


const locations = ["New York, NY", "San Francisco, CA", "Remote"];
const roles = ["Admin", "Manager", "Employee"];


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
        role?: string;
    };
    onEmployeeCreated?: () => void;
};

export function AddEmployeeWizard({ initialData, onEmployeeCreated }: AddEmployeeWizardProps) {
    const [step, setStep] = useState(1);
    const [startDate, setStartDate] = useState<Date>();
    const [dob, setDob] = useState<Date>();
    const { toast } = useToast();
    const [isSaving, setIsSaving] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // To control the main wizard dialog
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
    const [newEmployeeCredentials, setNewEmployeeCredentials] = useState({ email: '', tempPassword: '' });

    
    const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
    const [payGrades, setPayGrades] = useState<{ id: string; name: string }[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);


    // Form state
    const [employeeId, setEmployeeId] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('Employee');
    const [contactPhone, setContactPhone] = useState('');
    const [emergencyContactName, setEmergencyContactName] = useState('');
    const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('');
    const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [department, setDepartment] = useState('');
    const [manager, setManager] = useState('');
    const [salary, setSalary] = useState('');
    const [payGrade, setPayGrade] = useState('');
    const [taxJurisdiction, setTaxJurisdiction] = useState('');
    const [bankDetails, setBankDetails] = useState('');


    useEffect(() => {
        if (initialData) {
            setFullName(initialData.fullName || '');
            setEmail(initialData.email || '');
            setJobTitle(initialData.jobTitle || '');
            setDepartment(initialData.department || '');
            setSalary(initialData.salary?.toString() || '');
            setRole(initialData.role || 'Employee');
        }

        const fetchDropdownData = async () => {
            try {
                const [depts, grades, emps] = await Promise.all([
                    getDepartments(),
                    getPayGrades(),
                    getEmployees()
                ]);
                setDepartments(depts as { id: string; name: string }[]);
                setPayGrades(grades as { id: string; name: string }[]);
                setEmployees(emps as Employee[]);
            } catch (error) {
                toast({ variant: 'destructive', title: 'Failed to fetch initial data.'});
            }
        };
        fetchDropdownData();

    }, [initialData, toast]);

    const nextStep = () => setStep(prev => Math.min(prev + 1, steps.length));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    const progress = (step / steps.length) * 100;

    const handleCreateEmployee = async () => {
        setIsSaving(true);
        const createNewUser = httpsCallable(functions, 'createNewUser');
        const employeeData = {
            employeeId,
            fullName,
            email,
            role,
            dob: dob ? format(dob, 'yyyy-MM-dd') : null,
            contactPhone,
            emergencyContact: {
                name: emergencyContactName,
                relationship: emergencyContactRelationship,
                phone: emergencyContactPhone
            },
            jobTitle,
            department,
            manager,
            startDate: startDate ? format(startDate, 'yyyy-MM-dd') : null,
            compensation: {
                salary: Number(salary),
                payGrade
            },
            compliance: {
                taxJurisdiction,
                bankDetails
            },
        };

        try {
            const result: any = await createNewUser(employeeData);
            setNewEmployeeCredentials({ email: email, tempPassword: result.data.tempPassword });
            setIsSuccessDialogOpen(true);
            toast({ title: "Employee created successfully!", description: result.data.message });
            if (onEmployeeCreated) {
                onEmployeeCreated();
            }
            setIsDialogOpen(false); // Close main wizard
        } catch (error: any) {
            console.error("Error creating employee:", error);
            toast({ variant: 'destructive', title: 'Error creating employee', description: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: 'Copied to clipboard!' });
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Add Employee
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="font-headline">Add New Employee</DialogTitle>
                        <DialogDescription>
                        Step {step} of {steps.length}: {steps[step - 1].title}
                        </DialogDescription>
                    </DialogHeader>
                    <Progress value={progress} className="w-full" />
                    <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto pr-4">
                        {step === 1 && (
                            <div className="space-y-4">
                                <h3 className="font-semibold">Initiate Profile</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="employee-id">Employee ID</Label>
                                    <Input id="employee-id" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="Leave blank to auto-generate" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="full-name">Full Name <span className="text-destructive">*</span></Label>
                                    <Input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. John Doe" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Contact Email <span className="text-destructive">*</span></Label>
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. john.doe@email.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role <span className="text-destructive">*</span></Label>
                                    <Select value={role} onValueChange={setRole} required>
                                        <SelectTrigger id="role"><SelectValue placeholder="Select role" /></SelectTrigger>
                                        <SelectContent>{roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h3 className="font-semibold">Personal Data</h3>
                                    <p className="text-sm text-muted-foreground">This information is optional but helps complete the employee's profile.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        <Label htmlFor="phone">Contact Phone</Label>
                                        <Input id="phone" type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="e.g. +1 123 456 7890" />
                                    </div>
                                </div>
                                <div className="space-y-2 border-t pt-4">
                                    <h4 className="font-medium">Emergency Contact</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Input placeholder="Contact Name" value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} />
                                        <Input placeholder="Relationship" value={emergencyContactRelationship} onChange={(e) => setEmergencyContactRelationship(e.target.value)}/>
                                        <Input placeholder="Contact Phone" value={emergencyContactPhone} onChange={(e) => setEmergencyContactPhone(e.target.value)} />
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
                                        <Select value={department} onValueChange={setDepartment}><SelectTrigger id="department"><SelectValue placeholder="Select department" /></SelectTrigger><SelectContent>{departments.map(d => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}</SelectContent></Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="manager">Manager</Label>
                                        <Select value={manager} onValueChange={setManager}><SelectTrigger id="manager"><SelectValue placeholder="Select manager" /></SelectTrigger><SelectContent>{employees.filter(e => e.status === 'Active').map(e => <SelectItem key={e.id} value={e.fullName}>{e.fullName}</SelectItem>)}</SelectContent></Select>
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
                                        <Select value={payGrade} onValueChange={setPayGrade}><SelectTrigger id="pay-grade"><SelectValue placeholder="Select grade" /></SelectTrigger><SelectContent>{payGrades.map(g => <SelectItem key={g.id} value={g.name}>{g.name}</SelectItem>)}</SelectContent></Select>
                                    </div>
                                </div>
                            </div>
                        )}
                        {step === 5 && (
                            <div className="space-y-4">
                                <h3 className="font-semibold">Compliance Data (Optional)</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="tax-jurisdiction">Tax Jurisdiction</Label>
                                        <Input id="tax-jurisdiction" value={taxJurisdiction} onChange={(e) => setTaxJurisdiction(e.target.value)} placeholder="e.g. USA/California" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bank-details">Bank Details (for Payroll)</Label>
                                        <Input id="bank-details" value={bankDetails} onChange={(e) => setBankDetails(e.target.value)} placeholder="e.g. Bank Name, Account Number" />
                                    </div>
                                </div>
                                <div className="space-y-2 pt-4">
                                    <Label>Upload Documents</Label>
                                    <div className="flex items-center gap-2 p-4 border-2 border-dashed rounded-lg">
                                        <Upload className="h-6 w-6 text-muted-foreground" />
                                        <Input id="document-upload" type="file" multiple className="text-sm border-none shadow-none pl-0 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter className="justify-between">
                        <div>
                        {step > 1 && (
                                <Button variant="outline" onClick={prevStep} disabled={isSaving}>
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
                                <Button onClick={handleCreateEmployee} disabled={isSaving}>
                                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Create Employee Profile
                                </Button>
                            )}
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Employee Created Successfully!</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please securely share the following temporary credentials with the new employee. They will be required to change their password upon first login.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <p className="font-mono text-sm p-2 bg-muted rounded-md">{newEmployeeCredentials.email}</p>
                        </div>
                        <div className="space-y-2">
                            <Label>Temporary Password</Label>
                            <div className="flex items-center gap-2">
                                <p className="font-mono text-sm p-2 bg-muted rounded-md flex-1">{newEmployeeCredentials.tempPassword}</p>
                                <Button variant="outline" size="icon" onClick={() => copyToClipboard(newEmployeeCredentials.tempPassword)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <Button onClick={() => setIsSuccessDialogOpen(false)}>Close</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const emps = await getEmployees();
      setEmployees(emps);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Failed to fetch employees.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

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
            <AddEmployeeWizard onEmployeeCreated={fetchEmployees} />
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search employees..."
                    className="pl-8 w-full sm:w-[300px]"
                    suppressHydrationWarning
                />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                      <TableCell colSpan={7} className="text-center">
                          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                      </TableCell>
                  </TableRow>
                ) : employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-mono">{employee.employeeId || employee.id.substring(0,6).toUpperCase()}</TableCell>
                    <TableCell className="font-medium">
                      {employee.fullName}
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.jobTitle}</TableCell>
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
