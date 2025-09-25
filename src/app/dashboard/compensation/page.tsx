import { DashboardHeader } from "@/components/dashboard-header";
import { CompensationForm } from "./compensation-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PayrollPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Payroll" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Tabs defaultValue="calculation" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="calculation">Calculation</TabsTrigger>
                        <TabsTrigger value="disbursement">Disbursement</TabsTrigger>
                        <TabsTrigger value="record-keeping">Record Keeping</TabsTrigger>
                        <TabsTrigger value="compensation">Compensation Analysis</TabsTrigger>
                    </TabsList>
                    <TabsContent value="calculation">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Calculation</CardTitle>
                                <CardDescription>Determining gross pay, and subtracting taxes and other deductions.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Calculation content will go here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="disbursement">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Disbursement</CardTitle>
                                <CardDescription>Paying employees via direct deposit or check.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Disbursement content will go here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="record-keeping">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline">Record Keeping</CardTitle>
                                <CardDescription>Maintaining accurate records for tax and legal compliance.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Record keeping content will go here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="compensation">
                         <Card className="max-w-2xl mx-auto">
                            <CardHeader>
                                <CardTitle className="font-headline">AI Compensation Suggester</CardTitle>
                                <CardDescription>
                                    Use our AI-powered tool to get a baseline compensation suggestion for any role.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <CompensationForm />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
