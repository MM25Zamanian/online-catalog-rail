import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { getBuildLocale, getDictionary } from "@/i18n";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const locale = getBuildLocale();
const dictionary = getDictionary();

export const metadata: Metadata = dictionary.metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${roboto.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
