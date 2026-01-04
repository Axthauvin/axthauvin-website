"use client";

import { Project } from "@/lib/projects";
import { Card } from "../ui/card";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

function ProjectCard(props: Project) {
  const { locale } = useTranslation();

  return (
    <Card className="border-neutral-800 bg-neutral-950 overflow-hidden hover:border-neutral-700 transition-all duration-300 group cursor-pointer h-full flex flex-col">
      <Link href={`/projects/${props.slug}`}>
        <div className="relative aspect-video overflow-hidden block">
          <Image
            src={props.image}
            alt={props.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <ExternalLink
            className={`absolute top-4 right-4 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
              props.accentColor ? "text-" + props.accentColor : "text-white"
            }`}
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-semibold text-white group-hover:text-neutral-200 transition-colors mb-2">
              {props.title}
            </h3>
            <time className="text-sm text-muted-foreground whitespace-nowrap">
              {new Date(props.date).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
                year: "numeric",
                month: "short",
              })}
            </time>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed">
            {props.description}
          </p>
        </div>
      </Link>
    </Card>
  );
}

export default ProjectCard;
