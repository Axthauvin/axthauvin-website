import React from "react";
import { Project } from "@/lib/projects";
import IntroCard from "./cards/IntroCard";
import { SocialsCard } from "./cards/SocialsCard";
import CVCard from "./cards/CVCard";
import ProjectCard from "./cards/ProjectCard";
import HobbiesCard from "./cards/HobbiesCard";

export default function BentoPortfolio({ projects }: { projects: Project[] }) {
  return (
    <div className="content min-h-screen bg-black p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-4 auto-rows-max">
          {/* Intro Card - Full width on mobile, spans 2 cols on tablet, 3 cols on desktop */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <IntroCard />
          </div>

          {/* Socials Card */}
          <div className="col-span-1">
            <SocialsCard />
          </div>

          {/* CV Card */}
          <div className="col-span-1">
            <CVCard />
          </div>

          {/* Hobbies Card - Full width on mobile, normal on larger */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <HobbiesCard />
          </div>

          {/* Projects Grid */}
          {projects.map((project) => (
            <div
              key={project.title}
              className="col-span-1 sm:col-span-1 lg:col-span-2
              "
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
