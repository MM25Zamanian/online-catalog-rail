import type { Metadata } from "next";
import { getDictionary } from "@/i18n";

const turkishDictionary = getDictionary("tr");

export const metadata: Metadata = {
  ...turkishDictionary.metadata,
  alternates: {
    canonical: "/tr",
    languages: {
      en: "/",
      tr: "/tr",
    },
  },
};

export default function TurkishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
