import { DashboardHeader } from "@/components/dashboard-header";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Calendar, Send, Link as LinkIcon, Users, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const buddy = {
    name: "Alex Johnson",
    role: "Senior Software Engineer",
    avatar: "https://picsum.photos/seed/buddy/100/100",
};

const checkIns = [
    { date: "2023-11-15", status: "Completed" },
    { date: "2023-11-22", status: "Upcoming" },
    { date: "2023-11-29", status: "Upcoming" },
]

export default function SocializationPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Onboarding" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Buddy/Mentor Program */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><UserPlus /> Buddy/Mentor Program Assignment</CardTitle>
                        <CardDescription>Pairing the new hire, Jane Smith, with an established employee.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold mb-4">Assigned Buddy</h3>
                            <div className="flex items-center gap-4 p-4 border rounded-lg">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={buddy.avatar} alt={buddy.name} />
                                    <AvatarFallback>{buddy.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold">{buddy.name}</p>
                                    <p className="text-sm text-muted-foreground">{buddy.role}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Scheduled Check-ins</h3>
                            <div className="space-y-3">
                                {checkIns.map((checkin, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-md">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="h-5 w-5 text-muted-foreground" />
                                            <span className="font-medium">Check-in: {checkin.date}</span>
                                        </div>
                                        <Badge variant={checkin.status === "Completed" ? "default" : "outline"}>{checkin.status}</Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Team Introduction Automation */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Send /> Team Introduction Automation</CardTitle>
                        <CardDescription>Draft and send a pre-scheduled announcement to the Engineering team about Jane Smith.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                            <Label htmlFor="announcement-bio">Customize Bio</Label>
                            <Textarea
                                id="announcement-bio"
                                placeholder="Customize the announcement..."
                                defaultValue="Please join us in welcoming Jane Smith to the team! Jane is our new Software Engineer, starting on November 6th. She brings a wealth of experience in full-stack development and is excited to contribute to our upcoming projects. Feel free to reach out and say hello!"
                                className="min-h-[150px]"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button><Send className="mr-2 h-4 w-4" /> Schedule Announcement</Button>
                    </CardFooter>
                </Card>

                {/* Organizational Chart Visualization */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Users /> Organizational Chart Visualization</CardTitle>
                        <CardDescription>An interactive chart showing the new hire's position and reporting line.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="p-6 border rounded-lg text-center bg-muted">
                            <p className="font-semibold">Interactive Organizational Chart</p>
                            <p className="text-sm text-muted-foreground">Click-through to view colleague profiles, contact info, and current projects.</p>
                            {/* Placeholder for Org Chart */}
                            <div className="mt-4 text-sm">
                                <p className="font-bold">CEO</p>
                                <div className="flex justify-center"><div className="w-px h-6 bg-border"></div></div>
                                <p>VP of Engineering</p>
                                <div className="flex justify-center"><div className="w-px h-6 bg-border"></div></div>
                                <p className="font-bold text-primary">Alex Johnson (Manager)</p>
                                <div className="flex justify-center"><div className="w-px h-6 bg-border"></div></div>
                                <p className="font-semibold text-accent">Jane Smith (New Hire)</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                {/* Goal Setting & Alignment */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><LinkIcon /> Goal Setting & Alignment</CardTitle>
                        <CardDescription>Facilitate the initial 30-60-90 day goal-setting meeting between manager and new hire.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            This section links to the Performance Management module to ensure the new hire understands their key priorities from day one.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Link href="/dashboard/performance/goal-setting" passHref>
                           <Button variant="outline">
                                <LinkIcon className="mr-2 h-4 w-4"/>
                                Go to Goal Setting Module
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
                
            </main>
        </div>
    );
}
