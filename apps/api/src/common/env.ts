import { z } from "zod";

const envSchema = z.object({
  PORT: z.string().default("4000"),
  DATABASE_URL: z.string(),
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
  NODE_ENV: z
    .enum(["development", "staging", "production", "test"])
    .default("development"),
});

export const env = envSchema.parse(process.env);
