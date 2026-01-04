"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { t } = useTranslation();

  if (isHomePage) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors group"
          style={{
            display: `${isHomePage ? "none" : "inline-flex"}`,
          }}
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span>{t("header.back")}</span>
        </Link>
      </div>
    </header>
  );
}
