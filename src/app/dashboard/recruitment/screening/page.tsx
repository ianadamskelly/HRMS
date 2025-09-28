
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, View } from "lucide-react";

const applicants = [
  { name: "John Doe", role: "Software Engineer", stage: "Interview", appliedOn: "2023-10-26", score: 92 },
  { name: "Jane Smith", role: "Product Manager", stage: "Offer", appliedOn: "2023-10-24", score: 88 },
  { name: "Sam Wilson", role: "UX Designer", stage: "Screening", appliedOn: "2023-10-28", score: 78 },
  { name: "Alice Johnson", role: "Data Scientist", stage: "Hired", appliedOn: "2023-10-15", score: 95 },
  { name: "Bob Brown", role: "Software Engineer", stage: "Rejected", appliedOn: "2023-10-22", score: 65 },
];

const getBadgeVariant = (stage: string) => {
  switch (stage) {
    case "Hired":
      return "default";
    case "Offer":
      return "secondary";
    case "Rejected":
      return "destructive";
    default:
      return "outline";
  }
};

export default function ScreeningPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Recruitment" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Applicant Tracking & Screening</CardTitle>
            <CardDescription>Reviewing applications and resumes to identify the most suitable candidates.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell>{applicant.role}</TableCell>
                    <TableCell className="text-center font-semibold">{applicant.score}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(applicant.stage)}>{applicant.stage}</Badge>
                    </TableCell>
                    <TableCell>{applicant.appliedOn}</TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="icon">
                            <View className="h-4 w-4" />
                            <span className="sr-only">View Application</span>
                        </Button>
                        <Button variant="outline" size="icon">
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Email Applicant</span>
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
