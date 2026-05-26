#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const DEFAULT_REPORT_DIR = ".codex/lighthouse";
const DEFAULT_LOCAL_DIR = "out";
const DEFAULT_PORT = 4173;
const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PATHNAME = "/";
const DEFAULT_CATEGORIES = "performance,accessibility,best-practices,seo";

const args = parseArgs(process.argv.slice(2));

main().catch((error) => {
  console.error(`\nLighthouse Codex report failed:\n${error.message}`);
  process.exit(1);
});

async function main() {
  if (args.help || args.h) {
    printHelp();
    return;
  }

  const reportDir = String(args.out ?? DEFAULT_REPORT_DIR);
  const reportJsonPath = path.join(reportDir, "report.json");
  const reportMarkdownPath = path.join(reportDir, "codex-lighthouse-issues.md");

  await mkdir(reportDir, { recursive: true });

  const mode = args.local ? "local" : "url";
  const auditUrl = await resolveAuditUrl();

  let localServer = null;

  try {
    if (args.local) {
      const localDir = String(args.dir ?? DEFAULT_LOCAL_DIR);
      const port = Number(args.port ?? DEFAULT_PORT);
      const host = String(args.host ?? DEFAULT_HOST);

      localServer = await startStaticServer(localDir, host, port);
      await waitForUrl(auditUrl, 30_000);
      await runLocalPreflight(auditUrl);
    }

    await runLighthouse({
      url: auditUrl,
      outputPath: reportJsonPath,
      categories: String(args.categories ?? DEFAULT_CATEGORIES),
      preset: args.preset ? String(args.preset) : undefined,
      extraChromeFlags: String(args.chromeFlags ?? ""),
    });

    const lhr = JSON.parse(await readFile(reportJsonPath, "utf8"));
    const markdown = buildMarkdownReport({
      lhr,
      mode,
      auditUrl,
      rawReportPath: reportJsonPath,
    });

    await writeFile(reportMarkdownPath, markdown, "utf8");

    console.log("\nLighthouse Codex report generated:");
    console.log(`- Raw JSON: ${reportJsonPath}`);
    console.log(`- Codex MD: ${reportMarkdownPath}`);
  } finally {
    if (localServer) {
      await stopStaticServer(localServer);
    }
  }
}

async function resolveAuditUrl() {
  if (args.local) {
    const host = String(args.host ?? DEFAULT_HOST);
    const port = Number(args.port ?? DEFAULT_PORT);
    const pathname = normalizePathname(String(args.path ?? DEFAULT_PATHNAME));

    return `http://${host}:${port}${pathname}`;
  }

  if (!args.url) {
    throw new Error("Missing --url. Use --url https://example.com or --local.");
  }

  return String(args.url);
}

async function startStaticServer(staticDir, host, port) {
  console.log(`Starting local static server: ${staticDir} on ${host}:${port}`);
  const rootDir = path.resolve(staticDir);

  const server = createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url ?? "/", `http://${host}:${port}`);
      const pathname = decodeURIComponent(requestUrl.pathname);
      const filePath = await resolveFilePath(rootDir, pathname);

      if (!filePath) {
        response.writeHead(404, { "Cache-Control": "no-store" });
        response.end("Not Found");
        return;
      }

      const headers = getResponseHeaders(filePath);
      response.writeHead(200, headers);

      if (request.method === "HEAD") {
        response.end();
        return;
      }

      const content = await readFile(filePath);
      response.end(content);
    } catch (error) {
      response.writeHead(500, { "Cache-Control": "no-store" });
      response.end("Internal Server Error");
      console.error("[serve] request handling failed:", error);
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => resolve());
  });

  return server;
}

