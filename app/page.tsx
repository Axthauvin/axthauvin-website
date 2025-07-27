import Introduction from "@/components/Introduction";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectsGrid from "@/components/ProjectsGrid";
import { getAllProjects, getFeaturedProject } from "@/lib/projects";
import Header from "@/components/Header";

export default function Home() {
  const allProjects = getAllProjects();
  const featuredProject = getFeaturedProject();
  const otherProjects = allProjects.filter(
    (project) => project.slug !== featuredProject?.slug
  );

  return (
    <main className="min-h-screen">
      <Header />
      <Introduction />

      {/* {featuredProject && <FeaturedProject project={featuredProject} />} */}

      {otherProjects.length > 0 && <ProjectsGrid projects={allProjects} />}
    </main>
  );
}
