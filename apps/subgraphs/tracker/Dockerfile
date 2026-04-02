# ---------------------------------------------------------------------------
# Stage 1 — builder: install all deps, compile TS
# ---------------------------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root workspace manifests
COPY package.json package-lock.json ./

# Copy workspace package.json files needed for install
COPY apps/subgraphs/tracker/package.json apps/subgraphs/tracker/
COPY apps/api/package.json apps/api/
COPY packages/prisma/package.json packages/prisma/
COPY packages/types/package.json packages/types/
COPY packages/validation/package.json packages/validation/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/eslint-config/package.json packages/eslint-config/

# Install all dependencies (including devDependencies for build)
RUN npm ci --workspace=@stock-tracker/subgraph-tracker --workspace=@stock-tracker/api --workspace=@stock-tracker/prisma --workspace=@stock-tracker/types --workspace=@stock-tracker/validation --include-workspace-root

# Copy source files for workspace packages
COPY packages/ packages/
COPY apps/api/ apps/api/
COPY apps/subgraphs/tracker/ apps/subgraphs/tracker/

# Build workspace packages, then the subgraph (api built for type declarations only)
RUN npm run build --workspace=@stock-tracker/validation \
 && npm run build --workspace=@stock-tracker/types \
 && npm run build --workspace=@stock-tracker/prisma \
 && npm run build --workspace=@stock-tracker/api \
 && npm run build --workspace=@stock-tracker/subgraph-tracker

# ---------------------------------------------------------------------------
# Stage 2 — runner: production image
# ---------------------------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy root workspace manifests
COPY package.json package-lock.json ./

# Copy workspace package.json files
COPY apps/subgraphs/tracker/package.json apps/subgraphs/tracker/
COPY packages/types/package.json packages/types/
COPY packages/validation/package.json packages/validation/
COPY packages/typescript-config/package.json packages/typescript-config/
COPY packages/eslint-config/package.json packages/eslint-config/

# Install production dependencies only
RUN npm ci --workspace=@stock-tracker/subgraph-tracker --workspace=@stock-tracker/types --workspace=@stock-tracker/validation --include-workspace-root --omit=dev

# Copy built output from builder
COPY --from=builder /app/packages/validation/dist/ packages/validation/dist/
COPY --from=builder /app/packages/types/dist/ packages/types/dist/
COPY --from=builder /app/apps/subgraphs/tracker/dist/ apps/subgraphs/tracker/dist/

EXPOSE 4001

CMD ["node", "apps/subgraphs/tracker/dist/server.js"]
