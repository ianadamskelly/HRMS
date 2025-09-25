import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ExitInterviewPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Exit Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Exit Interview</CardTitle>
                        <CardDescription>Conducting a meeting with the departing employee to gather feedback on their experience with the company.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Exit Interview content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
