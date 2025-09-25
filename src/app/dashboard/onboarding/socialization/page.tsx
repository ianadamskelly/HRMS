import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SocializationPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Onboarding" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Socialization</CardTitle>
                        <CardDescription>Introducing the new hire to their team and colleagues to help them build relationships.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Socialization content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
