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
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, Send, UserCheck, ShieldCheck, Hourglass } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AddEmployeeWizard } from "@/app/dashboard/settings/employees/page";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const candidatesData = [
    { id: 'candidate-jane', name: "Jane Smith", role: "Product Manager", department: "Product", status: "Offer Generated", offerStatus: "Sent", salary: 140000, email: "jane.smith.candidate@example.com" },
    { id: 'candidate-john', name: "John Doe", role: "Software Engineer", department: "Engineering", status: "Background Check", offerStatus: "Accepted", salary: 150000, email: "john.doe.candidate@example.com" },
];

const backgroundChecks = [
    { check: "Criminal History", vendor: "Checkr", status: "In Progress" },
    { check: "Reference Check", vendor: "Manual", status: "Pending" },
    { check: "Right-to-Work Verification", vendor: "Everify", status: "Completed" },
]

export default function SelectionPage() {
    const [candidates, setCandidates] = useState(candidatesData);

    const handleTransfer = (candidateId: string) => {
        // In a real app, this would also update the backend to mark the candidate as "Transferred"
        setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, status: 'Transferred' } : c));
    };

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Recruitment" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Offer Generation & E-Signature */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><FileText /> Offer Generation & E-Signature</CardTitle>
                        <CardDescription>Generate, send, and track offer letters for selected candidates.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Candidate</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Offer Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {candidates.map((candidate) => (
                                    <TableRow key={candidate.id}>
                                        <TableCell className="font-medium">{candidate.name}</TableCell>
                                        <TableCell>{candidate.role}</TableCell>
                                        <TableCell>
                                            <Badge variant={candidate.offerStatus === 'Accepted' ? 'default' : 'secondary'}>
                                                {candidate.offerStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="sm">View Offer</Button>
                                            <Button variant="outline" size="sm"><Send className="mr-2 h-4 w-4" /> Resend</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                         <Button>Generate New Offer</Button>
                    </CardFooter>
                </Card>

                 {/* Background Checks/Compliance */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><ShieldCheck /> Background Checks & Compliance</CardTitle>
                        <CardDescription>Manage and track background, reference, and right-to-work checks for John Doe.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Check Type</TableHead>
                                    <TableHead>Vendor</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {backgroundChecks.map((check, index) => (
                                     <TableRow key={index}>
                                        <TableCell>{check.check}</TableCell>
                                        <TableCell>{check.vendor}</TableCell>
                                        <TableCell>
                                            <Badge variant={check.status === 'Completed' ? 'default' : check.status === 'In Progress' ? 'secondary' : 'outline'}>
                                                {check.status === 'In Progress' && <Hourglass className="mr-2 h-4 w-4" />}
                                                {check.status === 'Completed' && <CheckCircle className="mr-2 h-4 w-4" />}
                                                {check.status}
                                            </Badge>
                                        </TableCell>
                                     </TableRow>
                                ))}
                            </TableBody>
                         </Table>
                    </CardContent>
                     <CardFooter>
                        <Button>Initiate All Checks for John Doe</Button>
                    </CardFooter>
                </Card>

                 {/* Hiring Status Update & Data Transfer */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><UserCheck /> Hiring Status Update & Data Transfer</CardTitle>
                        <CardDescription>Once an offer is accepted and checks are clear, transfer the candidate to the core HR system.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {candidates.filter(c => c.offerStatus === 'Accepted').map(candidate => (
                            <div key={candidate.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                                <div>
                                    <p className="font-semibold">{candidate.name} ({candidate.role})</p>
                                    <p className="text-sm text-muted-foreground">Offer accepted. Ready for onboarding.</p>
                                </div>
                                {candidate.status !== 'Transferred' ? (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>
                                                Transfer to Employee Profile
                                            </Button>
                                        </DialogTrigger>
                                        <AddEmployeeWizard 
                                            initialData={{
                                                fullName: candidate.name,
                                                email: candidate.email,
                                                jobTitle: candidate.role,
                                                department: candidate.department,
                                                salary: candidate.salary,
                                            }}
                                            onEmployeeCreated={() => handleTransfer(candidate.id)}
                                        />
                                    </Dialog>
                                ) : (
                                    <Badge>Transferred</Badge>
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>

            </main>
        </div>
    );
}
