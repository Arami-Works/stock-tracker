# ---------------------------------------------------------------------------
# Stage 1 — builder: install all deps, generate Prisma client, compile TS
# ---------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root workspace manifests
COPY package.json package-lock.json ./

# Copy workspace package.json files needed for install
COPY apps/api/package.json apps/api/
COPY packages/prisma/package.json packages/prisma/
COPY packages/types/package.json packages/types/
COPY packages/validation/package.json packages/validation/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/eslint-config/package.json packages/eslint-config/

# Install all dependencies (including devDependencies for build)
RUN npm ci --workspace=@stock-tracker/api --workspace=@stock-tracker/prisma --workspace=@stock-tracker/types --workspace=@stock-tracker/validation --include-workspace-root

# Copy source files for workspace packages
COPY packages/ packages/
COPY apps/api/ apps/api/

# Generate Prisma client and build all workspace packages, then the API
RUN npm run build --workspace=@stock-tracker/prisma \
 && npm run build --workspace=@stock-tracker/validation \
 && npm run build --workspace=@stock-tracker/types \
 && npm run build --workspace=@stock-tracker/api

# ---------------------------------------------------------------------------
# Stage 2 — runner: production image
# ---------------------------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy root workspace manifests
COPY package.json package-lock.json ./

# Copy workspace package.json files
COPY apps/api/package.json apps/api/
COPY packages/prisma/package.json packages/prisma/
COPY packages/types/package.json packages/types/
COPY packages/validation/package.json packages/validation/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/eslint-config/package.json packages/eslint-config/

# Install production dependencies only
RUN npm ci --workspace=@stock-tracker/api --workspace=@stock-tracker/prisma --workspace=@stock-tracker/types --workspace=@stock-tracker/validation --include-workspace-root --omit=dev

# Copy Prisma schema for runtime client
COPY packages/prisma/prisma/ packages/prisma/prisma/

# Generate Prisma client in production image
RUN npx --workspace=@stock-tracker/prisma prisma generate

# Copy built output from builder
COPY --from=builder /app/packages/prisma/dist/ packages/prisma/dist/
COPY --from=builder /app/packages/validation/dist/ packages/validation/dist/
COPY --from=builder /app/packages/types/dist/ packages/types/dist/
COPY --from=builder /app/apps/api/dist/ apps/api/dist/

EXPOSE 4000

CMD ["node", "apps/api/dist/server.js"]
