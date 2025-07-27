import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group">
      <article className="space-y-4 p-6 rounded-lg hover:bg-white/[0.02] transition-colors">
        {/* Image du projet */}
        <div className="relative aspect-video rounded-lg overflow-hidden ring-1 ring-white/10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Contenu */}
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <h3
              className="text-xl font-medium text-foreground transition-colors"
              style={{
                width: "80%",
              }}
            >
              {project.title}
            </h3>
            <time className="text-sm text-muted-foreground whitespace-nowrap">
              {new Date(project.date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "short",
              })}
            </time>
          </div>

          <p className="text-muted-foreground leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs rounded border"
                style={{
                  backgroundColor: "var(--card-tech-bg, rgba(0,0,0,0.05))",
                  color: "var(--card-tech-fg, #555)",
                  borderColor: "var(--card-tech-border, rgba(0,0,0,0.1))",
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs text-muted-foreground">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