async function stopStaticServer(server) {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

async function resolveFilePath(rootDir, pathname) {
  const normalizedPath = pathname === "/" ? "/index.html" : pathname;
  const requestPath = normalizedPath.endsWith("/")
    ? `${normalizedPath}index.html`
    : normalizedPath;

  const candidates = [requestPath];
  const withoutFirstSegment = requestPath.replace(/^\/[^/]+(?=\/)/, "");
  if (withoutFirstSegment && withoutFirstSegment !== requestPath) {
    candidates.push(withoutFirstSegment);
  }

  for (const candidate of candidates) {
    const absolutePath = path.resolve(rootDir, `.${candidate}`);
    if (!absolutePath.startsWith(rootDir)) {
      continue;
    }
    if (await fileExists(absolutePath)) {
      return absolutePath;
    }
  }

  return null;
}

function getResponseHeaders(filePath) {
  const extension = path.extname(filePath);
  const contentType = CONTENT_TYPES[extension] ?? "application/octet-stream";
  const cacheControl = getCacheControlForPath(filePath);

  return {
    "Content-Type": contentType,
    "Cache-Control": cacheControl,
  };
}

function getCacheControlForPath(filePath) {
  if (filePath.includes(`${path.sep}_next${path.sep}static${path.sep}`)) {
    return "public, max-age=31536000, immutable";
  }

  if (/\.[0-9a-f]{8,}\./i.test(path.basename(filePath))) {
    return "public, max-age=31536000, immutable";
  }

  if (filePath.endsWith(".html")) {
    return "no-cache";
  }

  return "public, max-age=3600";
}

async function fileExists(filePath) {
  try {
    const entry = await stat(filePath);
    return entry.isFile();
  } catch {
    return false;
  }
}

async function runLighthouse({
  url,
  outputPath,
  categories,
  preset,
  extraChromeFlags,
}) {
  const chromeFlags = ["--headless=new", extraChromeFlags]
    .filter(Boolean)
    .join(" ");

  const lighthouseArgs = [
    "-y",
    "lighthouse",
    url,
    "--output=json",
    `--output-path=${outputPath}`,
    `--only-categories=${categories}`,
    "--quiet",
    `--chrome-flags=${chromeFlags}`,
  ];

  if (preset) {
    lighthouseArgs.push(`--preset=${preset}`);
  }

  console.log(`Running Lighthouse for: ${url}`);

  await runCommand(getNpxCommand(), lighthouseArgs);
}

function buildMarkdownReport({ lhr, mode, auditUrl, rawReportPath }) {
  const categoryRows = Object.entries(lhr.categories ?? {})
    .map(([key, category]) => {
      const score =
        typeof category.score === "number"
          ? `${Math.round(category.score * 100)}`
          : "n/a";

      return `| ${escapeMd(category.title ?? key)} | \`${key}\` | ${score} |`;
    })
    .join("\n");

  const selectedAuditIds = new Set(
    Object.values(lhr.categories ?? {}).flatMap((category) =>
      Array.isArray(category.auditRefs)
        ? category.auditRefs.map((ref) => ref.id)
        : []
    )
  );

  const issues = Object.values(lhr.audits ?? {})
    .filter((audit) => isActionableAudit(audit, selectedAuditIds))
    .sort((a, b) => getAuditSortScore(a) - getAuditSortScore(b));

  const issueSections = issues.length
    ? issues.map((audit, index) => formatAuditIssue(audit, index + 1)).join("\n\n")
    : "No actionable Lighthouse issues were found for the selected categories.";

  return `# Lighthouse Issues for Codex

## Run Context

| Field | Value |
|---|---|
| Requested URL | ${escapeMd(lhr.requestedUrl ?? auditUrl)} |
| Final URL | ${escapeMd(lhr.finalDisplayedUrl ?? lhr.finalUrl ?? auditUrl)} |
| Mode | ${mode} |
| Generated At | ${escapeMd(lhr.fetchTime ?? new Date().toISOString())} |
| Lighthouse Version | ${escapeMd(lhr.lighthouseVersion ?? "unknown")} |
| Raw Report | \`${rawReportPath}\` |

## Category Scores

| Category | Key | Score |
|---|---:|---:|
${categoryRows}

## Instructions for Codex

Read this file first, then inspect \`${rawReportPath}\` only when more detail is needed.

Fix the issues with minimal, high-confidence changes.

Priority order:

1. Performance issues that affect Core Web Vitals.
2. Accessibility issues that affect real user interaction.
3. SEO issues that affect indexing or metadata quality.
4. Best-practices issues that affect security, browser compatibility, or reliability.

Constraints:

- Do not change visual design unless required by the audit.
- Do not remove business logic.
- Prefer small, reviewable changes.
- Explain every code change briefly after editing.
- Re-run this script after fixes.

## Actionable Issues

${issueSections}
`;
}

function isActionableAudit(audit, selectedAuditIds) {
  if (!audit || !audit.id) return false;
  if (!selectedAuditIds.has(audit.id)) return false;

  const ignoredModes = new Set(["notApplicable", "manual"]);
  if (ignoredModes.has(audit.scoreDisplayMode)) return false;

  if (typeof audit.score === "number" && audit.score < 1) return true;

  if (Array.isArray(audit.warnings) && audit.warnings.length > 0) return true;

  return false;
}

function getAuditSortScore(audit) {
  if (typeof audit.score === "number") return audit.score;
  return 1;
}

function formatAuditIssue(audit, index) {
  const score =
    typeof audit.score === "number" ? Math.round(audit.score * 100) : "n/a";

  const displayValue = audit.displayValue
    ? `\n- Display Value: ${escapeMd(audit.displayValue)}`
    : "";

  const explanation = audit.explanation
    ? `\n- Explanation: ${escapeMd(audit.explanation)}`
    : "";

  const warnings =
    Array.isArray(audit.warnings) && audit.warnings.length > 0
      ? `\n- Warnings:\n${audit.warnings
          .map((warning) => `  - ${escapeMd(String(warning))}`)
          .join("\n")}`
      : "";

  const details = formatAuditDetails(audit.details);

  return `### ${index}. ${escapeMd(audit.title ?? audit.id)}

- Audit ID: \`${audit.id}\`
- Score: ${score}
- Score Mode: \`${audit.scoreDisplayMode ?? "unknown"}\`${displayValue}
- Description: ${escapeMd(cleanText(audit.description ?? ""))}${explanation}${warnings}

${details}`;
}

function formatAuditDetails(details) {
  if (!details || !Array.isArray(details.items) || details.items.length === 0) {
    return "No detailed items were provided by Lighthouse.";
  }

  const compactItems = details.items.slice(0, 10).map(compactDetailItem);

  return `Sample Details:

\`\`\`json
${JSON.stringify(compactItems, null, 2)}
\`\`\``;
}

function compactDetailItem(item) {
  return compactValue(item, 0);
}

function compactValue(value, depth) {
  if (depth > 4) return "[Max depth reached]";

  if (Array.isArray(value)) {
    return value.slice(0, 10).map((entry) => compactValue(entry, depth + 1));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !["protocol", "timing", "stack"].includes(key))
        .map(([key, entry]) => [key, compactValue(entry, depth + 1)])
    );
  }

  if (typeof value === "string") {
    return value.length > 500 ? `${value.slice(0, 500)}...` : value;
  }

  return value;
}

