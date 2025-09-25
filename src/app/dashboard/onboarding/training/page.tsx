import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function OnboardingTrainingPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Onboarding" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Training</CardTitle>
                        <CardDescription>Providing an overview of the tools, systems, and processes they'll use.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Training content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
