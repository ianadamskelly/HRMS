
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
import { PlusCircle, ShieldAlert } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const rolesWithPermissions = [
  {
    title: "Admin",
    description: "Has full system access.",
    permissions: [
      { id: "admin.all", label: "Manage All Settings & Users" },
    ],
  },
  {
    title: "Manager",
    description: "Can view their direct reports and manage performance reviews.",
    permissions: [
      { id: "perf.manage", label: "Manage Performance Reviews" },
      { id: "team.view", label: "View Team Information" },
    ],
  },
  {
    title: "Employee",
    description: "Can view their own information and complete assigned tasks.",
    permissions: [
        { id: "self.view", label: "View Own Profile" },
        { id: "tasks.complete", label: "Complete Assigned Tasks" }
    ],
  },
];

export default function RolesPage() {
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
            <Button>
              <PlusCircle className="mr-2" />
              Add Role
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {rolesWithPermissions.map((role) => (
                <Card key={role.title} className="bg-secondary">
                    <CardHeader>
                        <CardTitle className="text-lg">{role.title}</CardTitle>
                        <CardDescription>{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <h4 className="font-medium">Permissions:</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {role.permissions.map((permission) => (
                                <div key={permission.id} className="flex items-center space-x-2">
                                    <Checkbox id={permission.id} defaultChecked />
                                    <Label htmlFor={permission.id} className="text-sm font-normal">{permission.label}</Label>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline">Save Permissions</Button>
                    </CardFooter>
                </Card>
            ))}
          </CardContent>
        </Card>
        <Alert>
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle className="font-headline">Important: Setting User Roles</AlertTitle>
            <AlertDescription>
                <p>
                To assign these roles to users, you need to set a custom claim on their Firebase Authentication profile.
                This must be done from a secure, server-side environment.
                </p>
                <p className="mt-2">
                Typically, this is handled by a Cloud Function for Firebase that triggers when a user is created or when their role is changed in the database.
                For example, you could write a function that sets a user's role to 'employee' upon their creation.
                </p>
            </AlertDescription>
        </Alert>
      </main>
    </div>
  );
}

