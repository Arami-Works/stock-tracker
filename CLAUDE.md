# CLAUDE.md — stock-tracker

Cartier purchase tracker. Turborepo monorepo with Expo mobile app.

## Stack

| Layer           | Choice                                  |
| --------------- | --------------------------------------- |
| Mobile          | Expo SDK 52, Expo Router v4             |
| Design system   | @cheunjm/ui (Tamagui + MD3)             |
| State           | Zustand (per EFCV level)                |
| Forms           | React Hook Form + Zod                   |
| Testing         | Jest (unit), Maestro (E2E)              |
| Storybook       | React Native (on-device) + Web (Vercel) |
| Package manager | npm                                     |

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
└── storybook/           # Storybook web build (Vercel)

packages/
├── types/               # Shared TypeScript types
├── validation/          # Shared Zod schemas
├── config/              # Shared configuration
├── eslint-config/       # ESLint configs
└── typescript-config/   # TypeScript configs
```

## Architecture

**EFCV** (Experience > Flow > Container > View) — 4-layer hierarchy. See `~/conventions/architecture/efcv.md`.

**MCVL** (Models / Controllers / Views / Lifecycles) — screen-level file organization at every EFCV level. See `~/conventions/architecture/mcvl.md`.

**Expo Router** maps directly to EFCV. `app/` is routing only — zero business logic. All logic lives in `src/experiences/`. See `~/conventions/architecture/expo-router.md`.

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
npm run dev:storybook          # Start Storybook web
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

| Environment | Branch    | Mobile         | Storybook         |
| ----------- | --------- | -------------- | ----------------- |
| development | local     | `expo start`   | `storybook dev`   |
| develop     | `develop` | EAS Preview    | Vercel Preview    |
| stage       | `stage`   | EAS Preview    | Vercel Preview    |
| production  | `main`    | EAS Production | Vercel Production |
