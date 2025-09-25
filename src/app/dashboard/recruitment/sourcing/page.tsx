import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Linkedin, Briefcase, Share2, Users, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const requisitions = [
  {
    title: "Senior Software Engineer",
    status: "Open",
    budget: "$150,000",
    posted: "LinkedIn, Indeed",
  },
  {
    title: "Product Manager",
    status: "Filled",
    budget: "$140,000",
    posted: "Internal",
  },
  {
    title: "UX/UI Designer",
    status: "Draft",
    budget: "$120,000",
    posted: "Not Posted",
  },
    {
    title: "Data Scientist",
    status: "Canceled",
    budget: "$160,000",
    posted: "Not Posted",
  },
];

const referrals = [
    { employee: "Alice Johnson", candidate: "David Chen", status: "Hired", bonus: "$2,000" },
    { employee: "Bob Williams", candidate: "Emily Rodriguez", status: "Interviewing", bonus: "$2,000" },
    { employee: "Charlie Brown", candidate: "Frank Miller", status: "New Submission", bonus: "$1,500" },
]

const talentPool = [
    { name: "Grace Lee", role: "Software Engineer", skills: "React, Node.js", location: "Remote" },
    { name: "Henry Wilson", role: "Product Manager", skills: "Agile, Roadmapping", location: "New York, NY" },
]


const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Open":
      return "default";
    case "Filled":
      return "secondary";
    case "Draft":
        return "outline";
    case "Canceled":
        return "destructive";
    default:
      return "outline";
  }
};


export default function SourcingPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Recruitment" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        
        {/* Requisition Management */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle className="font-headline flex items-center gap-2"><FileText /> Requisition Management</CardTitle>
                <CardDescription>Create and track official open positions.</CardDescription>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Requisition
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Position</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Posted To</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requisitions.map((req, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{req.title}</TableCell>
                            <TableCell><Badge variant={getBadgeVariant(req.status)}>{req.status}</Badge></TableCell>
                            <TableCell>{req.budget}</TableCell>
                            <TableCell>{req.posted}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Multi-Channel Posting */}
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Briefcase/> Multi-Channel Posting</CardTitle>
            <CardDescription>Post job openings to internal and external job boards.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button variant="outline"><Linkedin className="mr-2 h-4 w-4"/> Post to LinkedIn</Button>
            <Button variant="outline"><Briefcase className="mr-2 h-4 w-4"/> Post to Indeed</Button>
            <Button variant="outline"><Share2 className="mr-2 h-4 w-4"/> Post to Social Media</Button>
          </CardContent>
        </Card>

        {/* Employee Referral Program */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline flex items-center gap-2"><Users /> Employee Referral Program</CardTitle>
                    <CardDescription>Manage employee referrals and track bonus payouts.</CardDescription>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Referral
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Referring Employee</TableHead>
                            <TableHead>Candidate</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Referral Bonus</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {referrals.map((ref, index) => (
                            <TableRow key={index}>
                                <TableCell>{ref.employee}</TableCell>
                                <TableCell>{ref.candidate}</TableCell>
                                <TableCell><Badge variant={ref.status === 'Hired' ? 'default' : 'outline'}>{ref.status}</Badge></TableCell>
                                <TableCell>{ref.bonus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        {/* Talent Pool/Pipeline */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-headline flex items-center gap-2"><Users /> Talent Pool / Pipeline</CardTitle>
                    <CardDescription>Nurture relationships with promising candidates for future openings.</CardDescription>
                </div>
                 <Button variant="outline">Manage Segments</Button>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Desired Role</TableHead>
                            <TableHead>Skills</TableHead>
                            <TableHead>Location</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {talentPool.map((candidate, index) => (
                            <TableRow key={index}>
                                <TableCell>{candidate.name}</TableCell>
                                <TableCell>{candidate.role}</TableCell>
                                <TableCell>{candidate.skills}</TableCell>
                                <TableCell>{candidate.location}</TableCell>
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