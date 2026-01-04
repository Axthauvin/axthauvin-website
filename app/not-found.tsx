"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center relative overflow-hidden">
      {/* Animated background blobs */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-amber-900/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `calc(${mousePosition.x * 0.02}px + 10%)`,
            top: `calc(${mousePosition.y * 0.02}px + 20%)`,
            transition: "left 0.3s ease-out, top 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-orange-800/15 rounded-full blur-3xl animate-pulse"
          style={{
            right: `calc(${-mousePosition.x * 0.015}px + 15%)`,
            bottom: `calc(${-mousePosition.y * 0.015}px + 25%)`,
            transition: "right 0.3s ease-out, bottom 0.3s ease-out",
            animationDelay: "1s",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-800/10 rounded-full blur-3xl" />
      </div> */}

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%201000%201000%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%224%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23noiseFilter%29%22%2F%3E%3C%2Fsvg%3E')]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* Glitchy 404 */}
        <div className="relative mb-8 group">
          <h1
            className={`text-[12rem] sm:text-[16rem] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-br from-neutral-200 via-neutral-400 to-neutral-600 select-none transition-all duration-300 ${
              isHovering ? "scale-105" : ""
            }`}
          >
            404
          </h1>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl sm:text-3xl font-medium text-white">
            Page introuvable
          </h2>
          <p className="text-neutral-400 max-w-md mx-auto leading-relaxed">
            Hmmm. Vous n&apos;auriez pas dû arriver là...
            <br />
            <span className="text-neutral-500">
              Cette page n&apos;existe pas (encore ?).
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-neutral-800 to-neutral-900 text-white rounded-xl border border-neutral-700 transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/0 via-amber-800/10 to-orange-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Home
              size={20}
              className="relative z-10 group-hover:scale-110 transition-transform duration-300"
            />
            <span className="relative z-10 font-medium">
              Retour à l&apos;accueil
            </span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-4 text-neutral-400 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft size={18} />
            <span>Page précédente</span>
          </button>
        </div>
      </div>
    </main>
  );
}
