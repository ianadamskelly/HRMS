
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DevelopmentPlansPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Talent Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Individual Development Plans (IDPs)</CardTitle>
                        <CardDescription>
                            Creates and tracks structured, long-term development plans for key employees.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Individual Development Plans content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
