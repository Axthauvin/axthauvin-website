import { getAllProjects } from "@/lib/projects";
import BentoGrid from "@/components/BentoHomeClient";

export default async function Home() {
  const projectsEn = getAllProjects("en").filter((project) => !project.hidden);
  const projectsFr = getAllProjects("fr").filter((project) => !project.hidden);
  return <BentoGrid projectsEn={projectsEn} projectsFr={projectsFr} />;
}
