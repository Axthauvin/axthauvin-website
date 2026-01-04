"use client";

import { useTranslation } from "@/lib/i18n";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-white/5">
      <div className="text-center text-muted-foreground">
        <p>&copy; {currentYear} Axel Thauvin. {t("footer.copyright")}</p>
      </div>
    </footer>
  );
}
