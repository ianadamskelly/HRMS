
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DollarSign, Shield, Power, Repeat, UserX, ArrowRight, Laptop, Key, Badge as BadgeIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const assetRecoveryTasks = [
    { id: "task1", label: "Laptop & Charger", completed: true, icon: Laptop },
    { id: "task2", label: "ID Card / Access Badge", completed: true, icon: BadgeIcon },
    { id: "task3", label: "Office Keys", completed: false, icon: Key },
    { id: "task4", label: "Corporate Credit Card", completed: false, icon: DollarSign },
];

const accessRevocationTasks = [
    { id: "task5", label: "Deactivate Email & SSO", completed: false },
    { id: "task6", label: "Revoke VPN & Remote Access", completed: false },
    { id: "task7", label: "Remove from CRM & internal tools", completed: false },
];


export default function OffboardingPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Exit Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Offboarding for John Doe</CardTitle>
                        <CardDescription>Finalizing the separation process for departure on 2023-11-30.</CardDescription>
                    </CardHeader>
                </Card>
                
                {/* Checklist Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                           <Repeat /> Property Recovery & Access Revocation
                        </CardTitle>
                        <CardDescription>
                            A consolidated checklist to track the recovery of all company assets and ensure the termination of system access.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold mb-4">Asset Recovery Checklist</h3>
                            <div className="space-y-4">
                                {assetRecoveryTasks.map(task => (
                                    <div key={task.id} className="flex items-center space-x-3">
                                        <Checkbox id={task.id} checked={task.completed} />
                                        <task.icon className="h-5 w-5 text-muted-foreground"/>
                                        <Label htmlFor={task.id} className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                            {task.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div>
                            <h3 className="font-semibold mb-4">System Access Revocation (IT)</h3>
                             <div className="space-y-4">
                                {accessRevocationTasks.map(task => (
                                    <div key={task.id} className="flex items-center space-x-3">
                                        <Checkbox id={task.id} checked={task.completed} />
                                        <Label htmlFor={task.id} className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                            {task.label}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                     <CardFooter>
                        <Button>Confirm & Sign-Off Checklist</Button>
                    </CardFooter>
                </Card>

                {/* Final Pay Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><DollarSign/> Final Pay Processing</CardTitle>
                        <CardDescription>Initiate the workflow for the employee's final paycheck.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">This will trigger the Payroll module to calculate the final, legally compliant payment including any accrued vacation, bonuses, or severance.</p>
                    </CardContent>
                     <CardFooter>
                        <Button>Process Final Paycheck <ArrowRight className="ml-2 h-4 w-4"/></Button>
                    </CardFooter>
                </Card>

                {/* Benefits & COBRA */}
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Shield/> Benefits & COBRA Administration</CardTitle>
                        <CardDescription>Manage the conversion or termination of employee benefits and send required documents.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">The system will automatically generate and send COBRA election forms and other benefit-related notifications to the employee and insurance carriers.</p>
                    </CardContent>
                     <CardFooter>
                        <Button>Initiate Benefits Termination</Button>
                    </CardFooter>
                </Card>

                {/* Rehire Eligibility */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><UserX/> Rehire Eligibility Status</CardTitle>
                        <CardDescription>Record the employee's rehire eligibility status based on performance and exit circumstances.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <RadioGroup defaultValue="eligible">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="eligible" id="r1" /><Label htmlFor="r1">Eligible for Rehire</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="ineligible" id="r2" /><Label htmlFor="r2">Not Eligible for Rehire</Label></div>
                        </RadioGroup>
                        <Textarea placeholder="Add notes to justify the rehire eligibility status..." />
                    </CardContent>
                     <CardFooter>
                        <Button>Save Rehire Status</Button>
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
}
