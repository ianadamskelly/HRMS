import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, ClipboardList, TrendingUp, UserPlus } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";

const overviewItems = [
  {
    icon: Users,
    label: "Total Employees",
    value: "1,254",
  },
  {
    icon: UserPlus,
    label: "New Hires",
    value: "23",
  },
  {
    icon: ClipboardList,
    label: "Open Positions",
    value: "12",
  },
  {
    icon: TrendingUp,
    label: "Pending Reviews",
    value: "8",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Dashboard" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight font-headline">Welcome back, HR Manager!</h2>
          <p className="text-muted-foreground">Here's a quick overview of your organization.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {overviewItems.map((item, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Navigate to any module from the sidebar to get started.</p>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
