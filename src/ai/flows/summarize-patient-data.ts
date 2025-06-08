'use server';
/**
 * @fileOverview Summarizes patient data for doctors using GenAI.
 *
 * - summarizePatientData - A function that summarizes patient data.
 * - SummarizePatientDataInput - The input type for the summarizePatientData function.
 * - SummarizePatientDataOutput - The return type for the summarizePatientData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePatientDataInputSchema = z.object({
  patientName: z.string().describe('The name of the patient.'),
  medicalHistory: z.string().describe('The medical history of the patient.'),
  currentSymptoms: z.string().describe('The current symptoms of the patient.'),
  recentLabs: z.string().describe('Recent lab results for the patient.'),
});
export type SummarizePatientDataInput = z.infer<typeof SummarizePatientDataInputSchema>;

const SummarizePatientDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the patient data.'),
});
export type SummarizePatientDataOutput = z.infer<typeof SummarizePatientDataOutputSchema>;

export async function summarizePatientData(input: SummarizePatientDataInput): Promise<SummarizePatientDataOutput> {
  return summarizePatientDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePatientDataPrompt',
  input: {schema: SummarizePatientDataInputSchema},
  output: {schema: SummarizePatientDataOutputSchema},
  prompt: `You are an AI assistant helping doctors understand patient data.

  Summarize the following patient information:

  Patient Name: {{{patientName}}}
  Medical History: {{{medicalHistory}}}
  Current Symptoms: {{{currentSymptoms}}}
  Recent Labs: {{{recentLabs}}}
  `,
});

const summarizePatientDataFlow = ai.defineFlow(
  {
    name: 'summarizePatientDataFlow',
    inputSchema: SummarizePatientDataInputSchema,
    outputSchema: SummarizePatientDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
