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
import { PlusCircle } from "lucide-react";

const roles = [
  {
    title: "Software Engineer",
    department: "Engineering",
    salaryRange: "$100,000 - $150,000",
  },
  {
    title: "Product Manager",
    department: "Product",
    salaryRange: "$120,000 - $170,000",
  },
  {
    title: "UX Designer",
    department: "Design",
    salaryRange: "$90,000 - $140,000",
  },
  {
    title: "Data Scientist",
    department: "Data & Analytics",
    salaryRange: "$110,000 - $160,000",
  }
];

export default function RolesPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Roles" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">Role Definitions</CardTitle>
              <CardDescription>
                Define employee roles and their corresponding salary scales.
              </CardDescription>
            </div>
            <Button>
              <PlusCircle className="mr-2" />
              Add Role
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Salary Range</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.title}>
                    <TableCell className="font-medium">
                      {role.title}
                    </TableCell>
                    <TableCell>{role.department}</TableCell>
                    <TableCell>{role.salaryRange}</TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
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
