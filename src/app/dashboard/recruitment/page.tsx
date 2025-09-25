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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const applicants = [
  { name: "John Doe", role: "Software Engineer", stage: "Interview", appliedOn: "2023-10-26" },
  { name: "Jane Smith", role: "Product Manager", stage: "Offer", appliedOn: "2023-10-24" },
  { name: "Sam Wilson", role: "UX Designer", stage: "Screening", appliedOn: "2023-10-28" },
  { name: "Alice Johnson", role: "Data Scientist", stage: "Hired", appliedOn: "2023-10-15" },
  { name: "Bob Brown", role: "Software Engineer", stage: "Rejected", appliedOn: "2023-10-22" },
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


export default function RecruitmentPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Recruitment" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Applicant Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Applied On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell>{applicant.role}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(applicant.stage)}>{applicant.stage}</Badge>
                    </TableCell>
                    <TableCell>{applicant.appliedOn}</TableCell>
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
