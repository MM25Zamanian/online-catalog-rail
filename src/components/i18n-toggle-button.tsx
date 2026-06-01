"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

function getLocaleFromPathname(pathname: string): "en" | "tr" {
  return pathname === "/tr" || pathname.startsWith("/tr/") ? "tr" : "en";
}

function getTargetPathname(pathname: string, locale: "en" | "tr"): string {
  if (locale === "en") {
    return pathname === "/" ? "/tr" : `/tr${pathname}`;
  }

  return pathname.replace(/^\/tr(\/|$)/, "/");
}

export function InternationalizationToggleButton() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const label = useMemo(() => (locale === "tr" ? "English" : "Türkçe"), [locale]);
  const icon = useMemo(() => (locale === "tr" ? "🇺🇲" : "🇹🇷"), [locale]);

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window === "undefined") return;

        const url = new URL(window.location.href);
        url.pathname = getTargetPathname(url.pathname, locale);
        window.location.assign(`${url.pathname}${url.search}${url.hash}`);
      }}
      className="border flex items-center gap-1 border-primary fixed bottom-4 end-8 px-4 py-2 rounded-xl bg-background/70 backdrop-blur-2xl"
    >
      <span className="text-xs text-primary">{label}</span>
      <span className="text-lg">{icon}</span>
    </button>
  );
}
