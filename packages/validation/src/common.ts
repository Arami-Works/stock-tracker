import { z } from "zod";

export const uuidSchema = z.string().uuid();

export const paginationInputSchema = z.object({
  cursor: z.string().uuid().optional(),
  limit: z.number().int().min(1).max(100).default(20),
});

export const sortOrderSchema = z.enum(["asc", "desc"]).default("desc");

export const currencySchema = z.enum([
  "KRW",
  "USD",
  "EUR",
  "JPY",
  "GBP",
  "CNY",
]);

export const itemCategorySchema = z.enum([
  "브레이슬릿",
  "목걸이",
  "시계",
  "반지",
  "귀걸이",
  "가방",
  "지갑",
  "벨트",
  "기타",
]);

const controlCharRegex = /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/;

export const sanitizedString = (maxLength: number) =>
  z
    .string()
    .max(maxLength)
    .trim()
    .refine((s) => !controlCharRegex.test(s), {
      message: "Must not contain control characters",
    });

export const dateRangeSchema = z
  .object({
    from: z.string().date().optional(),
    to: z.string().date().optional(),
  })
  .refine(
    (r) => !r.from || !r.to || r.from <= r.to,
    { message: "dateRange.from must not be after dateRange.to" },
  )
  .optional();

export const amountRangeSchema = z
  .object({
    min: z.number().positive().optional(),
    max: z.number().positive().max(9_999_999_999.99).optional(),
  })
  .refine(
    (r) => r.min === undefined || r.max === undefined || r.min <= r.max,
    { message: "amountRange.min must not exceed amountRange.max" },
  )
  .optional();
