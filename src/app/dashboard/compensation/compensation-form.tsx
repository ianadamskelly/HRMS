'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getCompensationSuggestion } from './actions';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import type { SuggestCompensationOutput } from '@/ai/flows/suggest-compensation';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    jobRole: z.string().min(2, {
        message: 'Job role must be at least 2 characters.',
    }),
    yearsOfExperience: z.coerce.number().min(0, {
        message: 'Years of experience must be a positive number.',
    }),
    location: z.string().min(2, {
        message: 'Location must be at least 2 characters.',
    }),
});

export function CompensationForm() {
    const [result, setResult] = useState<SuggestCompensationOutput | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            jobRole: '',
            yearsOfExperience: 0,
            location: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        setResult(null);
        try {
            const suggestion = await getCompensationSuggestion(values);
            setResult(suggestion);
        } catch (error) {
            toast({
              variant: "destructive",
              title: "An error occurred",
              description: "Failed to get compensation suggestion. Please try again.",
            })
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="jobRole"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Role</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., Senior Software Engineer" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="yearsOfExperience"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Years of Experience</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 5" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., San Francisco, CA" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSubmitting ? 'Analyzing...' : 'Get Suggestion'}
                    </Button>
                </form>
            </Form>

            {isSubmitting && (
              <div className="text-center p-8">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">AI is working its magic...</p>
              </div>
            )}

            {result && (
                <Card className="mt-8 bg-secondary">
                    <CardHeader>
                        <CardTitle className="font-headline">AI-Generated Suggestion</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Suggested Compensation Range</h3>
                            <p className="text-2xl font-bold text-primary">{result.compensationRange}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Reasoning</h3>
                            <p className="text-muted-foreground">{result.reasoning}</p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
