import { DashboardHeader } from "@/components/dashboard-header";
import { CompensationForm } from "./compensation-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function PayrollPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Payroll" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Calculation</AccordionTrigger>
                        <AccordionContent>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline">Calculation</CardTitle>
                                    <CardDescription>Determining gross pay, and subtracting taxes and other deductions.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Calculation content will go here.</p>
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Disbursement</AccordionTrigger>
                        <AccordionContent>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline">Disbursement</CardTitle>
                                    <CardDescription>Paying employees via direct deposit or check.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Disbursement content will go here.</p>
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Record Keeping</AccordionTrigger>
                        <AccordionContent>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline">Record Keeping</CardTitle>
                                    <CardDescription>Maintaining accurate records for tax and legal compliance.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>Record keeping content will go here.</p>
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>Compensation Analysis</AccordionTrigger>
                        <AccordionContent>
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
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </main>
        </div>
    );
}
