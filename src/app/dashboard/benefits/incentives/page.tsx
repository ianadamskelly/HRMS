import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function IncentivesPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Benefits" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Incentives</CardTitle>
                        <CardDescription>
                            Offering bonuses, commissions, or profit-sharing to motivate employees.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Content for Incentives goes here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
