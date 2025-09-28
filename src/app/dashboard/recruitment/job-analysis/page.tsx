
'use client';

import { useState, useEffect } from 'react';
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Loader2 } from "lucide-react";
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
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getJobDescriptions, addJobDescription, type JobDescription } from "@/firebase/firestore";
import { useToast } from "@/hooks/use-toast";

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

function AddNewJDDialog({ onJDCreated }: { onJDCreated: () => void }) {
    const [title, setTitle] = useState('');
    const [family, setFamily] = useState('');
    const [duties, setDuties] = useState('');
    const [qualifications, setQualifications] = useState('');
    const [salaryRange, setSalaryRange] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async () => {
        if (!title || !family) {
            toast({ variant: 'destructive', title: "Title and Job Family are required." });
            return;
        }

        setIsSaving(true);
        try {
            await addJobDescription({
                title,
                family,
                duties,
                qualifications,
                salaryRange,
                version: "v1.0",
                status: "Draft",
            });
            toast({ title: "Job Description created successfully!" });
            onJDCreated();
        } catch (error) {
            toast({ variant: 'destructive', title: "Error creating Job Description." });
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };
    
    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle className="font-headline">New Job Description</DialogTitle>
                <DialogDescription>
                    Create a new job description template. It will be saved as a 'Draft'.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Title</Label>
                    <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Senior Software Engineer" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="family" className="text-right">Job Family</Label>
                    <Input id="family" value={family} onChange={e => setFamily(e.target.value)} placeholder="e.g. Engineering" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duties" className="text-right">Duties</Label>
                    <Textarea id="duties" value={duties} onChange={e => setDuties(e.target.value)} placeholder="Describe the primary duties..." className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="qualifications" className="text-right">Qualifications</Label>
                    <Textarea id="qualifications" value={qualifications} onChange={e => setQualifications(e.target.value)} placeholder="List required qualifications..." className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="salary" className="text-right">Salary Range</Label>
                    <Input id="salary" value={salaryRange} onChange={e => setSalaryRange(e.target.value)} placeholder="e.g. $120,000 - $160,000" className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                 <DialogClose asChild>
                    <Button type="submit" onClick={handleSubmit} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create JD
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}


export default function JobAnalysisPage() {
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const fetchJDs = async () => {
      setIsLoading(true);
      try {
          const jds = await getJobDescriptions();
          setJobDescriptions(jds);
      } catch (error) {
          toast({ variant: 'destructive', title: 'Failed to fetch job descriptions.' });
      } finally {
          setIsLoading(false);
      }
  };

  useEffect(() => {
      fetchJDs();
  }, []);

  const handleJDCreated = () => {
    setIsDialogOpen(false);
    fetchJDs();
  };


  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Recruitment" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Job Description Repository</h2>
            <p className="text-muted-foreground">Store and manage all standardized job descriptions.</p>
          </div>
           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Add New JD
                    </Button>
                </DialogTrigger>
                <AddNewJDDialog onJDCreated={handleJDCreated} />
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
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center">
                                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                            </TableCell>
                        </TableRow>
                    ) : jobDescriptions.length === 0 ? (
                         <TableRow>
                            <TableCell colSpan={5} className="text-center h-24">
                                No job descriptions found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        jobDescriptions.map((jd) => (
                            <TableRow key={jd.id}>
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
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
      </main>
    </div>
  );
}
