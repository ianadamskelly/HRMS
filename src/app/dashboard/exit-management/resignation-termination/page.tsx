import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ResignationTerminationPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Exit Management" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Resignation/Termination</CardTitle>
                        <CardDescription>Handling the official paperwork and communication related to an employee leaving.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Resignation/Termination content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
