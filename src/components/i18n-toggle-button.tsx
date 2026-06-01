"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function InternationalizationToggleButton() {
  const pathname = usePathname();
  const locale = pathname.includes("/tr") ? "tr" : "en";
  const [href, setHref] = useState<string>();
  const label = useMemo(
    () => (locale === "tr" ? "English" : "Türkçe"),
    [locale]
  );
  const icon = useMemo(() => (locale === "tr" ? "🇺🇲" : "🇹🇷"), [locale]);

  useEffect(() => {
    const getHref = () => {
      if (typeof window === "undefined") return "/";

      const url = new URL(window.location.toString());

      if (locale === "en") {
        url.pathname = "/tr";
      } else {
        url.pathname = "/";
      }

      return url.toString();
    };

    queueMicrotask(() => {
      setHref(getHref());
    });
  }, [locale, setHref]);

  return (
    <Link
      href={href ?? "#"}
      className="border flex items-center gap-1 border-primary fixed bottom-4 end-8 px-4 py-2 rounded-xl bg-background/70 backdrop-blur-2xl"
    >
      <span className="text-xs text-primary">{label}</span>
      <span className="text-lg">{icon}</span>
    </Link>
  );
}
