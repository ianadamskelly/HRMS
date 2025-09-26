
'use client';

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge }
from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Clock, Users, FileEdit, GitBranch, ArrowRight, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const reviewCycles = [
    { name: "Annual Review 2023", status: "Completed", progress: 100 },
    { name: "Mid-Year Check-in 2024", status: "In Progress", progress: 45 },
    { name: "Probationary Review - Q2", status: "Not Started", progress: 0 },
];

const feedbackProviders = [
    { name: "Alice Johnson", relation: "Peer", status: "Completed", avatar: "https://picsum.photos/seed/user2/40/40" },
    { name: "Charlie Brown", relation: "Peer", status: "Completed", avatar: "https://picsum.photos/seed/user3/40/40" },
    { name: "David Williams", relation: "Direct Report", status: "Pending", avatar: "https://picsum.photos/seed/user4/40/40" },
];

const calibrationData = [
    { name: "John Doe", team: "Engineering", rating: 8, potential: "High" },
    { name: "Jane Smith", team: "Engineering", rating: 9, potential: "High" },
    { name: "Peter Jones", team: "Engineering", rating: 7, potential: "Medium" },
    { name: "Sarah Miller", team: "Product", rating: 8, potential: "Medium" },
];

export default function PerformanceAppraisalPage() {
    const [overallRating, setOverallRating] = useState(5);

    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Performance Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Review Cycle Configuration */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><GitBranch/> Review Cycle Configuration</CardTitle>
                        <CardDescription>Define and launch different appraisal types, timelines, and workflows.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cycle Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="w-[200px]">Progress</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reviewCycles.map((cycle, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{cycle.name}</TableCell>
                                        <TableCell><Badge variant={cycle.status === 'Completed' ? 'secondary' : cycle.status === 'In Progress' ? 'default' : 'outline'}>{cycle.status}</Badge></TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Progress value={cycle.progress} className="w-[60%]" />
                                                <span className="text-xs text-muted-foreground">{cycle.progress}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right"><Button variant="outline" size="sm">View Details</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button>Create New Cycle</Button>
                    </CardFooter>
                </Card>

                {/* 360-Degree Feedback */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Users/> 360-Degree Feedback</CardTitle>
                        <CardDescription>Manage confidential, multi-rater feedback for John Doe.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Feedback Provider</TableHead>
                                    <TableHead>Relation</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {feedbackProviders.map((provider, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={provider.avatar} alt={provider.name} />
                                                <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            {provider.name}
                                        </TableCell>
                                        <TableCell>{provider.relation}</TableCell>
                                        <TableCell>
                                            <Badge variant={provider.status === 'Completed' ? 'default' : 'outline'}>
                                                {provider.status === 'Completed' ? <CheckCircle className="mr-2 h-4 w-4" /> : <Clock className="mr-2 h-4 w-4" />}
                                                {provider.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right"><Button variant="outline" size="sm">Send Reminder</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                         </Table>
                    </CardContent>
                    <CardFooter>
                        <Button>Request More Feedback</Button>
                    </CardFooter>
                </Card>

                {/* Review Form Completion */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><FileEdit/> Review Form Completion</CardTitle>
                        <CardDescription>Structured digital form for managers and employees to rate performance for John Doe for the Mid-Year 2024 cycle.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-8">
                            <Card className="bg-secondary">
                                <CardHeader>
                                    <CardTitle className="text-lg">Data Pulled from Other Modules</CardTitle>
                                    <CardDescription>Contextual reference from Goal Setting and Continuous Feedback modules.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold">Goal Progress</h4>
                                        <p className="text-sm text-muted-foreground">Launch New Feature X: <span className="font-medium">75% Complete</span></p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Peer Feedback Summary</h4>
                                        <p className="text-sm text-muted-foreground italic">"Huge props to John for going above and beyond..."</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-2">
                                <Label htmlFor="strengths">Manager's Assessment: Strengths</Label>
                                <Textarea id="strengths" placeholder="Describe the employee's key strengths demonstrated during this review period..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="areas-for-improvement">Manager's Assessment: Areas for Improvement</Label>
                                <Textarea id="areas-for-improvement" placeholder="Identify areas where the employee can grow and provide actionable suggestions..." />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="employee-comments">Employee's Self-Assessment & Comments</Label>
                                <Textarea id="employee-comments" placeholder="Employee can add their comments and self-assessment here..." />
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="overall-rating">Overall Performance Rating</Label>
                                <div className="flex items-center gap-4">
                                    <Slider id="overall-rating" value={[overallRating]} onValueChange={(value) => setOverallRating(value[0])} max={10} step={1} />
                                    <span className="text-lg font-bold w-12 text-center p-2 rounded-md bg-primary text-primary-foreground">{overallRating}/10</span>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Save as Draft</Button>
                        <Button>Submit Final Review</Button>
                    </CardFooter>
                </Card>

                {/* Rating Calibration Tool */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><TrendingUp/> Rating Calibration Tool</CardTitle>
                        <CardDescription>Review and adjust ratings across teams to ensure fairness and consistency.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Team</TableHead>
                                    <TableHead>Manager Rating</TableHead>
                                    <TableHead>Calibrated Rating</TableHead>
                                    <TableHead>Potential</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {calibrationData.map((emp, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{emp.name}</TableCell>
                                        <TableCell>{emp.team}</TableCell>
                                        <TableCell>{emp.rating}</TableCell>
                                        <TableCell className="w-[120px]">
                                            <Select defaultValue={emp.rating.toString()}>
                                                <SelectTrigger><SelectValue/></SelectTrigger>
                                                <SelectContent>{[...Array(10)].map((_, i) => <SelectItem key={i+1} value={(i+1).toString()}>{i+1}</SelectItem>)}</SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={emp.potential === 'High' ? 'default' : 'secondary'}>{emp.potential}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                 {/* Outcome Integration */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">Outcome Integration</CardTitle>
                        <CardDescription>Finalized ratings automatically feed into other modules.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Requires sign-off from the employee, manager, and HR/senior management before the review is finalized.</p>
                    </CardContent>
                     <CardFooter>
                        <Button>
                           Finalize & Lock Ratings <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </CardFooter>
                </Card>

            </main>
        </div>
    );
}
