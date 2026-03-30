import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("4000"),
  DATABASE_URL: z.string(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

export const env = envSchema.parse(process.env);
