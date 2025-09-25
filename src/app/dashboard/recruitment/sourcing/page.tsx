import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SourcingPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Recruitment" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Sourcing</CardTitle>
            <CardDescription>Finding potential candidates through various channels like job boards, social media, and employee referrals.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Sourcing content will go here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
