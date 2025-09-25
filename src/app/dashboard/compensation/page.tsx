import { DashboardHeader } from "@/components/dashboard-header";
import { CompensationForm } from "./compensation-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CompensationPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Compensation" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="font-headline">AI Compensation Suggester</CardTitle>
                        <CardDescription>
                            Use our AI-powered tool to get a baseline compensation suggestion for any role.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CompensationForm />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
