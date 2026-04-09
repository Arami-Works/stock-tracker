import { z } from "zod";
import { purchaseOutputSchema } from "./purchase.js";
import { sanitizedString } from "./common.js";

export const accountCreateInputSchema = z.object({
  storeName: sanitizedString(255).pipe(z.string().min(1)),
  saName: sanitizedString(255).optional(),
  notes: sanitizedString(1000).optional(),
});

export const accountUpdateInputSchema = z.object({
  id: z.string().uuid(),
  storeName: sanitizedString(255).pipe(z.string().min(1)).optional(),
  saName: sanitizedString(255).nullish(),
  notes: sanitizedString(1000).nullish(),
});

export const accountOutputSchema = z.object({
  id: z.string().uuid(),
  authUserId: z.string().uuid(),
  storeName: z.string(),
  saName: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const accountWithPurchasesOutputSchema = accountOutputSchema.extend({
  purchases: z.array(purchaseOutputSchema),
});
