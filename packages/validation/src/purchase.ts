import { z } from "zod";

export const purchaseCreateInputSchema = z.object({
  itemName: z.string().min(1).max(255),
  itemCategory: z.string().max(255).optional(),
  amount: z.number().positive(),
  currency: z.string().max(10).optional(),
  purchaseDate: z.string().min(1),
  storeLocation: z.string().max(255).optional(),
  notes: z.string().max(1000).optional(),
});

export const purchaseUpdateInputSchema = z.object({
  itemName: z.string().min(1).max(255).optional(),
  itemCategory: z.string().max(255).nullish(),
  amount: z.number().positive().optional(),
  currency: z.string().max(10).optional(),
  purchaseDate: z.string().optional(),
  storeLocation: z.string().max(255).nullish(),
  notes: z.string().max(1000).nullish(),
});

export const purchaseOutputSchema = z.object({
  id: z.string().uuid(),
  trackerAccountId: z.string().uuid(),
  itemName: z.string(),
  itemCategory: z.string().nullable(),
  amount: z.string(),
  currency: z.string(),
  purchaseDate: z.date(),
  storeLocation: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const purchaseWithAccountOutputSchema = purchaseOutputSchema.extend({
  trackerAccount: z.object({
    id: z.string().uuid(),
    storeName: z.string(),
  }),
});
