import { getSkills } from "@/lib/skills";
import CVPageClient from "@/components/CVPageClient";

export default async function CVPage() {
  const skillsData = await getSkills();
  const skills = skillsData.skills.map((skill) => ({
    name: skill.name,
    iconName: skill.iconName,
    url: skill.url ?? "",
  }));

  return <CVPageClient skills={skills} />;
}
