import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { getBuildLocale, getDictionary } from "@/i18n";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const locale = getBuildLocale();
const dictionary = getDictionary();

export const viewport: Viewport = {
  themeColor: "#03162a",
};

export const metadata: Metadata = {
  ...dictionary.metadata,
  appleWebApp: {
    // capable: true,
    // statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${roboto.variable} h-full overflow-hidden antialiased`}
    >
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
