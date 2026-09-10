import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SmoothScroll } from "@/components/smooth-scroll";
import { SiteChrome } from "@/components/site-chrome";

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
    default: "Dark Pattern Lab — Objective Dark Patterns",
    template: "%s | Dark Pattern Lab",
  },
  description:
    "An educational reference for designers and developers exploring 64 dark patterns through objective, mathematically expressible conditions and interactive A/B demos.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Dark Pattern Lab",
    description:
      "An educational reference for designers and developers exploring 64 dark patterns through objective, mathematically expressible conditions and interactive A/B demos.",
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
      <body className="min-h-screen bg-white">
        <SmoothScroll />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
