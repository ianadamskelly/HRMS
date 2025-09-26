
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TalentReviewPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Talent Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Talent Review</CardTitle>
                        <CardDescription>
                            Supports formal talent review meetings with visual tools and reporting on talent pools.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Talent Review content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
