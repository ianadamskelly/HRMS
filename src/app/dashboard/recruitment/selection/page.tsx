import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SelectionPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Recruitment" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Selection</CardTitle>
            <CardDescription>Choosing the best candidate and extending a job offer.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Selection content will go here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
