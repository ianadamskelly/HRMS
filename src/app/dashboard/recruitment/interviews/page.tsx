import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function InterviewsPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Recruitment" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Interviews</CardTitle>
            <CardDescription>Conducting various types of interviews to assess skills and fit.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Interviews content will go here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
