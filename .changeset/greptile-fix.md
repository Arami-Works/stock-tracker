---
"@stock-tracker/router": patch
"@stock-tracker/mobile": patch
---

Add ALLOWED_ORIGIN_PROD env var to cors.origins to prevent CORS errors in deployed environments.

fix(auth): surface web sign-in errors and remove redundant nonce fallback
