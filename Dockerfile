# Multi-stage Dockerfile for F1 Calendar & Sky Sync
# Supports Raspberry Pi 4 (linux/arm64, linux/arm/v7) and linux/amd64

# Stage 1: Build stage (runs on fast native host architecture)
FROM --platform=$BUILDPLATFORM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json* ./

# Install dependencies on host architecture
RUN npm install

# Copy application source code
COPY . .

# Build frontend and standalone server bundle
RUN npm run build

# Stage 2: Minimal Zero-Dependency Production Runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only the compiled production output (Frontend + Self-contained Backend)
COPY --from=builder /app/dist ./dist

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

EXPOSE 3000

# Run the self-contained CommonJS server
CMD ["node", "dist/server.cjs"]

