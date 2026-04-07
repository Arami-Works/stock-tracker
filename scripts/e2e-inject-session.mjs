/**
 * Injects an authenticated Supabase session into apps/mobile/dist/index.html
 * so Maestro E2E flows start pre-logged-in.
 *
 * Strategy: signs in via the Supabase REST auth API, then prepends a <script>
 * block to index.html that sets localStorage before the app boots.
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const SUPABASE_URL = process.env.E2E_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.E2E_SUPABASE_ANON_KEY;
const USER_EMAIL = process.env.E2E_USER_EMAIL;
const USER_PASSWORD = process.env.E2E_USER_PASSWORD;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !USER_EMAIL || !USER_PASSWORD) {
  console.error(
    "Missing required env vars: E2E_SUPABASE_URL, E2E_SUPABASE_ANON_KEY, E2E_USER_EMAIL, E2E_USER_PASSWORD"
  );
  process.exit(1);
}

// Extract project ref from URL (e.g. https://rsibbswjlliaemgowjmg.supabase.co)
const projectRef = new URL(SUPABASE_URL).hostname.split(".")[0];
const storageKey = `sb-${projectRef}-auth-token`;

console.log(`Signing in as ${USER_EMAIL}...`);

const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  },
  body: JSON.stringify({ email: USER_EMAIL, password: USER_PASSWORD }),
});

if (!res.ok) {
  const body = await res.text();
  console.error(`Supabase sign-in failed (${res.status}): ${body}`);
  process.exit(1);
}

const session = await res.json();
console.log(`Got session for ${session.user?.email} (expires in ${session.expires_in}s)`);

// The value stored in localStorage is the full session object
const sessionJson = JSON.stringify(session);

const injectionScript = `<script>
  (function() {
    try {
      localStorage.setItem(${JSON.stringify(storageKey)}, ${JSON.stringify(sessionJson)});
      console.log('[e2e] session injected for key: ${storageKey}');
    } catch (e) {
      console.error('[e2e] failed to inject session', e);
    }
  })();
</script>`;

const indexPath = join(ROOT, "apps/mobile/dist/index.html");
const html = readFileSync(indexPath, "utf8");

if (html.includes("[e2e] session injected")) {
  console.log("Session already injected — skipping");
  process.exit(0);
}

// Prepend injection script right after <head>
const patched = html.replace("<head>", `<head>\n${injectionScript}`);
writeFileSync(indexPath, patched, "utf8");

console.log(`Injected session into ${indexPath}`);
