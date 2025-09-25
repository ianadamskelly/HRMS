import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const jobDescriptions = [
    {
        title: "Senior Software Engineer",
        family: "Engineering",
        version: "v2.1",
        status: "Approved",
    },
    {
        title: "Product Manager",
        family: "Product",
        version: "v1.5",
        status: "In Review",
    },
    {
        title: "UX/UI Designer",
        family: "Design",
        version: "v1.0",
        status: "Approved",
    },
    {
        title: "Data Scientist",
        family: "Data & Analytics",
        version: "v1.2",
        status: "Draft",
    },
];

const getBadgeVariant = (status: string) => {
    switch (status) {
        case "Approved":
            return "default";
        case "In Review":
            return "secondary";
        case "Draft":
            return "outline";
        default:
            return "outline";
    }
}


export default function JobAnalysisPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Recruitment" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Job Description Repository</h2>
            <p className="text-muted-foreground">Store and manage all standardized job descriptions.</p>
          </div>
           <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Add New JD
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="font-headline">New Job Description</DialogTitle>
                        <DialogDescription>
                            Create a new job description template.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input id="title" placeholder="e.g. Senior Software Engineer" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="family" className="text-right">
                                Job Family
                            </Label>
                            <Input id="family" placeholder="e.g. Engineering" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="duties" className="text-right">
                                Duties
                            </Label>
                            <Textarea id="duties" placeholder="Describe the primary duties..." className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="qualifications" className="text-right">
                                Qualifications
                            </Label>
                            <Textarea id="qualifications" placeholder="List required qualifications..." className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="salary" className="text-right">
                                Salary Range
                            </Label>
                            <Input id="salary" placeholder="e.g. $120,000 - $160,000" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Create JD</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder="Search job descriptions..."
                className="pl-8 w-full sm:w-[300px]"
            />
        </div>
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Job Family</TableHead>
                        <TableHead>Version</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobDescriptions.map((jd, index) => (
                         <TableRow key={index}>
                            <TableCell className="font-medium">{jd.title}</TableCell>
                            <TableCell>{jd.family}</TableCell>
                            <TableCell>{jd.version}</TableCell>
                            <TableCell>
                                <Badge variant={getBadgeVariant(jd.status)}>{jd.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="sm">View</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
      </main>
    </div>
  );
}
