# CLAUDE.md — stock-tracker

Cartier purchase tracker. Turborepo monorepo with Expo mobile app and tRPC/GraphQL backend.

## Stack

| Layer           | Choice                                   |
| --------------- | ---------------------------------------- |
| Mobile          | Expo SDK 55, Expo Router v4              |
| Design system   | @cheunjm/ui (Tamagui + MD3)              |
| State           | Zustand (per EFCV level)                 |
| Forms           | React Hook Form + Zod                    |
| Backend         | tRPC v11, Node.js TypeScript             |
| API gateway     | Apollo Federation v2 (subgraph + router) |
| Database        | Supabase Postgres + Prisma ORM           |
| Testing         | Jest (unit), Maestro (E2E)               |
| Storybook       | React Native (on-device) + Web (Vercel)  |
| Package manager | npm                                      |

## Directory Map

```
apps/
├── mobile/              # Expo app (iOS/Android/Web)
│   ├── app/             # Expo Router (routing only)
│   │   ├── (auth)/      # Unauthenticated screens
│   │   └── (app)/       # Authenticated screens (tab navigator)
│   ├── src/experiences/  # All logic (EFCV + MCVL)
│   │   ├── auth/        # Auth experience
│   │   └── tracker/     # Tracker experience (dashboard, accounts, history)
│   ├── .ondevice/       # Storybook RN config
│   └── maestro/         # E2E test flows
├── api/                 # tRPC service (port 4000)
│   └── src/
│       ├── trpc/        # tRPC routers (mirrors EFCV)
│       ├── auth/        # Auth experience (MCVL)
│       ├── tracker/     # Tracker experience (MCVL + flows)
│       └── common/      # Env validation, shared utils
├── subgraphs/
│   └── tracker/         # Apollo subgraph (port 4001)
│       └── src/
│           ├── auth/    # GraphQL auth resolvers → tRPC
│           ├── tracker/ # GraphQL tracker resolvers → tRPC
│           └── clients/ # tRPC client to apps/api
├── router/              # Apollo Router config (JWT, CORS, composition)
└── storybook/           # Storybook web build (Vercel)

packages/
├── prisma/              # Shared Prisma client + multi-file schema
├── types/               # Shared TypeScript types
├── validation/          # Shared Zod schemas
├── config/              # Shared configuration
├── eslint-config/       # ESLint configs (base, node, react-internal)
└── typescript-config/   # TypeScript configs (base, node, react-library)
```

## Architecture

**EFCV** (Experience > Flow > Container > View) — 4-layer hierarchy used in both frontend and backend. See `~/conventions/architecture/efcv.md`.

**MCVL** (Models / Controllers / Views / Lifecycles) — file organization at every EFCV level. See `~/conventions/architecture/mcvl.md`.

**Backend MCVL mapping:**

- Models → Prisma queries, types, constants
- Controllers → Business logic orchestration
- Views → tRPC input/output DTOs (Zod schemas)
- Lifecycles → Trigger.dev jobs, events, webhooks

**Data flow:** Mobile → Apollo Router (JWT) → Subgraph (GraphQL) → tRPC service → Prisma → Supabase

## Naming

- Files: `{exp}-{flow}-{container}.{suffix}.tsx` — hyphens between levels, camelCase within
- Components: PascalCase matching file prefix + suffix (e.g., `TrackerDashboardHomeContainer`)
- Directories: camelCase for EFCV segments (e.g., `gmailOauth/`, `eligibilityBadge/`)
- Every folder has `index.ts` for re-exports
- Suffixed barrel files mandatory (`.models.tsx`, `.controllers.tsx`, `.views.tsx`, `.lifecycles.ts`)

## Development

```bash
npm install                    # Install all dependencies
npm run dev:mobile             # Start Expo dev server
npm run dev:api                # Start tRPC service (port 4000)
npm run dev:subgraph           # Start Apollo subgraph (port 4001)
npm run dev:router             # Start Apollo Router (rover dev)
npm run dev:backend            # Start all backend services
npm run dev:storybook          # Start Storybook web
npm run db:generate            # Generate Prisma client
npm run db:push                # Push schema to Supabase
npm run db:migrate:dev         # Create migration
npm run db:studio              # Open Prisma Studio
npm run test                   # Run all tests
npm run lint                   # Lint all packages
npm run check-types            # Type check all packages
```

## Design

- Primary: #FF2D55 (Cartier red)
- Secondary: #009E99 (teal)
- Font: Inter
- Language: Korean (ko)
- Design tokens: MD3
- Figma file: MSJ05A0BXBDTO0powtUMg3

## Experiences

| Experience | Flows     | Containers   |
| ---------- | --------- | ------------ |
| auth       | signIn    | gmailOauth   |
| tracker    | dashboard | home         |
| tracker    | accounts  | list, detail |
| tracker    | history   | browse       |

## Deployment

| Environment | Branch    | Mobile         | API (Docker → Railway) | Storybook         |
| ----------- | --------- | -------------- | ---------------------- | ----------------- |
| development | local     | `expo start`   | `npm run dev:backend`  | `storybook dev`   |
| develop     | `develop` | EAS Preview    | GHCR → Railway dev     | Vercel Preview    |
| stage       | `stage`   | EAS Preview    | GHCR → Railway staging | Vercel Preview    |
| production  | `main`    | EAS Production | GHCR → Railway prod    | Vercel Production |
