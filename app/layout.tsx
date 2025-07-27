import ThemeSwitcher from "@/components/ThemeSwitcher";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://axelthauvin.dev"),
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
        <link rel="icon" href="/moi au soleil.jpg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <ThemeSwitcher />
        {children}
        <Footer />
      </body>
    </html>
  );
}
