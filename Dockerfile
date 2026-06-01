FROM node:22-alpine AS deps

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable && corepack prepare pnpm@10.26.0 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable && corepack prepare pnpm@10.26.0 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm generate:world-map && \
    pnpm build

FROM ghcr.io/gecut/nginx/cdn:latest AS runtime

LABEL org.opencontainers.image.title="farsrail.com" \
      org.opencontainers.image.description="Static Khalij Fars Rail online catalog served by gecut/nginx/cdn." \
      org.opencontainers.image.vendor="Khalij Fars Rail" \
      org.opencontainers.image.source="https://github.com/gecut/containers/tree/main/nginx/cdn"

COPY docker/nginx/templates/ /etc/nginx/templates/
COPY --from=builder /app/out/ /data/
