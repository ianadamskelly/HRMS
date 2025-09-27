
'use client';

import { useState, useEffect } from "react";
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
import { PlusCircle, ShieldAlert, Edit, Trash2, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getRoles, addRole, updateRole, deleteRole } from "@/firebase/firestore";

// Define all possible permissions in the system
const allPermissions = [
    { id: "admin.manage", label: "Manage All Settings & Users" },
    { id: "employees.view", label: "View All Employees" },
    { id: "employees.edit", label: "Edit Employee Profiles" },
    { id: "roles.manage", label: "Manage Roles & Permissions" },
    { id: "performance.manage", label: "Manage Performance Reviews" },
    { id: "team.view", label: "View Team Information" },
    { id: "self.view", label: "View Own Profile" },
    { id: "tasks.complete", label: "Complete Assigned Tasks" },
    { id: "recruitment.manage", label: "Manage Recruitment" },
    { id: "payroll.manage", label: "Manage Payroll" },
    { id: "benefits.manage", label: "Manage Benefits" },
    { id: "training.manage", label: "Manage Training" },
];

export type Role = {
    id: string;
    title: string;
    description: string;
    permissions: string[];
};


function AddEditRoleDialog({ role, onSave }: { role?: Role | null, onSave: () => void }) {
    const [title, setTitle] = useState(role ? role.title : "");
    const [description, setDescription] = useState(role ? role.description : "");
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>(role ? role.permissions : []);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handlePermissionChange = (permissionId: string) => {
        setSelectedPermissions(prev => 
            prev.includes(permissionId) 
                ? prev.filter(p => p !== permissionId) 
                : [...prev, permissionId]
        );
    };

    const handleSave = async () => {
        if (!title) {
            toast({ variant: "destructive", title: "Title is required." });
            return;
        }
        setIsSaving(true);
        const roleData = { title, description, permissions: selectedPermissions };

        try {
            if (role) {
                await updateRole(role.id, roleData);
                toast({ title: "Role updated successfully!" });
            } else {
                await addRole(roleData);
                toast({ title: "Role added successfully!" });
            }
            onSave();
        } catch (error) {
            console.error("Error saving role:", error);
            toast({ variant: "destructive", title: "Error saving role." });
        } finally {
            setIsSaving(false);
        }
    };
    
    // Admin role cannot be edited/deleted, show a disabled view
    if (role && role.title === 'Admin') {
        return (
             <DialogContent>
                <DialogHeader>
                    <DialogTitle>Admin Role (Read-only)</DialogTitle>
                    <DialogDescription>
                        The Admin role has all permissions and cannot be modified.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <p><span className="font-semibold">Title:</span> Admin</p>
                    <p><span className="font-semibold">Description:</span> Has full system access.</p>
                     <div>
                        <h4 className="font-semibold mb-2">Permissions:</h4>
                        <p className="text-sm text-muted-foreground">All permissions granted.</p>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button type="button" variant="secondary">Close</Button></DialogClose>
                </DialogFooter>
            </DialogContent>
        )
    }

    return (
        <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle>{role ? 'Edit' : 'Add'} Role</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="role-title">Role Title</Label>
                    <Input id="role-title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="role-desc">Description</Label>
                    <Textarea id="role-desc" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <h4 className="font-medium">Permissions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-md max-h-60 overflow-y-auto">
                        {allPermissions.map((permission) => (
                            <div key={permission.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={permission.id}
                                    checked={selectedPermissions.includes(permission.id)}
                                    onCheckedChange={() => handlePermissionChange(permission.id)}
                                />
                                <Label htmlFor={permission.id} className="text-sm font-normal cursor-pointer">{permission.label}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <DialogFooter>
                 <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSaving ? 'Saving...' : 'Save Role'}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}


export default function RolesPage() {
    const [roles, setRoles] = useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const fetchRoles = async () => {
        setIsLoading(true);
        try {
            const rolesData = await getRoles();
            setRoles(rolesData as Role[]);
        } catch (error) {
            toast({ variant: "destructive", title: "Error fetching roles." });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleDelete = async (roleId: string) => {
        try {
            await deleteRole(roleId);
            toast({ title: "Role deleted successfully." });
            fetchRoles();
        } catch (error) {
            toast({ variant: "destructive", title: "Error deleting role." });
        }
    };

    const getPermissionLabel = (permissionId: string) => {
        return allPermissions.find(p => p.id === permissionId)?.label || permissionId;
    }

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Roles & Permissions" />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">Role Definitions</CardTitle>
              <CardDescription>
                Define user roles and their permissions within the system.
              </CardDescription>
            </div>
            <Dialog onOpenChange={(isOpen) => !isOpen && fetchRoles()}>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Add Role
                    </Button>
                </DialogTrigger>
                <AddEditRoleDialog onSave={fetchRoles} />
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading ? (
                <div className="flex justify-center items-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                roles.map((role) => (
                    <Card key={role.id} className="bg-secondary">
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div>
                                <CardTitle className="text-lg">{role.title}</CardTitle>
                                <CardDescription>{role.description}</CardDescription>
                            </div>
                            {role.title !== 'Admin' && (
                                <div className="flex gap-1">
                                    <Dialog onOpenChange={(isOpen) => !isOpen && fetchRoles()}>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                                        </DialogTrigger>
                                        <AddEditRoleDialog role={role} onSave={fetchRoles} />
                                    </Dialog>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>This action cannot be undone. This will permanently delete the <span className="font-bold">{role.title}</span> role.</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(role.id)}>Delete</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <h4 className="font-medium">Permissions:</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2">
                                {role.title === 'Admin' ? (
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="admin-all" checked disabled />
                                        <Label htmlFor="admin-all" className="text-sm font-normal">Manage All Settings & Users</Label>
                                    </div>
                                ) : (
                                   role.permissions.map((permissionId) => (
                                        <div key={permissionId} className="flex items-center space-x-2">
                                            <Checkbox id={`${role.id}-${permissionId}`} checked disabled />
                                            <Label htmlFor={`${role.id}-${permissionId}`} className="text-sm font-normal">{getPermissionLabel(permissionId)}</Label>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
          </CardContent>
        </Card>
        <Alert>
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle className="font-headline">Important: Setting User Roles</AlertTitle>
            <AlertDescription>
                <p>
                To assign these roles to users, you need to set a custom claim on their Firebase Authentication profile. This is handled by a Cloud Function when you add or edit an employee in the "Employees" settings page.
                </p>
            </AlertDescription>
        </Alert>
      </main>
    </div>
  );
}
