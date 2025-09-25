import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const exitTasks = [
    { id: "task1", label: "Conduct exit interview", completed: true },
    { id: "task2", label: "Retrieve company assets (laptop, ID card, etc.)", completed: false },
    { id: "task3", label: "Deactivate system access and accounts", completed: false },
    { id: "task4", label: "Process final paycheck", completed: false },
    { id: "task5", label: "Provide information on final benefits and COBRA", completed: false },
    { id: "task6", label: "Update employee records to 'Terminated'", completed: false },
];

export default function ExitManagementPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Exit Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                 <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Resignation/Termination</AccordionTrigger>
                        <AccordionContent>
                             <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline">Resignation/Termination</CardTitle>
                                    <CardDescription>Handling the official paperwork and communication related to an employee leaving.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Resignation/Termination content will go here.</p>
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Exit Interview</AccordionTrigger>
                        <AccordionContent>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline">Exit Interview</CardTitle>
                                    <CardDescription>Conducting a meeting with the departing employee to gather feedback on their experience with the company.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Exit Interview content will go here.</p>
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Offboarding</AccordionTrigger>
                        <AccordionContent>
                             <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline">Employee Offboarding Checklist</CardTitle>
                                    <CardDescription>Recovering company property and ensuring all final payments are processed correctly for John Doe - Departure Date: 2023-11-30</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {exitTasks.map(task => (
                                            <div key={task.id} className="flex items-center space-x-3">
                                                <Checkbox id={task.id} checked={task.completed} />
                                                <Label htmlFor={task.id} className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                                    {task.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </main>
        </div>
    );
}
