import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://axthauvin.onrender.com"),
  title: "Axel Thauvin",
  description:
    "Je crée des outils accessibles et partage ma passion via des cours et projets open source.",
  keywords: [
    "développeur",
    "portfolio",
    "web",
    "frontend",
    "backend",
    "axel thauvin",
  ],
  authors: [{ name: "Axel Thauvin" }],
  openGraph: {
    title: "Axel Thauvin",
    description:
      "Je crée des outils accessibles et partage ma passion via des cours et projets open source.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <head>
        <link rel="icon" href="/axel_big.png" />
        {/* Preload the book cover to avoid blank on first open */}
        <link rel="preload" as="image" href="/favBook.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="google-site-verification"
          content="DlYHTWv1xnFpn5B_r5ckuQ95lTi1_RaYPuSqD06MLqI"
        />
      </head>
      <body className="min-h-screen">
        {/* <ThemeSwitcher /> */}
        {children}
        <Toaster position="top-right" theme="system" />
        <Footer />
      </body>
    </html>
  );
}
