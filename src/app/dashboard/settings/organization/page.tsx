'use client';

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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, Building, MapPin, Users, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";

const departments = ["Engineering", "Product", "Design", "Marketing", "Sales"];
const locations = ["New York, NY", "San Francisco, CA", "Remote"];

export default function OrganizationPage() {
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
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="HRM Simplified" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Main Street, Anytown, USA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-info">Contact Information</Label>
                <Input id="contact-info" defaultValue="contact@hrmsimplified.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Company Logo</Label>
              <div className="flex items-center gap-4">
                <Image
                  src="https://picsum.photos/seed/logo/100/100"
                  alt="Company Logo"
                  width={80}
                  height={80}
                  className="rounded-lg border"
                />
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" /> Upload New Logo
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Company Details</Button>
          </CardFooter>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader className="flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline flex items-center gap-2"><Building /> Departments</CardTitle>
                        <CardDescription>Manage company departments.</CardDescription>
                    </div>
                    <Button size="sm"><PlusCircle className="mr-2 h-4 w-4"/>Add</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            {departments.map((dept) => (
                                <TableRow key={dept}>
                                    <TableCell className="font-medium">{dept}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4"/></Button>
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
                    <Button size="sm"><PlusCircle className="mr-2 h-4 w-4"/>Add</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableBody>
                            {locations.map((loc) => (
                                <TableRow key={loc}>
                                    <TableCell className="font-medium">{loc}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4"/></Button>
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
            <CardTitle className="font-headline flex items-center gap-2"><Users /> Organizational Chart</CardTitle>
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
