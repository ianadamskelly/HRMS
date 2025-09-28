
'use client';

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Linkedin, Briefcase, Share2, Users, FileText, Loader2, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
    getRequisitions, addRequisition, updateRequisition, deleteRequisition, type Requisition,
    getReferrals, addReferral, updateReferral, deleteReferral, type Referral,
    getTalentPool, addTalentPoolCandidate, updateTalentPoolCandidate, deleteTalentPoolCandidate, type TalentPoolCandidate
} from "@/firebase/firestore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const getBadgeVariant = (status: string) => {
  switch (status) {
    case "Open": return "default";
    case "Filled": return "secondary";
    case "Draft": return "outline";
    case "Canceled": return "destructive";
    case "Hired": return "default";
    case "Interviewing": return "secondary";
    case "New Submission": return "outline";
    default: return "outline";
  }
};


function AddEditRequisitionDialog({ requisition, onSave }: { requisition?: Requisition | null, onSave: () => void }) {
    const [title, setTitle] = useState(requisition ? requisition.title : "");
    const [budget, setBudget] = useState(requisition ? requisition.budget : "");
    const [status, setStatus] = useState(requisition ? requisition.status : "Draft");
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handleSave = async () => {
        if (!title) {
            toast({ variant: "destructive", title: "Title is required." });
            return;
        }
        setIsSaving(true);
        const data = { title, budget, status, posted: requisition?.posted || "Not Posted" };
        try {
            if (requisition) {
                await updateRequisition(requisition.id, data);
                toast({ title: "Requisition updated successfully!" });
            } else {
                await addRequisition(data);
                toast({ title: "Requisition created successfully!" });
            }
            onSave();
        } catch (error) {
            toast({ variant: "destructive", title: "Error saving requisition." });
        } finally {
            setIsSaving(false);
        }
    };
    
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{requisition ? 'Edit' : 'Create'} Requisition</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="req-title">Position Title</Label>
                    <Input id="req-title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="req-budget">Budget</Label>
                    <Input id="req-budget" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="$150,000" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="req-status">Status</Label>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Open">Open</SelectItem>
                            <SelectItem value="Filled">Filled</SelectItem>
                            <SelectItem value="Canceled">Canceled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save
                </Button>
            </DialogFooter>
        </DialogContent>
    )
}

export default function SourcingPage() {
    const [requisitions, setRequisitions] = useState<Requisition[]>([]);
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [talentPool, setTalentPool] = useState<TalentPoolCandidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [reqs, refs, pool] = await Promise.all([
                getRequisitions(),
                getReferrals(),
                getTalentPool()
            ]);
            setRequisitions(reqs as Requisition[]);
            setReferrals(refs as Referral[]);
            setTalentPool(pool as TalentPoolCandidate[]);
        } catch (error) {
            toast({ variant: "destructive", title: "Error fetching sourcing data."});
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleDeleteRequisition = async (id: string) => {
        try {
            await deleteRequisition(id);
            toast({ title: "Requisition deleted." });
            fetchData();
        } catch (error) {
            toast({ variant: "destructive", title: "Error deleting requisition." });
        }
    };


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
            <Dialog onOpenChange={(isOpen) => !isOpen && fetchData()}>
                <DialogTrigger asChild><Button><PlusCircle className="mr-2 h-4 w-4" /> Create Requisition</Button></DialogTrigger>
                <AddEditRequisitionDialog onSave={fetchData} />
            </Dialog>
          </CardHeader>
          <CardContent>
            {isLoading ? <Loader2 className="animate-spin" /> : (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Position</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Posted To</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requisitions.map((req) => (
                        <TableRow key={req.id}>
                            <TableCell className="font-medium">{req.title}</TableCell>
                            <TableCell><Badge variant={getBadgeVariant(req.status)}>{req.status}</Badge></TableCell>
                            <TableCell>{req.budget}</TableCell>
                            <TableCell>{req.posted}</TableCell>
                            <TableCell className="text-right">
                                <Dialog>
                                    <DialogTrigger asChild><Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button></DialogTrigger>
                                    <AddEditRequisitionDialog requisition={req} onSave={fetchData} />
                                </Dialog>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button></AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle></AlertDialogHeader>
                                        <AlertDialogDescription>This will permanently delete this requisition.</AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteRequisition(req.id)}>Delete</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            )}
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
                 {isLoading ? <Loader2 className="animate-spin" /> : (
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
                        {referrals.map((ref) => (
                            <TableRow key={ref.id}>
                                <TableCell>{ref.employee}</TableCell>
                                <TableCell>{ref.candidate}</TableCell>
                                <TableCell><Badge variant={getBadgeVariant(ref.status)}>{ref.status}</Badge></TableCell>
                                <TableCell>{ref.bonus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                 )}
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
                 {isLoading ? <Loader2 className="animate-spin" /> : (
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
                        {talentPool.map((candidate) => (
                            <TableRow key={candidate.id}>
                                <TableCell>{candidate.name}</TableCell>
                                <TableCell>{candidate.role}</TableCell>
                                <TableCell>{candidate.skills}</TableCell>
                                <TableCell>{candidate.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                )}
            </CardContent>
        </Card>
        
      </main>
    </div>
  );
}
