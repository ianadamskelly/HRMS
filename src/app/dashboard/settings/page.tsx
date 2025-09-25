import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Settings" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Settings</CardTitle>
                        <CardDescription>
                            Manage your application settings here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Settings content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
