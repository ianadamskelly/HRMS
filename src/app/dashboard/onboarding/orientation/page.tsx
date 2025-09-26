import { DashboardHeader } from "@/components/dashboard-header";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, FileText, Video, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const welcomeDocuments = [
    { title: "Employee Handbook" },
    { title: "Organizational Chart" },
    { title: "Mission & Vision Statement" },
    { title: "Code of Conduct" },
    { title: "IT Policy" },
];

const roleBasedContent = [
    { title: "Sales Team Playbook", role: "Sales" },
    { title: "Engineering Best Practices", role: "Engineering" },
];

const checkInSurveys = [
    { day: 30, status: "Completed" },
    { day: 60, status: "Pending" },
    { day: 90, status: "Pending" },
]

const getBadgeVariant = (status: string) => {
    switch (status) {
        case "Completed":
            return "default";
        case "Pending":
            return "outline";
        default:
            return "secondary";
    }
}


export default function OrientationPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Onboarding" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">

                {/* Digital Welcome Package */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Digital Welcome Package for Jane Smith</CardTitle>
                        <CardDescription>Essential documents and company information.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative mb-6 max-w-md">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search documents..."
                                className="pl-8"
                            />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            {welcomeDocuments.map((doc, index) => (
                                <Button key={index} variant="outline" className="justify-start gap-3 p-6 text-left h-auto">
                                    <FileText className="h-6 w-6 text-primary" />
                                    <span className="font-semibold">{doc.title}</span>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Role-Based Content */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Role-Based Content</CardTitle>
                        <CardDescription>Orientation materials tailored to Jane's role in Engineering.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 sm:grid-cols-2">
                             {roleBasedContent.map((doc, index) => (
                                <Button key={index} variant="outline" className="justify-start gap-3 p-6 text-left h-auto">
                                    <FileText className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="font-semibold">{doc.title}</p>
                                        <p className="text-sm text-muted-foreground">For: {doc.role} Department</p>
                                    </div>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Virtual Tour/Videos */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Virtual Tours & Welcome Messages</CardTitle>
                        <CardDescription>Hear from our leadership and take a tour of our virtual campus.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                            <Video className="h-12 w-12 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>

                {/* Check-in Surveys */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Onboarding Check-in Surveys</CardTitle>
                        <CardDescription>Automated pulse surveys to gather feedback on the onboarding experience.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-3">
                        {checkInSurveys.map(survey => (
                            <div key={survey.day} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="font-semibold">Day {survey.day} Survey</div>
                                 <Badge variant={getBadgeVariant(survey.status)}>
                                    {survey.status === "Completed" ? <CheckCircle className="mr-2 h-4 w-4" /> : <Clock className="mr-2 h-4 w-4" />}
                                    {survey.status}
                                 </Badge>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <p className="text-sm text-muted-foreground">Analytics will be shown here once surveys are completed.</p>
                    </CardFooter>
                </Card>

            </main>
        </div>
    );
}
