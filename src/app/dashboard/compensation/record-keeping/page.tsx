
import { DashboardHeader } from "@/components/dashboard-header";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
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
import { FileText, Archive, GitBranch, History, Download, Book } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


const auditTrailData = [
    { id: "LOG-1234", timestamp: "2023-11-20 10:05:15", user: "HR Manager", action: "Finalized Pay Run RUN-001", details: "Net Pay: $3507.80" },
    { id: "LOG-1233", timestamp: "2023-11-20 09:45:02", user: "system", action: "Detected high bonus amount for John Doe", details: "Bonus: $500.00" },
    { id: "LOG-1232", timestamp: "2023-11-19 14:22:30", user: "Payroll Admin", action: "Updated tax withholding for Jane Smith", details: "Federal: -5%" },
];

const archiveData = [
    { period: "Q3 2023", size: "15.2 MB", status: "Archived" },
    { period: "Q2 2023", size: "14.8 MB", status: "Archived" },
    { period: "Q1 2023", size: "15.5 MB", status: "Archived" },
]


export default function RecordKeepingPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Payroll" />
            <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
                
                {/* Tax Filing and Reporting */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><FileText /> Tax Filing and Reporting</CardTitle>
                        <CardDescription>Generate, file, and issue necessary year-end and quarterly tax forms.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <Button variant="outline" className="p-6 h-auto flex-col items-start gap-2">
                           <h3 className="font-semibold">Generate W-2s</h3>
                           <p className="text-sm text-muted-foreground text-left">Create annual wage and tax statements for employees.</p>
                        </Button>
                        <Button variant="outline" className="p-6 h-auto flex-col items-start gap-2">
                           <h3 className="font-semibold">Generate 1099s</h3>
                           <p className="text-sm text-muted-foreground text-left">Create forms for independent contractors.</p>
                        </Button>
                         <Button variant="outline" className="p-6 h-auto flex-col items-start gap-2">
                           <h3 className="font-semibold">Generate Form 941</h3>
                           <p className="text-sm text-muted-foreground text-left">Employer's quarterly federal tax return.</p>
                        </Button>
                        <Button variant="outline" className="p-6 h-auto flex-col items-start gap-2">
                           <h3 className="font-semibold">Generate Form 940</h3>
                           <p className="text-sm text-muted-foreground text-left">Employer's annual federal unemployment (FUTA) tax return.</p>
                        </Button>
                    </CardContent>
                </Card>

                {/* Payroll Audit Trail */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><History /> Payroll Audit Trail</CardTitle>
                        <CardDescription>Detailed, immutable history of all payroll transactions and adjustments.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Timestamp</TableHead>
                                    <TableHead>User</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {auditTrailData.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="font-mono text-xs">{log.timestamp}</TableCell>
                                        <TableCell>{log.user}</TableCell>
                                        <TableCell className="font-medium">{log.action}</TableCell>
                                        <TableCell className="text-muted-foreground">{log.details}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* General Ledger (GL) Integration */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><GitBranch /> General Ledger (GL) Integration</CardTitle>
                        <CardDescription>Automatically generate and post payroll expenses to your accounting system.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">This feature allows customization of the GL account mapping to match your company's chart of accounts.</p>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-4">
                        <Button>Generate Journal Entries</Button>
                        <Button variant="outline">Configure GL Mapping</Button>
                    </CardFooter>
                </Card>

                {/* Historical Data Retention */}
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2"><Archive /> Historical Data Retention</CardTitle>
                        <CardDescription>Securely store all payroll data and related records for the legally mandated period.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Data Period</TableHead>
                                    <TableHead>File Size</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                             <TableBody>
                                {archiveData.map((archive) => (
                                    <TableRow key={archive.period}>
                                        <TableCell className="font-medium">{archive.period}</TableCell>
                                        <TableCell>{archive.size}</TableCell>
                                        <TableCell><Badge>{archive.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">
                                                <Download className="mr-2 h-4 w-4" />
                                                Retrieve
                                            </Button>
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
