
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TimesheetApprovalPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Time & Attendance" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Timesheet Approval</CardTitle>
                        <CardDescription>
                            Review, edit, and approve employee timesheets.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Timesheet approval content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
