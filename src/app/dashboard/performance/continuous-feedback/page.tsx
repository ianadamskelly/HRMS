import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ContinuousFeedbackPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Performance Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Continuous Feedback</CardTitle>
                        <CardDescription>Providing regular feedback on performance throughout the year.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Continuous feedback content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
