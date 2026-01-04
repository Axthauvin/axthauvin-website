import { getCVData } from "@/lib/skills";
import { Card } from "../ui/card";
import { FroggerSkillsGame } from "../Frogger";

async function SkillsCard() {
  const cvData = await getCVData();

  const skills = cvData.skills.skills.map((skill) => ({
    name: skill.name,
    iconName: skill.iconName,
    url: skill.url ?? "",
  }));

  return (
    <Card className="col-span-1 md:col-span-3 border-neutral-800 bg-neutral-950 p-6">
      <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
        Skills
      </h3>
      {/* <FroggerSkillsGame title={cvData.skills.title} skills={skills} /> */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className="px-3 py-1.5 text-xs bg-neutral-900 text-neutral-300 rounded-full border border-neutral-800 hover:border-neutral-700 transition-all duration-200 hover:bg-neutral-800"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </Card>
  );
}
export default SkillsCard;
