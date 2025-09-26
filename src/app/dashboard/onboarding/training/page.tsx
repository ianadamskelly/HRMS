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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Book, HardDrive, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const lmsCourses = [
    { title: "Company Security Training", status: "Completed", progress: 100 },
    { title: "Harassment Prevention", status: "In Progress", progress: 50 },
    { title: "Intro to Company Software Suite", status: "Assigned", progress: 0 },
];

const provisioningTasks = [
    { id: "laptop", label: "Provision Laptop (Dell XPS 15)", status: "Completed" },
    { id: "monitor", label: "Setup dual monitors", status: "Completed" },
    { id: "email", label: "Create email account (jane.smith@example.com)", status: "Completed" },
    { id: "slack", label: "Invite to Slack workspace", status: "In Progress" },
    { id: "jira", label: "Grant JIRA access", status: "Pending" },
]

const getBadgeVariant = (status: string) => {
    switch (status) {
        case "Completed":
            return "default";
        case "In Progress":
            return "secondary";
        default:
            return "outline";
    }
}

export default function OnboardingTrainingPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Onboarding" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">

                {/* LMS Integration */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Book /> Learning Management System (LMS) Integration</CardTitle>
                        <CardDescription>Assign mandatory introductory courses and track completion.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-[200px]">Progress</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {lmsCourses.map((course, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{course.title}</TableCell>
                                        <TableCell>
                                            <Badge variant={getBadgeVariant(course.status)}>{course.status}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Progress value={course.progress} className="w-[60%]" />
                                                <span className="text-xs text-muted-foreground">{course.progress}%</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button>Assign New Course</Button>
                    </CardFooter>
                </Card>

                {/* IT & Equipment Provisioning */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><HardDrive /> IT & Equipment Provisioning</CardTitle>
                        <CardDescription>Automated workflow to request and track necessary tools and access for Jane Smith.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                            {provisioningTasks.map(task => (
                                <div key={task.id} className="flex items-center space-x-3">
                                    <Checkbox id={task.id} checked={task.status === 'Completed'} />
                                    <Label htmlFor={task.id} className={`${task.status === 'Completed' ? 'line-through text-muted-foreground' : ''}`}>
                                        {task.label}
                                    </Label>
                                    <Badge variant={getBadgeVariant(task.status)} className="ml-auto">{task.status}</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                     <CardFooter>
                        <Button>Request New Equipment</Button>
                    </CardFooter>
                </Card>
                
                {/* Knowledge Base Access */}
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><HelpCircle /> Knowledge Base Access</CardTitle>
                        <CardDescription>Provide immediate, filtered access to relevant departmental and functional documentation.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative mb-6 max-w-md">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search documentation, procedures, FAQs..."
                                className="pl-8"
                            />
                        </div>
                        <div className="space-y-2">
                            <p className="font-medium">Frequently Accessed for Engineers:</p>
                            <div className="flex flex-wrap gap-2">
                                <Button variant="link" className="p-0 h-auto">Code Style Guide</Button>
                                <Button variant="link" className="p-0 h-auto">Deployment Process</Button>
                                <Button variant="link" className="p-0 h-auto">VPN Setup Instructions</Button>
                                <Button variant="link" className="p-0 h-auto">Engineering Team Directory</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

            </main>
        </div>
    );
}
