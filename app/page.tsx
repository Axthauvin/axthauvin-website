import { getAllProjects, getFeaturedProject } from "@/lib/projects";
import BentoGrid from "@/components/BentoHomeClient";

export default async function Home() {
  const allProjects = getAllProjects();
  return <BentoGrid projects={allProjects} />;
}
