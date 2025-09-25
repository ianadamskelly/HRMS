// src/ai/flows/suggest-compensation.ts
'use server';
/**
 * @fileOverview A compensation suggestion AI agent.
 *
 * - suggestCompensation - A function that suggests a compensation range for a job role.
 * - SuggestCompensationInput - The input type for the suggestCompensation function.
 * - SuggestCompensationOutput - The return type for the suggestCompensation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCompensationInputSchema = z.object({
  jobRole: z.string().describe('The job role to suggest compensation for.'),
  yearsOfExperience: z.number().describe('The years of experience for the job role.'),
  location: z.string().describe('The location of the job.'),
});
export type SuggestCompensationInput = z.infer<typeof SuggestCompensationInputSchema>;

const SuggestCompensationOutputSchema = z.object({
  compensationRange: z.string().describe('The suggested compensation range for the job role.'),
  reasoning: z.string().describe('The reasoning behind the suggested compensation range.'),
});
export type SuggestCompensationOutput = z.infer<typeof SuggestCompensationOutputSchema>;

export async function suggestCompensation(input: SuggestCompensationInput): Promise<SuggestCompensationOutput> {
  return suggestCompensationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCompensationPrompt',
  input: {schema: SuggestCompensationInputSchema},
  output: {schema: SuggestCompensationOutputSchema},
  prompt: `You are an HR expert specializing in compensation. Given the job role, years of experience, and location, you will suggest a compensation range.

Job Role: {{{jobRole}}}
Years of Experience: {{{yearsOfExperience}}}
Location: {{{location}}}

Respond with the compensation range and the reasoning behind it.
`,
});

const suggestCompensationFlow = ai.defineFlow(
  {
    name: 'suggestCompensationFlow',
    inputSchema: SuggestCompensationInputSchema,
    outputSchema: SuggestCompensationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
