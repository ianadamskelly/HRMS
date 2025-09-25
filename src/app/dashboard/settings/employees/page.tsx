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
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const employees = [
  {
    id: "EMP001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Software Engineer",
    department: "Engineering",
    status: "Active",
  },
  {
    id: "EMP002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Product Manager",
    department: "Product",
    status: "Active",
  },
  {
    id: "EMP003",
    name: "Sam Wilson",
    email: "sam.wilson@example.com",
    role: "UX Designer",
    department: "Design",
    status: "On Leave",
  },
    {
    id: "EMP004",
    name: "Alice Johnson",
    email: "alice.j@example.com",
    role: "Data Scientist",
    department: "Data & Analytics",
    status: "Active",
  },
    {
    id: "EMP005",
    name: "Bob Brown",
    email: "bob.b@example.com",
    role: "Software Engineer",
    department: "Engineering",
    status: "Terminated",
  },
];

const getBadgeVariant = (status: string) => {
    switch (status) {
        case "Active":
            return "default";
        case "On Leave":
            return "secondary";
        case "Terminated":
            return "destructive";
        default:
            return "outline";
    }
}

export default function EmployeesPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Employees" />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">Employee Database</CardTitle>
              <CardDescription>
                Manage all employee details and records.
              </CardDescription>
            </div>
            <Button>
              <PlusCircle className="mr-2" />
              Add Employee
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search employees..."
                    className="pl-8 w-full sm:w-[300px]"
                />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-mono">{employee.id}</TableCell>
                    <TableCell className="font-medium">
                      {employee.name}
                    </TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(employee.status)}>{employee.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
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
