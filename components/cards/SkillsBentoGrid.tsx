"use client";

import { useTranslation } from "@/lib/i18n/context";
import { getIcon } from "@/lib/icons";

interface Skill {
  name: string;
  iconName: string;
  url?: string;
}

interface PodiumSkill extends Skill {
  position: number;
}

interface SkillsBentoGridProps {
  skills: Skill[];
}

const SkillsPodium = ({ skills }: { skills: PodiumSkill[] }) => {
  const sortedSkills = [
    skills.find((s) => s.position === 2)!,
    skills.find((s) => s.position === 1)!,
    skills.find((s) => s.position === 3)!,
  ];

  const { t } = useTranslation();

  return (
    <div className="bg-background flex items-center justify-center p-8">
      <div className="w-full">
        <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">
          {t("cv.skills.topSkills")}
        </h2>

        <div className="flex items-end justify-center gap-8">
          {sortedSkills.map((skill) => {
            const heights = { 1: "h-56", 2: "h-48", 3: "h-40" };
            const Icon = getIcon(skill.iconName);
            const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
            return (
              <a
                key={skill.name}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 w-32"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-muted/70 transition-colors">
                  <Icon
                    className="w-8 h-8 text-foreground/80 group-hover:text-foreground transition-colors"
                    size={skill.position === 1 ? 48 : 40}
                  />
                </div>

                <div
                  className={`w-full ${heights[skill.position as keyof typeof heights]} bg-muted group-hover:bg-muted/70 transition-colors rounded-t border-t-2 ${skill.position === 1 ? "border-t-foreground" : "border-t-muted-foreground/40"}`}
                >
                  <div className="h-full flex flex-col items-center justify-center gap-2 px-4">
                    <div
                      className={`text-4xl font-bold ${skill.position === 1 ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {skill.position}
                    </div>
                    <div className="text-sm font-medium text-foreground/60 text-center">
                      {skill.name}
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SkillsBentoGrid = ({ skills }: SkillsBentoGridProps) => {
  // My top 3 technologies
  const topTechs = [
    { name: "Next.js", position: 1 },
    { name: "Python", position: 2 },
    { name: "Java", position: 3 },
  ];

  const podiumSkills = topTechs.map((tech) => ({
    ...skills.find((s) => s.name === tech.name)!,
    position: tech.position,
  }));

  const sortedPodium = [
    podiumSkills.find((s) => s.position === 2)!,
    podiumSkills.find((s) => s.position === 1)!,
    podiumSkills.find((s) => s.position === 3)!,
  ];

  const otherSkills = skills.filter(
    (skill) => !topTechs.some((tech) => tech.name === skill.name),
  );

  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Skills Podium */}
      <SkillsPodium skills={sortedPodium} />

      <h5>{t("cv.skills.otherSkills")}</h5>

      {/* Other Skills - Compact List */}
      <div className="flex flex-wrap gap-2 justify-center">
        {otherSkills.map((skill) => {
          const Icon = getIcon(skill.iconName);

          return (
            <a
              key={skill.name}
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-md border border-border bg-card hover:bg-muted/50 transition-all duration-200 hover:scale-105 hover:border-foreground/20 flex items-center gap-2 px-3 py-2"
              title={skill.name}
            >
              <div className="text-foreground/60 group-hover:text-foreground transition-colors">
                <Icon size={20} />
              </div>
              <span className="text-xs font-medium text-foreground/60 group-hover:text-foreground transition-colors">
                {skill.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsBentoGrid;
