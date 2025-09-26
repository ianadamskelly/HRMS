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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Send, ThumbsUp, Tag, Link as LinkIcon, BookOpen, MessageSquare, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


const feedbackFeed = [
    { 
        from: { name: "Alice Johnson", avatar: "https://picsum.photos/seed/user2/40/40" },
        to: { name: "John Doe", avatar: "https://picsum.photos/seed/user1/40/40" },
        message: "Huge props to John for going above and beyond to help us resolve that critical bug over the weekend. Your dedication is truly appreciated!",
        tags: ["Problem Solving", "Teamwork"],
        likes: 12,
    },
     { 
        from: { name: "Charlie Brown", avatar: "https://picsum.photos/seed/user3/40/40" },
        to: { name: "John Doe", avatar: "https://picsum.photos/seed/user1/40/40" },
        message: "John's presentation on the new architecture was incredibly clear and well-researched. It helped the whole team get aligned.",
        tags: ["Communication"],
        likes: 8,
    },
];

const developmentPlans = [
    {
        title: "Improve Public Speaking Skills",
        action: "Enroll in a presentation skills workshop.",
        status: "Suggested Training",
    },
    {
        title: "Deepen Knowledge of System Architecture",
        action: "Lead the design review for the next major feature.",
        status: "Action Plan",
    }
]


export default function ContinuousFeedbackPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Performance Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Check-in/1-on-1 Logging */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">Check-in / 1-on-1 Logging</CardTitle>
                        <CardDescription>Log notes, discussion topics, and action items from informal meetings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <Select defaultValue="john-doe">
                                <SelectTrigger className="w-full sm:w-[220px]">
                                    <SelectValue placeholder="Select Employee" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="john-doe">John Doe</SelectItem>
                                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Tabs defaultValue="shared">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="shared"><MessageSquare className="mr-2 h-4 w-4"/>Shared Notes</TabsTrigger>
                                <TabsTrigger value="private"><Lock className="mr-2 h-4 w-4"/>Private Notes</TabsTrigger>
                            </TabsList>
                            <TabsContent value="shared">
                                <Textarea className="mt-2 min-h-[150px]" placeholder="Add a shared note visible to both you and John Doe..." />
                            </TabsContent>
                            <TabsContent value="private">
                                <Textarea className="mt-2 min-h-[150px]" placeholder="Add a private note visible only to you..." />
                            </TabsContent>
                        </Tabs>

                    </CardContent>
                    <CardFooter>
                        <Button><PlusCircle className="mr-2 h-4 w-4"/>Save Note</Button>
                    </CardFooter>
                </Card>

                {/* Real-time Feedback Tool */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">Real-time Feedback Tool</CardTitle>
                        <CardDescription>Provide specific, timely, and constructive recognition or feedback to any colleague.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Textarea placeholder="Give recognition or feedback to a colleague... Use @ to mention someone." />
                             <div className="flex justify-end mt-2">
                                <Button><Send className="mr-2 h-4 w-4"/>Post Feedback</Button>
                             </div>
                        </div>

                        <div className="space-y-4">
                             <h3 className="text-lg font-semibold font-headline">Peer Recognition Feed</h3>
                             {feedbackFeed.map((item, index) => (
                                 <Card key={index} className="p-4 bg-secondary">
                                     <div className="flex items-start gap-3">
                                         <Avatar className="h-10 w-10 border">
                                            <AvatarImage src={item.from.avatar} />
                                            <AvatarFallback>{item.from.name.charAt(0)}</AvatarFallback>
                                         </Avatar>
                                         <div className="flex-1">
                                             <p className="text-sm">
                                                 <span className="font-semibold">{item.from.name}</span> gave feedback to <span className="font-semibold">{item.to.name}</span>
                                             </p>
                                             <p className="mt-1">{item.message}</p>
                                             <div className="flex items-center gap-2 mt-2 flex-wrap">
                                                 {item.tags.map(tag => (
                                                     <Badge key={tag} variant="outline"><Tag className="mr-1 h-3 w-3"/>{tag}</Badge>
                                                 ))}
                                             </div>
                                         </div>
                                         <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                                             <ThumbsUp className="h-4 w-4"/> {item.likes}
                                         </Button>
                                     </div>
                                 </Card>
                             ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Coaching & Development Planning */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">Coaching & Development Planning</CardTitle>
                        <CardDescription>Document developmental action plans and suggested training for John Doe.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {developmentPlans.map((plan, index) => (
                            <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                                <div>
                                    <p className="font-semibold">{plan.title}</p>
                                    <p className="text-sm text-muted-foreground">{plan.action}</p>
                                </div>
                                <Badge variant={plan.status === "Action Plan" ? "secondary" : "outline"}>
                                    {plan.status === "Suggested Training" ? <BookOpen className="mr-2 h-4 w-4"/> : <LinkIcon className="mr-2 h-4 w-4"/>}
                                    {plan.status}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="flex flex-wrap gap-2">
                        <Button><PlusCircle className="mr-2 h-4 w-4"/>Add Development Plan</Button>
                         <Link href="/dashboard/training/implementation">
                            <Button variant="outline"><LinkIcon className="mr-2 h-4 w-4"/>Link to Training Module</Button>
                         </Link>
                    </CardFooter>
                </Card>

            </main>
        </div>
    );
}
