
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calculator, Trophy, DollarSign, Users, PlusCircle, FileText, Link as LinkIcon, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const commissionData = [
    { employee: "Sales Rep A", quarter: "Q4 2023", goal: 100000, attainment: 120000, commission: 12000 },
    { employee: "Sales Rep B", quarter: "Q4 2023", goal: 100000, attainment: 95000, commission: 8550 },
];

const incentivePlans = [
    { name: "Annual Performance Bonus", type: "Performance", schedule: "Annual" },
    { name: "Sales Commission Plan", type: "Sales", schedule: "Quarterly" },
    { name: "Profit Sharing Plan", type: "Company-wide", schedule: "Annual" },
];

const spotAwardsData = [
    { employee: "Engineer X", reason: "Project Launch", amount: 500 },
    { employee: "Support Agent Y", reason: "High CSAT", amount: 250 },
];

export default function IncentivesPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Benefits" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Calculator /> Bonus and Commission Tracking</CardTitle>
                        <CardDescription>Manages the calculation and tracking of variable pay components like sales commissions and performance bonuses.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Period</TableHead>
                                    <TableHead>Goal</TableHead>
                                    <TableHead>Attainment</TableHead>
                                    <TableHead>Commission</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {commissionData.map((data, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{data.employee}</TableCell>
                                        <TableCell>{data.quarter}</TableCell>
                                        <TableCell className="font-mono">${data.goal.toLocaleString()}</TableCell>
                                        <TableCell className="font-mono">${data.attainment.toLocaleString()}</TableCell>
                                        <TableCell className="font-mono font-bold">${data.commission.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="gap-4">
                        <Button>Run Calculations</Button>
                        <Link href="/dashboard/performance/goal-setting">
                            <Button variant="outline"><LinkIcon className="mr-2 h-4 w-4" /> Link to Performance Module</Button>
                        </Link>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader className="flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-headline flex items-center gap-2"><FileText /> Incentive Plan Administration</CardTitle>
                            <CardDescription>Define, document, and communicate the rules, metrics, and payout schedules for incentive plans.</CardDescription>
                        </div>
                        <Button><PlusCircle className="mr-2 h-4 w-4"/> New Plan</Button>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Plan Name</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Payout Schedule</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {incentivePlans.map((plan, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{plan.name}</TableCell>
                                        <TableCell>{plan.type}</TableCell>
                                        <TableCell><Badge variant="outline">{plan.schedule}</Badge></TableCell>
                                        <TableCell className="text-right"><Button variant="ghost" size="sm">View Details</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Trophy /> Lump Sum and Spot Award Management</CardTitle>
                        <CardDescription>Track and process one-time payments for things like recognition or sign-on bonuses.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="font-semibold">Issue Spot Award</h3>
                            <Select><SelectTrigger><SelectValue placeholder="Select Employee" /></SelectTrigger></Select>
                            <Select><SelectTrigger><SelectValue placeholder="Select Reason" /></SelectTrigger></Select>
                            <Button>Submit Award</Button>
                        </div>
                        <div>
                             <h3 className="font-semibold mb-4">Budget Tracking (Engineering Dept.)</h3>
                             <div className="space-y-2">
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>$12,500 / $20,000 Used</span>
                                    <span>62.5%</span>
                                </div>
                                <Progress value={62.5} />
                             </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><TrendingUp /> Compensation Review & Planning</CardTitle>
                        <CardDescription>Model merit increases, promotion adjustments, and bonus payouts during the annual review cycle.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            This interface pulls final ratings and goal achievement data directly from the Performance Module to calculate performance-based increases.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button>Start Annual Review Cycle</Button>
                    </CardFooter>
                </Card>
                
            </main>
        </div>
    );
}
