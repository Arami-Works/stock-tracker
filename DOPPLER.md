# Doppler Setup

Environment variables are managed via [Doppler](https://doppler.com). Project: `stock-tracker`.

## Configs

| Config    | Purpose                                                      |
| --------- | ------------------------------------------------------------ |
| `master`  | Production (Master Supabase project, Railway prod)           |
| `stage`   | Staging (Railway stage, Apollo `stock-tracker@stage`)        |
| `develop` | Dev deployment (Railway dev, Apollo `stock-tracker@develop`) |
| `local`   | Local development — services on localhost                    |

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

`local` uses a local Supabase instance (`supabase start`). All vars are pre-populated in Doppler.

| Var                 | Local value                                               |
| ------------------- | --------------------------------------------------------- |
| `DATABASE_URL`      | `postgresql://postgres:postgres@localhost:54322/postgres` |
| `SUPABASE_JWKS_URL` | `http://localhost:54321/auth/v1/.well-known/jwks.json`    |
| `TRPC_SERVICE_URL`  | `http://localhost:4000`                                   |
| `ALLOWED_ORIGINS`   | `http://localhost:19006,...`                              |
| `NODE_ENV`          | `development`                                             |

For `dev`/`stg`/`prd` configs, populate via the Doppler dashboard with the respective Railway + Supabase cloud credentials.
