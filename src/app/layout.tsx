import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Darkpattern.lab — 62 dark patterns, one objective definition each",
    template: "%s — Darkpattern.lab",
  },
  description:
    "An educational reference for designers and developers. A catalog of 62 dark patterns, each described by objective, mathematically expressible conditions.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Darkpattern.lab",
    description:
      "An educational reference for designers and developers. 62 dark patterns, each described by objective, mathematically expressible conditions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="sandbox-body flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
