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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Video, Edit, Book, Users, PlusCircle, ArrowRight, List, GitBranch } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const courseCatalog = [
    { title: "Leadership 101", topic: "Management", skill: "Leadership", method: "ILT" },
    { title: "Advanced React", topic: "Engineering", skill: "React", method: "E-learning" },
    { title: "Public Speaking Workshop", topic: "Communication", skill: "Presentation", method: "Blended" },
];

const deliveryMethods = ["Instructor-Led Training (ILT)", "Virtual ILT (VILT)", "E-learning", "Blended", "Mentorship/Coaching"];

const learningPaths = [
    { title: "New Manager Track", courses: 5 },
    { title: "Software Certification Path", courses: 8 },
];


export default function ProgramDesignPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Training & Development" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Content Authoring Tool */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Edit /> Content Authoring Tool</CardTitle>
                        <CardDescription>Quickly create and upload simple learning content like text, quizzes, and videos.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        <Button variant="outline"><FileText className="mr-2 h-4 w-4"/> Create Text Module</Button>
                        <Button variant="outline"><List className="mr-2 h-4 w-4"/> Create Quiz</Button>
                        <Button variant="outline"><Video className="mr-2 h-4 w-4"/> Upload Video</Button>
                    </CardContent>
                </Card>

                {/* Course Catalog Management */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Book /> Course Catalog Management</CardTitle>
                        <CardDescription>Central repository for all training resources, categorized by topic, skill, and delivery method.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search courses by topic, skill..."
                                    className="pl-8"
                                />
                            </div>
                            <Select>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by Method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ilt">ILT</SelectItem>
                                    <SelectItem value="vilt">VILT</SelectItem>
                                    <SelectItem value="elearning">E-learning</SelectItem>
                                    <SelectItem value="blended">Blended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Course Title</TableHead>
                                    <TableHead>Topic</TableHead>
                                    <TableHead>Skill</TableHead>
                                    <TableHead>Delivery Method</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courseCatalog.map((course, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{course.title}</TableCell>
                                        <TableCell>{course.topic}</TableCell>
                                        <TableCell>{course.skill}</TableCell>
                                        <TableCell><Badge variant="secondary">{course.method}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Delivery Method Selection */}
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Users /> Delivery Method Selection</CardTitle>
                        <CardDescription>Define and manage different delivery formats and track resource allocation.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-3">
                       {deliveryMethods.map((method, index) => (
                           <Badge key={index} variant="outline" className="text-base p-2">{method}</Badge>
                       ))}
                    </CardContent>
                    <CardFooter>
                        <Button variant="ghost">Manage Instructor Availability <ArrowRight className="ml-2 h-4 w-4"/></Button>
                    </CardFooter>
                </Card>

                {/* Learning Path Creation */}
                 <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-headline flex items-center gap-2"><GitBranch /> Learning Path Creation</CardTitle>
                            <CardDescription>Bundle mandatory and suggested courses into structured sequences.</CardDescription>
                        </div>
                        <Button><PlusCircle className="mr-2 h-4 w-4"/> Create Path</Button>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        {learningPaths.map((path, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>{path.title}</CardTitle>
                                    <CardDescription>{path.courses} courses in this path</CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <Button variant="outline">View Path Details</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardContent>
                </Card>

            </main>
        </div>
    );
}
