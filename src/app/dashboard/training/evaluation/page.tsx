import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EvaluationPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Training & Development" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Evaluation</CardTitle>
                        <CardDescription>Assessing the effectiveness of the training programs.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Evaluation content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
