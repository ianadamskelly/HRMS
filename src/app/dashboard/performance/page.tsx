import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PerformancePage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Performance Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Tabs defaultValue="appraisal" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="goal-setting">Goal Setting</TabsTrigger>
                        <TabsTrigger value="feedback">Continuous Feedback</TabsTrigger>
                        <TabsTrigger value="appraisal">Performance Appraisal</TabsTrigger>
                    </TabsList>
                    <TabsContent value="goal-setting">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Goal Setting</CardTitle>
                                <CardDescription>Defining clear, measurable objectives for employees.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Goal setting content will go here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="feedback">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Continuous Feedback</CardTitle>
                                <CardDescription>Providing regular feedback on performance throughout the year.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Continuous feedback content will go here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="appraisal">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Performance Appraisal</CardTitle>
                                <CardDescription>A formal review of an employee's performance, usually conducted annually. This often results in decisions about promotions, pay raises, or further training.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="employee-name">Employee Name</Label>
                                            <Input id="employee-name" placeholder="e.g., John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="review-period">Review Period</Label>
                                            <Select>
                                                <SelectTrigger id="review-period">
                                                    <SelectValue placeholder="Select period" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="q4-2023">Q4 2023</SelectItem>
                                                    <SelectItem value="q1-2024">Q1 2024</SelectItem>
                                                    <SelectItem value="q2-2024">Q2 2024</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="strengths">Strengths</Label>
                                        <Textarea id="strengths" placeholder="Describe the employee's key strengths..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="areas-for-improvement">Areas for Improvement</Label>
                                        <Textarea id="areas-for-improvement" placeholder="Identify areas where the employee can grow..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="overall-rating">Overall Rating</Label>
                                        <div className="flex items-center gap-4">
                                            <Slider id="overall-rating" defaultValue={[5]} max={10} step={1} />
                                            <span className="text-sm font-medium w-8 text-center">5/10</span>
                                        </div>
                                    </div>
                                    <Button type="submit" className="w-full">Submit Review</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
