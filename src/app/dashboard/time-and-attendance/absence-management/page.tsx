
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AbsenceManagementPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Time & Attendance" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Absence Management</CardTitle>
                        <CardDescription>
                            Request, approve, and track leave.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Absence management content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
