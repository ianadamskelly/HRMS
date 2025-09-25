import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, Stethoscope, Smile, Shield, Briefcase } from "lucide-react";

const benefits = [
    {
        icon: Stethoscope,
        title: "Health Insurance",
        description: "Comprehensive medical, and vision coverage for you and your family."
    },
    {
        icon: Smile,
        title: "Dental Plan",
        description: "Coverage for routine check-ups, cleanings, and major dental procedures."
    },
    {
        icon: Heart,
        title: "Wellness Program",
        description: "Access to gym memberships, mental health resources, and wellness workshops."
    },
    {
        icon: Briefcase,
        title: "401(k) Retirement Plan",
        description: "Company-matched contributions to help you save for the future."
    },
    {
        icon: Shield,
        title: "Life Insurance",
        description: "Company-paid life insurance policy to protect your loved ones."
    }
];

export default function BenefitsPage() {
    return (
        <div className="flex flex-col h-full">
            <DashboardHeader title="Compensation & Benefits" />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tight font-headline">Employee Benefits</h2>
                    <p className="text-muted-foreground">Explore the benefits available to our employees.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {benefits.map((benefit, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                <div className="p-3 rounded-full bg-accent/20 text-accent">
                                    <benefit.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="font-headline">{benefit.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{benefit.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
