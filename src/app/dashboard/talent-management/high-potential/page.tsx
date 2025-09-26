
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HighPotentialPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Talent Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">High-Potential Identification</CardTitle>
                        <CardDescription>
                            Flags and tracks high-performing, high-potential employees.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>High-Potential Identification content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
