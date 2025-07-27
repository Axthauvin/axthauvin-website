import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/projects";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground">
            Mes projets
          </h2>
          <p className="text-muted-foreground">
            Aucun projet disponible pour le moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="space-y-12">
        <div className="space-y-2">
          <h2
            className="text-2xl md:text-3xl font-medium text-foreground"
            style={{
              paddingLeft: "1.5rem",
            }}
          >
            Mes projets
          </h2>
          {/* <div className="w-16 h-0.5 bg-white/20 mx-auto"></div> */}
        </div>

        <div
          className="grid md:grid-cols-2 gap-8"
          style={{
            marginTop: "1.5rem",
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
