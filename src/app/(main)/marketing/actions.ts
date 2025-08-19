'use server';

import {
  generateMarketingSMS,
  type GenerateMarketingSMSInput,
  type GenerateMarketingSMSOutput,
} from '@/ai/flows/generate-marketing-sms';
import { z } from 'zod';

const ActionInputSchema = z.object({
  customerSegment: z.string(),
  newArrivals: z.string(),
  offerDetails: z.string(),
});

export async function generateSmsAction(
  input: GenerateMarketingSMSInput
): Promise<{ data: GenerateMarketingSMSOutput | null; error: string | null; }> {
  const parsedInput = ActionInputSchema.safeParse(input);
  if (!parsedInput.success) {
    return { data: null, error: 'Invalid input.' };
  }

  try {
    const result = await generateMarketingSMS(parsedInput.data);
    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    return { data: null, error: 'Failed to generate marketing message.' };
  }
}
