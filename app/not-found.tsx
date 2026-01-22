"use client";

import { Home, ArrowLeft } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center relative overflow-hidden">
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%201000%201000%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%224%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23noiseFilter%29%22%2F%3E%3C%2Fsvg%3E')]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Glitchy 404 */}
        <div className="relative mb-8 group">
          <h1
            className={`text-[12rem] sm:text-[16rem] font-bold leading-none text-transparent bg-clip-text bg-gray-400  select-none transition-all duration-300`}
          >
            404
          </h1>
        </div>
        {/* Message */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl sm:text-3xl font-medium text-white">
            {t("notFound.title")}
          </h2>
          <p className="text-neutral-400 max-w-md mx-auto leading-relaxed">
            {t("notFound.message")}
            <br />
            <span className="text-neutral-500">{t("notFound.subMessage")}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="outline"
            className="h-full px-6 py-2.5 flex items-center gap-2 rounded-lg border-neutral-700 hover:border-neutral-500 text-neutral-200 hover:text-white hover:bg-neutral-900/50 transition-all duration-300"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <Home
              size={20}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-medium">{t("notFound.backHome")}</span>
          </Button>

          <Button
            onClick={() => window.history.back()}
            className="h-full px-6 py-2.5 flex items-center gap-2 rounded-lg border border-neutral-700"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">{t("notFound.previousPage")}</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
