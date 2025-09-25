import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const upcomingInterviews = [
  {
    candidate: "John Doe",
    role: "Software Engineer",
    date: "2023-11-10",
    time: "2:00 PM EST",
    interviewers: ["Alice", "Bob"],
    stage: "Technical Round",
    status: "Scheduled",
  },
  {
    candidate: "Jane Smith",
    role: "Product Manager",
    date: "2023-11-12",
    time: "10:30 AM PST",
    interviewers: ["Charlie"],
    stage: "Hiring Manager",
    status: "Scheduled",
  },
    {
    candidate: "Sam Wilson",
    role: "UX Designer",
    date: "2023-11-08",
    time: "4:00 PM GMT",
    interviewers: ["David", "Eve"],
    stage: "Portfolio Review",
    status: "Completed",
  },
];

const getBadgeVariant = (status: string) => {
    switch (status) {
        case "Scheduled":
            return "default";
        case "Completed":
            return "secondary";
        default:
            return "outline";
    }
}

export default function InterviewsPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Recruitment" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">Interviews</CardTitle>
              <CardDescription>
                Schedule, manage, and evaluate candidate interviews.
              </CardDescription>
            </div>
            <Button>
              <PlusCircle className="mr-2" />
              Schedule Interview
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Interviewers</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingInterviews.map((interview, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {interview.candidate}
                    </TableCell>
                    <TableCell>{interview.role}</TableCell>
                    <TableCell>
                      {interview.date} at {interview.time}
                    </TableCell>
                    <TableCell>{interview.interviewers.join(", ")}</TableCell>
                    <TableCell>{interview.stage}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(interview.status)}>{interview.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        {interview.status === "Scheduled" && (
                             <Button variant="outline" size="sm">
                                <Video className="mr-2 h-4 w-4" />
                                Join Call
                            </Button>
                        )}
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
