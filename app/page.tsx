import { getAllProjects } from "@/lib/projects";
import BentoGrid from "@/components/BentoHomeClient";

export default async function Home() {
  const projectsEn = getAllProjects("en");
  const projectsFr = getAllProjects("fr");
  return <BentoGrid projectsEn={projectsEn} projectsFr={projectsFr} />;
}
