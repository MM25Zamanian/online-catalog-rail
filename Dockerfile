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

ARG BUILD_LOCALE=en
ENV BUILD_LOCALE=${BUILD_LOCALE}

RUN LOCALES="$(node -e "const fs = require('fs'); const source = fs.readFileSync('src/i18n/types.ts', 'utf8'); const match = source.match(/locales\\s*=\\s*\\[([^\\]]+)\\]/); if (!match) { throw new Error('Could not find locales in src/i18n/types.ts'); } const locales = [...match[1].matchAll(/['\\\"]([^'\\\"]+)['\\\"]/g)].map(([, locale]) => locale); if (locales.length === 0) { throw new Error('No locales found in src/i18n/types.ts'); } process.stdout.write(locales.join(' '));")" && \
    case " $LOCALES " in \
      *" $BUILD_LOCALE "*) ;; \
      *) echo "Invalid BUILD_LOCALE \"$BUILD_LOCALE\". Expected one of: $LOCALES." >&2; exit 1 ;; \
    esac && \ 
    pnpm generate:world-map && \
    pnpm build

FROM ghcr.io/gecut/nginx/cdn:latest AS runtime

ARG BUILD_LOCALE=en
ENV BUILD_LOCALE=${BUILD_LOCALE}

LABEL org.opencontainers.image.title="rail-online-catalog" \
      org.opencontainers.image.description="Static Khalij Fars Rail online catalog served by gecut/nginx/cdn." \
      org.opencontainers.image.vendor="Khalij Fars Rail" \
      org.opencontainers.image.source="https://github.com/gecut/containers/tree/main/nginx/cdn" \
      org.opencontainers.image.locale="${BUILD_LOCALE}"

COPY docker/nginx/templates/ /etc/nginx/templates/
COPY --from=builder /app/out/ /data/
