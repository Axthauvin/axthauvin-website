import { getSkills } from "@/lib/skills";
import ResumePage from "@/components/ResumePage";

export default async function CVPage() {
  const skillsData = await getSkills();
  const skills = skillsData.skills.map((skill) => ({
    name: skill.name,
    iconName: skill.iconName,
    url: skill.url ?? "",
  }));

  return <ResumePage skills={skills} />;
}
