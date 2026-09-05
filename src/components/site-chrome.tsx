"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const ISOLATED_DEMO_PATH = /^\/\d+\/\d+\/[12]\/?$/;

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname && ISOLATED_DEMO_PATH.test(pathname)) {
    return <div className="min-h-screen bg-white text-black">{children}</div>;
  }

  return (
    <div className="sandbox-body flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
