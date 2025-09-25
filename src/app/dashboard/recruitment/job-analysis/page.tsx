import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function JobAnalysisPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Recruitment" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Job Analysis</CardTitle>
            <CardDescription>Defining the duties, responsibilities, and qualifications for a position.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Job analysis content will go here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
