import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function CalculationPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Payroll" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Calculation</CardTitle>
                        <CardDescription>Determining gross pay, and subtracting taxes and other deductions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Calculation content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
