'use server';

import { suggestCompensation, type SuggestCompensationInput, type SuggestCompensationOutput } from '@/ai/flows/suggest-compensation';

export async function getCompensationSuggestion(input: SuggestCompensationInput): Promise<SuggestCompensationOutput> {
  try {
    const result = await suggestCompensation(input);
    return result;
  } catch (error) {
    console.error("Error getting compensation suggestion:", error);
    throw new Error("Failed to get compensation suggestion from AI.");
  }
}
