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
