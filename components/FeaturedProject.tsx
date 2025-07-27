import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";

interface FeaturedProjectProps {
  project: Project;
}

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground">
            Mon dernier projet
          </h2>
          <div className="w-16 h-0.5 bg-white/20 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image du projet */}
          <div className="relative aspect-video rounded-lg overflow-hidden ring-1 ring-white/10 group">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Contenu du projet */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-medium text-foreground">
                {project.title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
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
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors group"
              >
                <span>Voir le projet</span>
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 border border-white/20 text-foreground rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <Github size={18} />
                  <span>Code</span>
                </a>
              )}

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 border border-white/20 text-foreground rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <ExternalLink size={18} />
                  <span>Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
