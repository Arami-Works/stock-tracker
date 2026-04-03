# Doppler Setup

Environment variables are managed via [Doppler](https://doppler.com). Project: `stock-tracker`.

## Configs

| Config | Purpose |
|--------|---------|
| `master` | Production (Master Supabase project, Railway prod) |
| `stage` | Staging (Railway stage, Apollo `stock-tracker@stage`) |
| `develop` | Dev deployment (Railway dev, Apollo `stock-tracker@develop`) |
| `local` | Local development — services on localhost |

## First-time setup

```bash
# 1. Install Doppler CLI
brew install dopplerhq/cli/doppler

# 2. Authenticate
doppler login

# 3. Link repo to stock-tracker/local
doppler setup --project stock-tracker --config local
```

## Running locally

```bash
# Terminal dashboard (all services + live logs)
npm run dev:dashboard

# Or individual services
doppler run -- npm run dev:api
doppler run -- npm run dev:router
doppler run -- docker compose up
```

## Required vars (local config)

| Var | Description |
|-----|-------------|
| `DATABASE_URL` | Supabase connection string |
| `SUPABASE_JWKS_URL` | `https://<ref>.supabase.co/auth/v1/.well-known/jwks.json` |
| `ALLOWED_ORIGINS` | Comma-separated allowed CORS origins |
| `TRPC_SERVICE_URL` | `http://localhost:4000` (local) |
| `NODE_ENV` | `development` |
