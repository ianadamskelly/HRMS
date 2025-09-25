import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function OrientationPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Onboarding" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Orientation</CardTitle>
                        <CardDescription>Introducing the new employee to the company's mission, vision, values, and policies.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Orientation content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
