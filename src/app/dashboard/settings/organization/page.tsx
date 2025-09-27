
'use client';

import { useState, useEffect, useRef } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Upload, Building, MapPin, PlusCircle, Trash2, Edit, Loader2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { 
    getOrganizationProfile, 
    updateOrganizationProfile, 
    uploadCompanyLogo,
    getDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    getLocations,
    addLocation,
    updateLocation,
    deleteLocation,
} from "@/firebase/firestore";

type OrganizationProfile = {
    name: string;
    address: string;
    contactInfo: string;
    logoUrl: string;
};

type Department = {
    id: string;
    name: string;
};

type Location = {
    id: string;
    name: string;
};


function AddEditDepartmentDialog({ department, onSave }: { department?: Department | null, onSave: () => void }) {
    const [name, setName] = useState(department ? department.name : "");
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handleSave = async () => {
        if (!name) {
            toast({ variant: "destructive", title: "Name is required." });
            return;
        }
        setIsSaving(true);
        try {
            if (department) {
                await updateDepartment(department.id, { name });
                toast({ title: "Department updated successfully!" });
            } else {
                await addDepartment({ name });
                toast({ title: "Department added successfully!" });
            }
            onSave();
        } catch (error) {
            toast({ variant: "destructive", title: "Error saving department." });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{department ? 'Edit' : 'Add'} Department</DialogTitle>
                <DialogDescription>
                    {department ? 'Update the details for this department.' : 'Add a new department to your organization.'}
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dept-name" className="text-right">Name</Label>
                    <Input id="dept-name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                 <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSaving ? 'Saving...' : 'Save'}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}

function AddEditLocationDialog({ location, onSave }: { location?: Location | null, onSave: () => void }) {
    const [name, setName] = useState(location ? location.name : "");
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handleSave = async () => {
        if (!name) {
            toast({ variant: "destructive", title: "Name is required." });
            return;
        }
        setIsSaving(true);
        try {
            if (location) {
                await updateLocation(location.id, { name });
                toast({ title: "Location updated successfully!" });
            } else {
                await addLocation({ name });
                toast({ title: "Location added successfully!" });
            }
            onSave();
        } catch (error) {
            toast({ variant: "destructive", title: "Error saving location." });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{location ? 'Edit' : 'Add'} Location</DialogTitle>
                <DialogDescription>
                    {location ? 'Update the details for this location.' : 'Add a new office location.'}
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="loc-name" className="text-right">Name</Label>
                    <Input id="loc-name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                 <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSaving ? 'Saving...' : 'Save'}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}


export default function OrganizationPage() {
    const [profile, setProfile] = useState<OrganizationProfile>({ name: '', address: '', contactInfo: '', logoUrl: "https://picsum.photos/seed/logo/100/100" });
    const [departments, setDepartments] = useState<Department[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const fetchAllData = async () => {
        try {
            const profileData = await getOrganizationProfile();
            if (profileData) {
                setProfile(profileData as OrganizationProfile);
            }
            const depts = await getDepartments();
            setDepartments(depts as Department[]);
            const locs = await getLocations();
            setLocations(locs as Location[]);
        } catch (error) {
            toast({ variant: "destructive", title: "Error fetching data." });
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setProfile(prev => ({ ...prev, [id]: value }));
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        try {
            await updateOrganizationProfile(profile);
            toast({ title: "Company details saved successfully!" });
        } catch (error) {
            toast({ variant: "destructive", title: "Error saving company details." });
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) { // 2MB limit
             toast({ variant: "destructive", title: "File is too large", description: "Logo should be less than 2MB." });
            return;
        }

        if (!file.type.startsWith('image/')) {
             toast({ variant: "destructive", title: "Invalid file type", description: "Please upload an image file." });
            return;
        }

        setIsUploading(true);
        try {
            const downloadURL = await uploadCompanyLogo(file);
            const updatedProfile = { ...profile, logoUrl: downloadURL };
            await updateOrganizationProfile(updatedProfile);
            setProfile(updatedProfile);
            toast({ title: "Logo uploaded successfully!" });
        } catch (error) {
            toast({ variant: "destructive", title: "Error uploading logo." });
        } finally {
            setIsUploading(false);
        }
    };
    
    const handleDeleteDepartment = async (id: string) => {
        try {
            await deleteDepartment(id);
            toast({ title: "Department deleted." });
            fetchAllData();
        } catch (error) {
            toast({ variant: "destructive", title: "Error deleting department." });
        }
    };
    
    const handleDeleteLocation = async (id: string) => {
        try {
            await deleteLocation(id);
            toast({ title: "Location deleted." });
            fetchAllData();
        } catch (error) {
            toast({ variant: "destructive", title: "Error deleting location." });
        }
    };


  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Organization Setup" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Company Details</CardTitle>
            <CardDescription>
              Manage your company's branding and basic information.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company Name</Label>
                <Input id="name" value={profile.name} onChange={handleProfileChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={profile.address} onChange={handleProfileChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactInfo">Contact Information</Label>
                <Input id="contactInfo" value={profile.contactInfo} onChange={handleProfileChange} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20">
                    {isUploading ? (
                        <div className="flex h-full w-full items-center justify-center rounded-lg border bg-muted">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                    ) : (
                        <Image
                            src={profile.logoUrl || "https://picsum.photos/seed/logo/100/100"}
                            alt="Company Logo"
                            width={80}
                            height={80}
                            className="rounded-lg border object-cover h-20 w-20"
                            />
                    )}
                </div>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" /> Upload New Logo
                </Button>
                <Input type="file" ref={fileInputRef} className="hidden" onChange={handleLogoUpload} accept="image/png, image/jpeg, image/gif" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveChanges} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Company Details
            </Button>
          </CardFooter>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline flex items-center gap-2"><Building /> Departments</CardTitle>
                        <CardDescription>Manage company departments.</CardDescription>
                    </div>
                     <Dialog onOpenChange={(isOpen) => !isOpen && fetchAllData()}>
                        <DialogTrigger asChild><Button size="sm"><PlusCircle className="mr-2 h-4 w-4"/>Add</Button></DialogTrigger>
                        <AddEditDepartmentDialog onSave={fetchAllData} />
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            {departments.map((dept) => (
                                <TableRow key={dept.id}>
                                    <TableCell className="font-medium">{dept.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog onOpenChange={(isOpen) => !isOpen && fetchAllData()}>
                                            <DialogTrigger asChild><Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button></DialogTrigger>
                                            <AddEditDepartmentDialog department={dept} onSave={fetchAllData} />
                                        </Dialog>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive"/></Button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the department.</AlertDialogDescription></AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteDepartment(dept.id)}>Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline flex items-center gap-2"><MapPin /> Locations</CardTitle>
                        <CardDescription>Manage office locations.</CardDescription>
                    </div>
                     <Dialog onOpenChange={(isOpen) => !isOpen && fetchAllData()}>
                        <DialogTrigger asChild><Button size="sm"><PlusCircle className="mr-2 h-4 w-4"/>Add</Button></DialogTrigger>
                        <AddEditLocationDialog onSave={fetchAllData} />
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            {locations.map((loc) => (
                                <TableRow key={loc.id}>
                                    <TableCell className="font-medium">{loc.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog onOpenChange={(isOpen) => !isOpen && fetchAllData()}>
                                            <DialogTrigger asChild><Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button></DialogTrigger>
                                            <AddEditLocationDialog location={loc} onSave={fetchAllData} />
                                        </Dialog>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive"/></Button></AlertDialogTrigger>
                                             <AlertDialogContent>
                                                <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the location.</AlertDialogDescription></AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDeleteLocation(loc.id)}>Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">Organizational Chart</CardTitle>
            <CardDescription>
              Visualize and manage the company's reporting structure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 border rounded-lg text-center bg-muted">
                <p className="font-semibold">Interactive Organizational Chart</p>
                <p className="text-sm text-muted-foreground">This visualization is driven by the 'Reports To' field on employee profiles.</p>
                <div className="mt-4 text-sm">
                    <p className="font-bold">CEO</p>
                    <div className="flex justify-center"><div className="w-px h-6 bg-border"></div></div>
                    <div className="flex justify-around">
                        <div className="w-full relative before:absolute before:left-1/2 before:-top-6 before:h-6 before:w-px before:bg-border">
                            <p>VP of Engineering</p>
                        </div>
                        <div className="w-full relative before:absolute before:left-1/2 before:-top-6 before:h-6 before:w-px before:bg-border after:absolute after:left-0 after:-top-px after:h-px after:w-full after:bg-border">
                             <p>VP of Product</p>
                        </div>
                         <div className="w-full relative before:absolute before:left-1/2 before:-top-6 before:h-6 before:w-px before:bg-border after:absolute after:left-0 after:-top-px after:h-px after:w-full after:bg-border">
                            <p>VP of Sales</p>
                        </div>
                    </div>
                </div>
            </div>
          </CardContent>
           <CardFooter>
            <Button variant="outline">Manage Reporting Lines</Button>
          </CardFooter>
        </Card>

      </main>
    </div>
  );
}
