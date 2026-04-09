import { z } from "zod";
import {
  currencySchema,
  itemCategorySchema,
  sanitizedString,
} from "./common.js";

const purchaseDateSchema = z
  .string()
  .date()
  .refine((d) => new Date(d) >= new Date("2000-01-01"), {
    message: "Date must be on or after 2000-01-01",
  })
  .refine((d) => d <= new Date().toISOString().slice(0, 10), {
    message: "Date must not be in the future",
  });

export const purchaseCreateInputSchema = z.object({
  itemName: sanitizedString(255).pipe(z.string().min(1)),
  itemCategory: itemCategorySchema.optional(),
  amount: z.number().positive().max(9_999_999_999.99),
  currency: currencySchema.default("KRW"),
  purchaseDate: purchaseDateSchema,
  storeLocation: sanitizedString(255).optional(),
  notes: sanitizedString(1000).optional(),
});

export const purchaseUpdateInputSchema = z.object({
  itemName: sanitizedString(255).pipe(z.string().min(1)).optional(),
  itemCategory: itemCategorySchema.nullish(),
  amount: z.number().positive().max(9_999_999_999.99).optional(),
  currency: currencySchema.optional(),
  purchaseDate: purchaseDateSchema.optional(),
  storeLocation: sanitizedString(255).nullish(),
  notes: sanitizedString(1000).nullish(),
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
