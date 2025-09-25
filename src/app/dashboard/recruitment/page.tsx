
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <Tabs defaultValue="job-analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="job-analysis">Job Analysis</TabsTrigger>
            <TabsTrigger value="sourcing">Sourcing</TabsTrigger>
            <TabsTrigger value="screening">Screening</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="selection">Selection</TabsTrigger>
          </TabsList>
          <TabsContent value="job-analysis">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Job Analysis</CardTitle>
                <CardDescription>Defining the duties, responsibilities, and qualifications for a position.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Job analysis content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sourcing">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Sourcing</CardTitle>
                <CardDescription>Finding potential candidates through various channels like job boards, social media, and employee referrals.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Sourcing content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="screening">
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
          </TabsContent>
          <TabsContent value="interviews">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Interviews</CardTitle>
                <CardDescription>Conducting various types of interviews to assess skills and fit.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Interviews content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="selection">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Selection</CardTitle>
                <CardDescription>Choosing the best candidate and extending a job offer.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Selection content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
