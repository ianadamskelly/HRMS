import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function GoalSettingPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Performance Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Goal Setting</CardTitle>
                        <CardDescription>Defining clear, measurable objectives for employees.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Goal setting content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