async function waitForUrl(url, timeoutMs) {
  const start = Date.now();
  const waitUrl = new URL(url);
  waitUrl.pathname = "/";
  waitUrl.search = "";

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(waitUrl, { method: "HEAD" });

      if (response.status < 500) {
        return;
      }
    } catch {
      // Retry until timeout.
    }

    await sleep(500);
  }

  throw new Error(`Local server did not become ready: ${waitUrl.toString()}`);
}

async function runLocalPreflight(auditUrl) {
  const preflightUrls = new Set([auditUrl]);
  const html = await fetchText(auditUrl);
  const assetPaths = extractAssetPaths(html);
  const baseUrl = new URL(auditUrl);

  for (const assetPath of assetPaths) {
    preflightUrls.add(new URL(assetPath, baseUrl).toString());
  }

  const failures = [];

  for (const url of preflightUrls) {
    const response = await fetch(url, { method: "HEAD" });
    if (response.status >= 400) {
      failures.push(`${response.status} ${url}`);
    }
  }

  if (failures.length > 0) {
    throw new Error(
      `Local preflight failed. Critical paths are unreachable:\n${failures.join("\n")}`
    );
  }
}

async function fetchText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load preflight HTML (${response.status}): ${url}`);
  }

  return response.text();
}

function extractAssetPaths(html) {
  const matches = html.matchAll(/(?:src|href)=["']([^"']+)["']/g);
  const assetPaths = new Set();

  for (const match of matches) {
    const value = match[1];
    if (!value.startsWith("/")) continue;
    if (!value.includes("/_next/static/")) continue;
    assetPaths.add(value);
  }

  return assetPaths;
}

function runCommand(command, commandArgs) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, {
      stdio: "inherit",
      shell: false,
    });

    child.on("error", reject);

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} exited with code ${code}`));
    });
  });
}

function parseArgs(argv) {
  const result = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (!arg.startsWith("--")) continue;

    const key = arg.slice(2);

    if (key.includes("=")) {
      const [name, ...valueParts] = key.split("=");
      result[name] = valueParts.join("=");
      continue;
    }

    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      result[key] = true;
      continue;
    }

    result[key] = next;
    index += 1;
  }

  return result;
}

function normalizePathname(value) {
  if (!value) return "/";
  return value.startsWith("/") ? value : `/${value}`;
}

function cleanText(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

function escapeMd(value) {
  return String(value).replace(/\|/g, "\\|");
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getNpxCommand() {
  return process.platform === "win32" ? "npx.cmd" : "npx";
}

function printHelp() {
  console.log(`
Usage:

  node scripts/lighthouse-codex.mjs --url https://example.com
  node scripts/lighthouse-codex.mjs --url http://localhost:3000
  node scripts/lighthouse-codex.mjs --local
  node scripts/lighthouse-codex.mjs --local --dir out --port 4173 --path /

Options:

  --url <url>                 Audit a server or already-running localhost URL.
  --local                     Serve a static export locally, then audit it.
  --dir <path>                Static export directory. Default: out
  --host <host>               Local host. Default: 127.0.0.1
  --port <port>               Local port. Default: 4173
  --path <pathname>           Page path to audit. Default: /
  --out <dir>                 Report output directory. Default: .codex/lighthouse
  --categories <list>         Lighthouse categories.
                              Default: performance,accessibility,best-practices,seo
  --preset <preset>           Example: desktop
  --chromeFlags <flags>       Extra Chrome flags.
  --help                      Show help.
`);
}

const CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};
