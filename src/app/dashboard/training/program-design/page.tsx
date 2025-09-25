import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function ProgramDesignPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Training & Development" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Program Design</CardTitle>
                        <CardDescription>Creating training materials and selecting delivery methods (e.g., workshops, e-learning).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Program design content will go here.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
