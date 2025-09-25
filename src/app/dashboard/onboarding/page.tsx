import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const onboardingTasks = [
    { id: "task1", label: "Complete HR paperwork (W-4, I-9)", completed: true },
    { id: "task2", label: "Set up work email and accounts", completed: true },
    { id: "task3", label: "Attend company orientation", completed: true },
    { id: "task4", label: "Meet the team", completed: false },
    { id: "task5", label: "Complete mandatory security training", completed: false },
    { id: "task6", label: "Review employee handbook", completed: false },
];

export default function OnboardingPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Onboarding" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Tabs defaultValue="paperwork" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="paperwork">Paperwork</TabsTrigger>
                        <TabsTrigger value="orientation">Orientation</TabsTrigger>
                        <TabsTrigger value="training">Training</TabsTrigger>
                        <TabsTrigger value="socialization">Socialization</TabsTrigger>
                    </TabsList>
                    <TabsContent value="paperwork">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Paperwork</CardTitle>
                                <CardDescription>Completing all necessary hiring and legal documents for Jane Smith.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {onboardingTasks.map(task => (
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
                    </TabsContent>
                    <TabsContent value="orientation">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Orientation</CardTitle>
                                <CardDescription>Introducing the new employee to the company's mission, vision, values, and policies.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Orientation content will go here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="training">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Training</CardTitle>
                                <CardDescription>Providing an overview of the tools, systems, and processes they'll use.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Training content will go here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="socialization">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Socialization</CardTitle>
                                <CardDescription>Introducing the new hire to their team and colleagues to help them build relationships.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Socialization content will go here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
