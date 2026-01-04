"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Project } from "@/lib/projects";
import { getLinkConfig } from "@/lib/linkTypes";
import { useTranslation } from "@/lib/i18n";

interface ProjectPageClientProps {
  projectEn: Project | null;
  projectFr: Project | null;
  contentHtmlEn: string;
  contentHtmlFr: string;
}

export default function ProjectPageClient({
  projectEn,
  projectFr,
  contentHtmlEn,
  contentHtmlFr,
}: ProjectPageClientProps) {
  const { t, locale } = useTranslation();

  // Use state to handle client-side locale switching
  const [currentProject, setCurrentProject] = useState<Project | null>(
    projectEn || projectFr
  );
  const [currentContentHtml, setCurrentContentHtml] = useState<string>(
    contentHtmlEn || contentHtmlFr
  );

  useEffect(() => {
    if (locale === "fr" && projectFr) {
      setCurrentProject(projectFr);
      setCurrentContentHtml(contentHtmlFr);
    } else if (projectEn) {
      setCurrentProject(projectEn);
      setCurrentContentHtml(contentHtmlEn);
    }
  }, [locale, projectEn, projectFr, contentHtmlEn, contentHtmlFr]);

  if (!currentProject) {
    return null;
  }

  const project = currentProject;
  const contentHtml = currentContentHtml;

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="space-y-8 mb-16">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-medium text-foreground">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Calendar size={18} />
            <span>
              {new Date(project.date).toLocaleDateString(
                locale === "fr" ? "fr-FR" : "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </span>
          </div>
        </div>

        {/* Main image */}
        <div className="relative aspect-video rounded-lg overflow-hidden ring-1 ring-white/10 mb-16">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-white/5 text-muted-foreground rounded-full border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          {project.links && project.links.length > 0 ? (
            (() => {
              const links = [...project.links];

              // Always put GitHub link first if exists
              const githubIndex = links.findIndex(
                (l) =>
                  l.type === "github" || (l.url && /github\.com/.test(l.url))
              );

              if (project.github && githubIndex === -1) {
                links.unshift({
                  type: "github",
                  url: project.github,
                  label: undefined,
                });
              } else if (githubIndex > 0) {
                const [gh] = links.splice(githubIndex, 1);
                links.unshift(gh);
              }

              return links.map((link, index) => {
                const config = getLinkConfig(link.type ?? "other");
                const Icon = config.icon;
                const isPrimary = config.buttonStyle === "primary";
                const href = link.url ?? "#";

                return (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors group ${
                      isPrimary
                        ? "bg-white text-black hover:bg-white/90"
                        : "border border-white/20 text-foreground hover:bg-white/5"
                    }`}
                    title={config.description}
                  >
                    {Icon ? <Icon size={18} /> : null}
                    <span>{link.label || config.label}</span>
                  </a>
                );
              });
            })()
          ) : (
            // Backward compatibility fallback
            <>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors group"
                >
                  <span>{t("common.seeCode")}</span>
                </a>
              )}

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 border border-white/20 text-foreground rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <span>{t("common.seeDemo")}</span>
                </a>
              )}
            </>
          )}
        </div>
      </header>

      {/* Markdown content */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Navigation to other projects */}
      <section className="mt-12 pt-12 border-t border-white/5">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 border border-white/20 text-foreground rounded-lg hover:bg-white/5 transition-colors"
          >
            <span>{t("projects.allProjects")}</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
