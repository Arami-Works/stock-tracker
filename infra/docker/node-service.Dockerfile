# Reusable multi-stage Dockerfile for Turborepo Node.js services.
# Usage:
#   docker build \
#     --build-arg PACKAGE_NAME=@stock-tracker/api \
#     --build-arg APP_DIR=apps/api \
#     -f infra/docker/node-service.Dockerfile .

ARG NODE_VERSION=20

# --- Stage 1: Prune monorepo to minimal subset ---
FROM node:${NODE_VERSION}-alpine AS pruner
RUN npm install -g turbo@2
WORKDIR /app
COPY . .
ARG PACKAGE_NAME
RUN turbo prune ${PACKAGE_NAME} --docker

# --- Stage 2: Install dependencies (cached layer) ---
FROM node:${NODE_VERSION}-alpine AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm ci --legacy-peer-deps --ignore-scripts

# --- Stage 3: Build ---
FROM node:${NODE_VERSION}-alpine AS builder
RUN npm install -g turbo@2
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
ARG PACKAGE_NAME
# Prisma generate needs a DATABASE_URL at build time (no connection made)
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"
RUN turbo run build --filter=${PACKAGE_NAME}

# --- Stage 4: Production runner ---
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 appuser

ARG APP_DIR
COPY --from=builder /app/${APP_DIR}/dist ./dist
COPY --from=builder /app/${APP_DIR}/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

USER appuser

EXPOSE 4000

CMD ["npm", "run", "start"]
