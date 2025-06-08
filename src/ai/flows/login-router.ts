//LoginRouter is an AI-powered routing tool to guide new and returning users based on login type.

'use server';

/**
 * @fileOverview An AI-powered router to guide users to the appropriate dashboard after login.
 *
 * - loginRouter - A function that determines the user's role and guides them to the correct dashboard.
 * - LoginRouterInput - The input type for the loginRouter function.
 * - LoginRouterOutput - The return type for the loginRouter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LoginRouterInputSchema = z.object({
  userDescription: z
    .string()
    .describe(
      'A description of the user, their role, and their purpose for logging in.'
    ),
});
export type LoginRouterInput = z.infer<typeof LoginRouterInputSchema>;

const LoginRouterOutputSchema = z.object({
  role: z.enum([
    'Admin',
    'Doctor',
    'Nurse',
    'Receptionist',
    'Cashier',
    'Patient',
  ]).describe('The role of the user.'),
  dashboardRoute: z.string().describe('The route to the appropriate dashboard for the user.'),
});
export type LoginRouterOutput = z.infer<typeof LoginRouterOutputSchema>;

export async function loginRouter(input: LoginRouterInput): Promise<LoginRouterOutput> {
  return loginRouterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'loginRouterPrompt',
  input: {schema: LoginRouterInputSchema},
  output: {schema: LoginRouterOutputSchema},
  prompt: `You are an AI assistant designed to route users to the correct dashboard after they log in to a multi-clinic Electronic Health Records (EHR) system.

  Based on the user's description, determine their role (Admin, Doctor, Nurse, Receptionist, Cashier, or Patient) and the appropriate dashboard route.

  Respond ONLY with the role and dashboardRoute in JSON format.

  User Description: {{{userDescription}}}
  `,
});

const loginRouterFlow = ai.defineFlow(
  {
    name: 'loginRouterFlow',
    inputSchema: LoginRouterInputSchema,
    outputSchema: LoginRouterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
