/**
 * Looks up the e2e test user's Supabase UUID via the admin API,
 * then runs the Prisma seed-e2e script with the correct env vars.
 */

import { execSync } from "child_process";

const SUPABASE_URL = process.env.E2E_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.E2E_SUPABASE_SERVICE_ROLE_KEY;
const USER_EMAIL = process.env.E2E_USER_EMAIL;
const DATABASE_URL = process.env.DATABASE_URL;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !USER_EMAIL || !DATABASE_URL) {
  console.error(
    "Missing required env vars: E2E_SUPABASE_URL, E2E_SUPABASE_SERVICE_ROLE_KEY, E2E_USER_EMAIL, DATABASE_URL"
  );
  process.exit(1);
}

console.log(`Looking up Supabase user ID for ${USER_EMAIL}...`);

const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?per_page=1000`, {
  headers: {
    apikey: SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
  },
});

if (!res.ok) {
  const body = await res.text();
  console.error(`Supabase admin users API failed (${res.status}): ${body}`);
  process.exit(1);
}

const { users } = await res.json();
const user = users.find((u) => u.email === USER_EMAIL);

if (!user) {
  console.error(`User ${USER_EMAIL} not found in Supabase`);
  process.exit(1);
}

console.log(`Found user ID: ${user.id}`);

execSync("npx tsx packages/prisma/prisma/seed-e2e.ts", {
  stdio: "inherit",
  env: {
    ...process.env,
    E2E_SUPABASE_USER_ID: user.id,
    E2E_USER_EMAIL: USER_EMAIL,
    DATABASE_URL,
  },
});
