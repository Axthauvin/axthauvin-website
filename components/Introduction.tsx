"use client";

import Image from "next/image";
import { FileText, Mail } from "lucide-react";

import { TfiLinkedin, TfiGithub } from "react-icons/tfi";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { toast } from "sonner";

export default function Introduction() {
  const handleEmailClick = () => {
    console.log("Email button clicked");
    // copy email to clipboard
    navigator.clipboard.writeText("axthauvin@gmail.com");
    toast.success("L'email a bien été copié !");
  };

  return (
    <section
      className="mb-16 mx-auto px-6 py-20 max-w-4xl"
      style={{
        marginBottom: 0,
        paddingBottom: "0",
      }}
    >
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <Image
            src="/moi au soleil.jpg"
            alt="Axel Thauvin"
            width={100}
            height={100}
            className="rounded-full shadow-lg"
            priority
          />
          <div className="flex flex-col items-start gap-2 flex-1">
            <h1 className="text-4xl tracking-tight md:text-5xl font-bold">
              Axel Thauvin
            </h1>
            <p className="italic md:text-lg">
              Étudiant en 4ème année à l&apos;EPITA
            </p>
          </div>
          <div className="w-full md:w-auto flex justify-start md:justify-end mt-4 md:mt-0">
            <Link
              href="/cv"
              className="inline-flex items-center gap-2 text-muted-foreground hover-fade text-sm"
              target="_blank"
            >
              <FileText size={16} />
              Voir mon CV
            </Link>
          </div>
        </div>

        <p className="text-base italic mt-2 text-muted-foreground">
          Je conçois des outils simples et accessibles, et je transmets ma
          passion pour l’informatique à travers des cours en ligne et des
          projets open source.
        </p>
        <div className="flex gap-6 text-sm">
          <a
            href="https://github.com/axthauvin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-400 transition-colors flex items-center gap-2 group"
          >
            <TfiGithub
              width={20}
              height={20}
              className="group-hover:scale-110 transition-transform"
            />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/axthauvin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-400 transition-colors flex items-center gap-2 group"
          >
            <TfiLinkedin
              width={20}
              height={20}
              className="group-hover:scale-110 transition-transform"
            />
            LinkedIn
          </a>

          <button
            type="button"
            onClick={handleEmailClick}
            className="text-muted-foreground hover:text-blue-400 transition-colors flex items-center gap-2 group bg-transparent border-none p-0 cursor-pointer"
          >
            <Mail
              width={20}
              height={20}
              className="group-hover:scale-110 transition-transform"
            />
            Email
          </button>
          <a
            href="https://twitter.com/axthauvin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-400 transition-colors flex items-center gap-2 group"
          >
            <FaXTwitter
              width={20}
              height={20}
              className="group-hover:scale-110 transition-transform"
            />
            Twitter
          </a>
        </div>
      </div>
    </section>
  );
}
