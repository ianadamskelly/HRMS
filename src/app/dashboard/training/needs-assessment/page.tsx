import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function NeedsAssessmentPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Training & Development" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Needs Assessment</CardTitle>
                        <CardDescription>Identifying skill gaps within the organization.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Needs assessment content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
