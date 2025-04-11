'use server';
/**
 * @fileOverview A user profile summary generator AI agent.
 *
 * - generateUserProfileSummary - A function that handles the user profile summary generation process.
 * - GenerateUserProfileSummaryInput - The input type for the generateUserProfileSummary function.
 * - GenerateUserProfileSummaryOutput - The return type for the generateUserProfileSummary function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateUserProfileSummaryInputSchema = z.object({
  name: z.string().describe('The name of the user.'),
  email: z.string().email().describe('The email address of the user.'),
  role: z.string().describe('The role of the user.'),
  status: z.string().describe('The status of the user.'),
});
export type GenerateUserProfileSummaryInput = z.infer<typeof GenerateUserProfileSummaryInputSchema>;

const GenerateUserProfileSummaryOutputSchema = z.object({
  profileSummary: z.string().describe('A summary of the user profile.'),
});
export type GenerateUserProfileSummaryOutput = z.infer<typeof GenerateUserProfileSummaryOutputSchema>;

export async function generateUserProfileSummary(
  input: GenerateUserProfileSummaryInput
): Promise<GenerateUserProfileSummaryOutput> {
  return generateUserProfileSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateUserProfileSummaryPrompt',
  input: {
    schema: z.object({
      name: z.string().describe('The name of the user.'),
      email: z.string().email().describe('The email address of the user.'),
      role: z.string().describe('The role of the user.'),
      status: z.string().describe('The status of the user.'),
    }),
  },
  output: {
    schema: z.object({
      profileSummary: z.string().describe('A summary of the user profile.'),
    }),
  },
  prompt: `You are an AI assistant that generates user profile summaries.

  Given the following user information, generate a concise and informative profile summary. The summary should highlight the most important aspects of the user's profile, such as their role and status.

  Name: {{{name}}}
  Email: {{{email}}}
  Role: {{{role}}}
  Status: {{{status}}}

  Profile Summary:`,
});

const generateUserProfileSummaryFlow = ai.defineFlow<
  typeof GenerateUserProfileSummaryInputSchema,
  typeof GenerateUserProfileSummaryOutputSchema
>(
  {
    name: 'generateUserProfileSummaryFlow',
    inputSchema: GenerateUserProfileSummaryInputSchema,
    outputSchema: GenerateUserProfileSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
