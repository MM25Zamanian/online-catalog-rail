# Lighthouse Server URL Playbook (Nginx/CDN)

## Goal
Run Lighthouse on the production server URL with the same baseline as local production output and avoid false negatives.

## 1) Preconditions
- Single build must include both `/` (English) and `/tr` (Turkish).
- `/en` must redirect to `/`.
- Unknown locale prefixes (e.g. `/fa`) must redirect to `/`.
- Server must serve the exported directory without rewriting `_next/static` incorrectly.
- No 4xx/5xx for HTML, JS, CSS, fonts, and images required by the audited page.

## 2) Required Caching Policy
- `/_next/static/*`: `Cache-Control: public, max-age=31536000, immutable`
- Versioned public assets (hashed filenames): `Cache-Control: public, max-age=31536000, immutable`
- HTML documents: `Cache-Control: no-cache` (or short max-age)

## 3) Quick Header Validation
Use these checks before Lighthouse:

```bash
curl -I https://<host>/
curl -I https://<host>/tr/
curl -I https://<host>/en/
curl -I https://<host>/fa/
curl -I https://<host>/_next/static/css/<file>.css
curl -I https://<host>/_next/static/chunks/<file>.js
curl -I https://<host>/_next/static/media/<file>.woff2
```

Expected:
- `/` and `/tr` return 200.
- `/en` and invalid locales return 301 to `/`.
- `_next/static/*` returns 200 with long-lived immutable cache.

## 4) Run Lighthouse
```bash
node scripts/lighthouse-codex.mjs --url https://<host>/
node scripts/lighthouse-codex.mjs --url https://<host>/tr/
```

## 5) Acceptance Criteria
- `errors-in-console` has no 404 for critical assets.
- No systematic 404 under `/_next/static/*`.
- `network-dependency-tree-insight` and `render-blocking-insight` are evaluated only after 404 issues are resolved.
