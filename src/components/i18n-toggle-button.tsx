"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

function getLocaleFromPathname(pathname: string): "en" | "tr" {
  return pathname === "/tr" || pathname.startsWith("/tr/") ? "tr" : "en";
}

function normalizePathname(pathname: string): string {
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function getTargetPathname(pathname: string, locale: "en" | "tr"): string {
  const normalizedPathname = normalizePathname(pathname);

  if (locale === "en") {
    return normalizedPathname === "/" ? "/tr" : `/tr${normalizedPathname}`;
  }

  if (normalizedPathname === "/tr") return "/";
  if (normalizedPathname.startsWith("/tr/")) {
    return normalizedPathname.replace(/^\/tr/, "");
  }

  return "/";
}

export function InternationalizationToggleButton() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const label = useMemo(() => (locale === "tr" ? "English" : "Türkçe"), [locale]);
  const icon = useMemo(() => (locale === "tr" ? "🇺🇲" : "🇹🇷"), [locale]);

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window === "undefined") return;

        const targetPath = getTargetPathname(pathname, locale);
        const nextUrl = `${targetPath}${window.location.search}${window.location.hash}`;
        router.push(nextUrl);
      }}
      className="border flex items-center gap-1 border-primary fixed bottom-4 end-8 px-4 py-2 z-50 rounded-xl bg-background/70 backdrop-blur-2xl"
    >
      <span className="text-xs text-primary">{label}</span>
      <span className="text-lg">{icon}</span>
    </button>
  );
}
