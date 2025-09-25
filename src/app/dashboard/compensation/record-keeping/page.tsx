import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function RecordKeepingPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Payroll" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Record Keeping</CardTitle>
                        <CardDescription>Maintaining accurate records for tax and legal compliance.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Record keeping content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
