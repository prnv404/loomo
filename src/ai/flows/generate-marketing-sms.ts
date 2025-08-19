'use server';

/**
 * @fileOverview AI-powered tool to generate marketing SMS messages.
 *
 * - generateMarketingSMS - A function that generates marketing SMS messages.
 * - GenerateMarketingSMSInput - The input type for the generateMarketingSMS function.
 * - GenerateMarketingSMSOutput - The return type for the generateMarketingSMS function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingSMSInputSchema = z.object({
  customerSegment: z
    .string()
    .describe('The segment of customers to target (e.g., frequent buyers, high-value buyers).'),
  newArrivals: z.string().describe('Description of new arrivals to promote.'),
  offerDetails: z.string().describe('Details of the offer or announcement.'),
});
export type GenerateMarketingSMSInput = z.infer<typeof GenerateMarketingSMSInputSchema>;

const GenerateMarketingSMSOutputSchema = z.object({
  smsMessage: z.string().describe('The generated marketing SMS message.'),
});
export type GenerateMarketingSMSOutput = z.infer<typeof GenerateMarketingSMSOutputSchema>;

export async function generateMarketingSMS(input: GenerateMarketingSMSInput): Promise<GenerateMarketingSMSOutput> {
  return generateMarketingSMSFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingSMSPrompt',
  input: {schema: GenerateMarketingSMSInputSchema},
  output: {schema: GenerateMarketingSMSOutputSchema},
  prompt: `You are an expert marketing assistant, skilled in creating engaging SMS messages.

  Based on the customer segment, new arrivals, and offer details, generate a concise and effective SMS message to promote products and increase sales.

  Customer Segment: {{{customerSegment}}}
  New Arrivals: {{{newArrivals}}}
  Offer Details: {{{offerDetails}}}

  SMS Message:`,
});

const generateMarketingSMSFlow = ai.defineFlow(
  {
    name: 'generateMarketingSMSFlow',
    inputSchema: GenerateMarketingSMSInputSchema,
    outputSchema: GenerateMarketingSMSOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
