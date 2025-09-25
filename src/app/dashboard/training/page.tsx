import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const trainingPrograms = [
    {
        title: "Leadership Development",
        description: "Enhance your leadership skills and prepare for management roles.",
        date: "2023-11-15",
        image: PlaceHolderImages[0],
    },
    {
        title: "Advanced Project Management",
        description: "Master agile methodologies and advanced project planning techniques.",
        date: "2023-11-20",
        image: { imageUrl: "https://picsum.photos/seed/training2/600/400", imageHint: "team collaboration" }
    },
    {
        title: "Cybersecurity Awareness",
        description: "Learn to identify and prevent common cybersecurity threats.",
        date: "2023-11-22",
        image: { imageUrl: "https://picsum.photos/seed/training3/600/400", imageHint: "cyber security" }
    },
];

export default function TrainingPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Training & Development" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Tabs defaultValue="implementation" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="needs-assessment">Needs Assessment</TabsTrigger>
                        <TabsTrigger value="program-design">Program Design</TabsTrigger>
                        <TabsTrigger value="implementation">Implementation</TabsTrigger>
                        <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
                    </TabsList>
                    <TabsContent value="needs-assessment">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Needs Assessment</CardTitle>
                                <CardDescription>Identifying skill gaps within the organization.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Needs assessment content will go here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="program-design">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Program Design</CardTitle>
                                <CardDescription>Creating training materials and selecting delivery methods (e.g., workshops, e-learning).</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Program design content will go here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="implementation">
                         <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Implementation</CardTitle>
                                <CardDescription>Delivering the training.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {trainingPrograms.map((program, index) => (
                                        <Card key={index} className="flex flex-col">
                                            <CardHeader className="p-0">
                                                <Image
                                                    src={program.image.imageUrl}
                                                    alt={program.title}
                                                    width={600}
                                                    height={400}
                                                    className="rounded-t-lg object-cover aspect-[3/2]"
                                                    data-ai-hint={program.image.imageHint}
                                                />
                                            </CardHeader>
                                            <CardContent className="flex-1 p-6">
                                                <CardTitle className="font-headline mb-2">{program.title}</CardTitle>
                                                <CardDescription>{program.description}</CardDescription>
                                                <p className="text-sm text-muted-foreground mt-4">Date: {program.date}</p>
                                            </CardContent>
                                            <CardFooter>
                                                <Button className="w-full">View Details</Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="evaluation">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Evaluation</CardTitle>
                                <CardDescription>Assessing the effectiveness of the training programs.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Evaluation content will go here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}