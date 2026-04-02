import { z } from "zod";

export const userOutputSchema = z.object({
  id: z.string().uuid(),
  supabaseId: z.string().uuid(),
  email: z.string().email(),
  displayName: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userUpsertInputSchema = z.object({
  supabaseId: z.string().uuid(),
  email: z.string().email(),
  displayName: z.string().nullable().optional(),
});
