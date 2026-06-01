import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { getDictionary } from "@/i18n";
import "./globals.css";
import { InternationalizationToggleButton } from "@/components/i18n-toggle-button";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const englishDictionary = getDictionary("en");

export const viewport: Viewport = {
  themeColor: "#03162a",
};

export const metadata: Metadata = {
  ...englishDictionary.metadata,
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      tr: "/tr",
    },
  },
  appleWebApp: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${roboto.variable} h-full overflow-hidden antialiased`}
    >
      <body className="h-full overflow-hidden">
        {children}
        <InternationalizationToggleButton />
      </body>
    </html>
  );
}
