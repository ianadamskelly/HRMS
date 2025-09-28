
'use client';

import { useState } from 'react';
import { DashboardHeader } from "@/components/dashboard-header";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FileText, Download, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialTasks = [
    { id: "task1", label: "Complete HR paperwork (W-4, I-9)", completed: true },
    { id: "task2", label: "Set up work email and accounts", completed: true },
    { id: "task3", label: "Attend company orientation", completed: true },
    { id: "task4", label: "Meet the team", completed: false },
    { id: "task5", label: "Complete mandatory security training", completed: false },
    { id: "task6", label: "Review employee handbook", completed: false },
];

const formsToSign = [
    { name: "Form W-4 (Employee's Withholding Certificate)", status: "Completed", date: "2023-11-01" },
    { name: "Form I-9 (Employment Eligibility Verification)", status: "Completed", date: "2023-11-01" },
    { name: "Direct Deposit Enrollment", status: "Completed", date: "2023-11-01" },
    { name: "Non-Disclosure Agreement (NDA)", status: "Awaiting Signature", date: null },
    { name: "Employee Handbook Acknowledgement", status: "Awaiting Signature", date: null },
];

const documentRepository = [
    { name: "Signed Offer Letter", type: "PDF", size: "2.1 MB", uploadedOn: "2023-10-28" },
    { name: "Form W-4", type: "PDF", size: "800 KB", uploadedOn: "2023-11-01" },
    { name: "Form I-9", type: "PDF", size: "1.2 MB", uploadedOn: "2023-11-01" },
];


export default function PaperworkPage() {
    const [tasks, setTasks] = useState(initialTasks);
    
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const handleTaskChange = (taskId: string) => {
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Onboarding" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Onboarding Progress for Jane Smith</CardTitle>
                        <CardDescription>Track and manage the onboarding process.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="flex items-center gap-4">
                            <span className="text-sm font-medium">{Math.round(progressPercentage)}% Complete</span>
                            <Progress value={progressPercentage} className="flex-1" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Task Management</CardTitle>
                        <CardDescription>Administrative tasks for the new hire, HR, and Hiring Manager.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {tasks.map(task => (
                                <div key={task.id} className="flex items-center space-x-3">
                                    <Checkbox 
                                        id={task.id} 
                                        checked={task.completed} 
                                        onCheckedChange={() => handleTaskChange(task.id)}
                                    />
                                    <Label 
                                        htmlFor={task.id} 
                                        className={`cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                                    >
                                        {task.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Digital Forms & E-Signature</CardTitle>
                        <CardDescription>Complete and sign all necessary hiring documents.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Form Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Completion Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {formsToSign.map((form, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{form.name}</TableCell>
                                        <TableCell>{form.status}</TableCell>
                                        <TableCell>{form.date || 'N/A'}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" disabled={form.status === 'Completed'}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                View & Sign
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Document Repository</CardTitle>
                        <CardDescription>Secure storage for all completed new hire documents.</CardDescription>
                    </CardHeader>
                     <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Document Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Uploaded On</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {documentRepository.map((doc, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground"/> {doc.name}</TableCell>
                                        <TableCell>{doc.type}</TableCell>
                                        <TableCell>{doc.size}</TableCell>
                                        <TableCell>{doc.uploadedOn}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button>Upload Document</Button>
                    </CardFooter>
                </Card>

            </main>
        </div>
    );
}
