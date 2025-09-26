
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Target, Users, GitBranch, Filter } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const goals = [
    {
        title: "Launch New Feature X",
        owner: { name: "John Doe", avatar: "https://picsum.photos/seed/user1/40/40" },
        dueDate: "2023-12-31",
        progress: 75,
        status: "On Track",
        weight: "High",
        linkedTo: "Increase User Engagement by 15%",
    },
    {
        title: "Improve API Response Time",
        owner: { name: "John Doe", avatar: "https://picsum.photos/seed/user1/40/40" },
        dueDate: "2023-11-30",
        progress: 40,
        status: "At Risk",
        weight: "Medium",
        linkedTo: "Enhance Platform Stability",
    },
    {
        title: "Complete Security Audit",
        owner: { name: "John Doe", avatar: "https://picsum.photos/seed/user1/40/40" },
        dueDate: "2023-10-31",
        progress: 100,
        status: "Complete",
        weight: "High",
        linkedTo: "Achieve SOC 2 Compliance",
    },
     {
        title: "Publish 4 Technical Blog Posts",
        owner: { name: "John Doe", avatar: "https://picsum.photos/seed/user1/40/40" },
        dueDate: "2023-12-31",
        progress: 50,
        status: "On Track",
        weight: "Low",
        linkedTo: "Increase Engineering Brand Presence",
    },
];

const getBadgeVariant = (status: string) => {
    switch (status) {
        case "On Track":
            return "default";
        case "At Risk":
            return "destructive";
        case "Complete":
            return "secondary";
        default:
            return "outline";
    }
}

export default function GoalSettingPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Performance Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-headline flex items-center gap-2"><Target /> Goal Setting & Tracking</CardTitle>
                            <CardDescription>Collaboratively create, document, and track performance goals.</CardDescription>
                        </div>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add New Goal
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-4 mb-6">
                            <Select defaultValue="john-doe">
                                <SelectTrigger className="w-full sm:w-[200px]">
                                    <SelectValue placeholder="Select Employee" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="john-doe">John Doe</SelectItem>
                                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                                </SelectContent>
                            </Select>
                             <Select defaultValue="q4-2023">
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Select Period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="q4-2023">Q4 2023</SelectItem>
                                    <SelectItem value="q1-2024">Q1 2024</SelectItem>
                                </SelectContent>
                            </Select>
                             <Button variant="outline" className="ml-auto">
                                <Filter className="mr-2 h-4 w-4"/>
                                Filter
                            </Button>
                        </div>

                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[300px]">Goal Title</TableHead>
                                        <TableHead>Owner</TableHead>
                                        <TableHead>Due Date</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead className="w-[150px]">Progress</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {goals.map((goal, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-medium">{goal.title}</TableCell>
                                            <TableCell className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage src={goal.owner.avatar} alt={goal.owner.name} />
                                                    <AvatarFallback>{goal.owner.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                {goal.owner.name}
                                            </TableCell>
                                            <TableCell>{goal.dueDate}</TableCell>
                                             <TableCell>
                                                <Badge variant={goal.weight === "High" ? "destructive" : goal.weight === "Medium" ? "secondary" : "outline"}>
                                                    {goal.weight}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={goal.progress} className="w-[80%]" />
                                                    <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={getBadgeVariant(goal.status)}>{goal.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">View</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><GitBranch /> Cascading Goals</CardTitle>
                        <CardDescription>Ensuring organizational alignment by linking employee goals to department and company objectives.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="relative pl-8 before:absolute before:left-3.5 before:top-4 before:h-full before:w-px before:bg-border">
                           <div className="flex items-center gap-3 relative">
                                <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <Target className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="font-semibold">Company Objective: Increase User Engagement by 15%</p>
                                    <p className="text-sm text-muted-foreground">Q4 2023</p>
                                </div>
                           </div>
                           <div className="relative pl-12 pt-4 before:absolute before:left-[22px] before:top-0 before:h-4 before:w-6 before:border-b before:border-l before:border-border before:rounded-bl-md">
                                <div className="flex items-center gap-3 relative">
                                    <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                                        <Users className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Engineering Dept: Launch New Feature X</p>
                                        <p className="text-sm text-muted-foreground">Led by Engineering Team</p>
                                    </div>
                                </div>
                                <div className="relative pl-12 pt-4 before:absolute before:left-[22px] before:top-0 before:h-4 before:w-6 before:border-b before:border-l before:border-border before:rounded-bl-md">
                                     <div className="flex items-center gap-3 relative">
                                        <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src="https://picsum.photos/seed/user1/40/40" />
                                                <AvatarFallback>JD</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div>
                                            <p className="font-semibold">John Doe's Goal: Develop Backend for Feature X</p>
                                            <p className="text-sm text-muted-foreground">Progress: 75%</p>
                                        </div>
                                    </div>
                                </div>
                           </div>
                       </div>
                    </CardContent>
                </Card>

            </main>
        </div>
    );
}
