
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SuccessionPlanningPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Talent Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Succession Planning</CardTitle>
                        <CardDescription>
                            Maps out potential replacements for critical roles and executive positions.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Succession Planning content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
