
'use client';

import { useState, useEffect } from 'react';
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Loader2, Edit, Trash2, Eye } from "lucide-react";
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getJobDescriptions, addJobDescription, updateJobDescription, deleteJobDescription, type JobDescription } from "@/firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

function ViewJDDialog({ jd }: { jd: JobDescription }) {
    return (
        <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle className="font-headline">{jd.title}</DialogTitle>
                <DialogDescription>
                    {jd.family} | Version: {jd.version} | Status: <Badge variant={getBadgeVariant(jd.status)}>{jd.status}</Badge>
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                <div className="space-y-2">
                    <h4 className="font-semibold">Salary Range</h4>
                    <p className="text-sm text-muted-foreground">{jd.salaryRange}</p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold">Duties & Responsibilities</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{jd.duties}</p>
                </div>
                <div className="space-y-2">
                    <h4 className="font-semibold">Qualifications</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{jd.qualifications}</p>
                </div>
            </div>
             <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

function AddEditJDDialog({ onSave, jobDescription }: { onSave: () => void, jobDescription?: JobDescription | null }) {
    const [title, setTitle] = useState(jobDescription?.title || '');
    const [family, setFamily] = useState(jobDescription?.family || '');
    const [duties, setDuties] = useState(jobDescription?.duties || '');
    const [qualifications, setQualifications] = useState(jobDescription?.qualifications || '');
    const [salaryRange, setSalaryRange] = useState(jobDescription?.salaryRange || '');
    const [status, setStatus] = useState<JobDescription['status']>(jobDescription?.status || 'Draft');
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async () => {
        if (!title || !family) {
            toast({ variant: 'destructive', title: "Title and Job Family are required." });
            return;
        }

        setIsSaving(true);
        const jdData = {
            title,
            family,
            duties,
            qualifications,
            salaryRange,
            version: jobDescription?.version || "v1.0", // Handle versioning later
            status,
        };

        try {
            if (jobDescription) {
                await updateJobDescription(jobDescription.id, jdData);
                toast({ title: "Job Description updated successfully!" });
            } else {
                await addJobDescription(jdData);
                toast({ title: "Job Description created successfully!" });
            }
            onSave();
        } catch (error) {
            toast({ variant: 'destructive', title: `Error ${jobDescription ? 'updating' : 'creating'} Job Description.` });
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };
    
    return (
        <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
                <DialogTitle className="font-headline">{jobDescription ? 'Edit' : 'New'} Job Description</DialogTitle>
                <DialogDescription>
                   {jobDescription ? 'Update the details for this job description.' : "Create a new job description template. It will be saved as a 'Draft'."}
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Senior Software Engineer" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="family">Job Family</Label>
                    <Input id="family" value={family} onChange={e => setFamily(e.target.value)} placeholder="e.g. Engineering" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="duties">Duties</Label>
                    <Textarea id="duties" value={duties} onChange={e => setDuties(e.target.value)} placeholder="Describe the primary duties..." className="min-h-[100px]" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="qualifications">Qualifications</Label>
                    <Textarea id="qualifications" value={qualifications} onChange={e => setQualifications(e.target.value)} placeholder="List required qualifications..." className="min-h-[100px]" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input id="salary" value={salaryRange} onChange={e => setSalaryRange(e.target.value)} placeholder="e.g. $120,000 - $160,000" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={status} onValueChange={(value: JobDescription['status']) => setStatus(value)}>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="In Review">In Review</SelectItem>
                            <SelectItem value="Approved">Approved</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                 <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                 </DialogClose>
                 <Button onClick={handleSubmit} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}


export default function JobAnalysisPage() {
  const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedJd, setSelectedJd] = useState<JobDescription | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [jdToDelete, setJdToDelete] = useState<string | null>(null);

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

  const handleJDSaved = () => {
    setIsAddEditDialogOpen(false);
    setSelectedJd(null);
    fetchJDs();
  };

  const handleOpenEditDialog = (jd: JobDescription) => {
    setSelectedJd(jd);
    setIsAddEditDialogOpen(true);
  };
  
  const handleOpenViewDialog = (jd: JobDescription) => {
    setSelectedJd(jd);
    setIsViewDialogOpen(true);
  };

  const handleOpenNewDialog = () => {
    setSelectedJd(null);
    setIsAddEditDialogOpen(true);
  }

  const handleDelete = async () => {
      if (!jdToDelete) return;
      try {
        await deleteJobDescription(jdToDelete);
        toast({ title: "Job Description deleted." });
        fetchJDs();
      } catch (e) {
        toast({ variant: 'destructive', title: 'Failed to delete job description.' });
      } finally {
        setIsDeleteDialogOpen(false);
        setJdToDelete(null);
      }
  }

  const openDeleteConfirm = (id: string) => {
    setJdToDelete(id);
    setIsDeleteDialogOpen(true);
  }

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Recruitment" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline">Job Description Repository</h2>
            <p className="text-muted-foreground">Store and manage all standardized job descriptions.</p>
          </div>
           <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={handleOpenNewDialog}>
                        <PlusCircle className="mr-2" />
                        Add New JD
                    </Button>
                </DialogTrigger>
                <AddEditJDDialog onSave={handleJDSaved} jobDescription={selectedJd} />
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
                        <TableHead className="text-right">Actions</TableHead>
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
                                    <Dialog open={isViewDialogOpen && selectedJd?.id === jd.id} onOpenChange={(isOpen) => { if(!isOpen) { setIsViewDialogOpen(false); setSelectedJd(null); } }}>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon" onClick={() => handleOpenViewDialog(jd)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        {selectedJd && <ViewJDDialog jd={selectedJd} />}
                                    </Dialog>
                                    <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(jd)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <AlertDialog open={isDeleteDialogOpen && jdToDelete === jd.id} onOpenChange={setIsDeleteDialogOpen}>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon" onClick={() => openDeleteConfirm(jd.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete the job description for "{jd.title}".
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel onClick={() => setJdToDelete(null)}>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
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
