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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Banknote, Printer, Send, FileText, ArrowRight } from "lucide-react";

const directDepositData = [
    { runId: "RUN-001", period: "11/01/2023 - 11/15/2023", totalAmount: 3507.80, employees: 1, status: "Ready" }
];

const checkData = [
    { id: "CHK-001", employee: "Michael Scott", amount: 2850.00, address: "1725 Slough Avenue, Scranton, PA" }
];

const thirdPartyPayments = [
    { entity: "IRS", type: "Federal Taxes", amount: 550.00 },
    { entity: "State Tax Board", type: "State Taxes", amount: 210.00 },
    { entity: "Vanguard", type: "401(k) Contributions", amount: 200.00 },
    { entity: "BlueCross", type: "Health Insurance", amount: 150.00 },
];

export default function DisbursementPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Payroll" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Direct Deposit Processing */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Banknote/> Direct Deposit Processing</CardTitle>
                        <CardDescription>Generate ACH files to transfer funds directly to employee bank accounts.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Run ID</TableHead>
                                    <TableHead>Pay Period</TableHead>
                                    <TableHead>Total Amount</TableHead>
                                    <TableHead>Employees</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {directDepositData.map((run, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-mono">{run.runId}</TableCell>
                                        <TableCell>{run.period}</TableCell>
                                        <TableCell className="font-mono">${run.totalAmount.toFixed(2)}</TableCell>
                                        <TableCell>{run.employees}</TableCell>
                                        <TableCell><Badge>{run.status}</Badge></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button>
                            <Send className="mr-2 h-4 w-4" />
                            Generate ACH & Send to Bank
                        </Button>
                    </CardFooter>
                </Card>

                {/* Check Generation */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Printer/> Check Generation</CardTitle>
                        <CardDescription>Print physical paychecks for employees without direct deposit.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]"><Checkbox /></TableHead>
                                    <TableHead>Employee</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Mailing Address</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {checkData.map((check) => (
                                    <TableRow key={check.id}>
                                        <TableCell><Checkbox /></TableCell>
                                        <TableCell className="font-medium">{check.employee}</TableCell>
                                        <TableCell className="font-mono">${check.amount.toFixed(2)}</TableCell>
                                        <TableCell>{check.address}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button>
                            <Printer className="mr-2 h-4 w-4" />
                            Print Selected Checks (1)
                        </Button>
                    </CardFooter>
                </Card>
                
                {/* Third-Party Payments */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><ArrowRight/> Third-Party Payments</CardTitle>
                        <CardDescription>Automated payment of withheld funds to external entities like tax authorities and benefits carriers.</CardDescription>
                    </CardHeader>
                     <CardContent>
                        <Table>
                             <TableHeader>
                                <TableRow>
                                    <TableHead>Entity</TableHead>
                                    <TableHead>Payment Type</TableHead>
                                    <TableHead>Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                             <TableBody>
                                {thirdPartyPayments.map((payment, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{payment.entity}</TableCell>
                                        <TableCell>{payment.type}</TableCell>
                                        <TableCell className="font-mono">${payment.amount.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button>Process Third-Party Payments</Button>
                    </CardFooter>
                </Card>


                {/* Pay Statement (Payslip) Access */}
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><FileText/> Pay Statement (Payslip) Access</CardTitle>
                        <CardDescription>Provide employees with secure, online access to their detailed pay stubs.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Payslips for the period <span className="font-medium">11/01/2023 - 11/15/2023</span> are ready to be published to the Employee Self-Service portal.</p>
                    </CardContent>
                    <CardFooter>
                        <Button>Publish All Payslips</Button>
                    </CardFooter>
                </Card>

            </main>
        </div>
    );
}
