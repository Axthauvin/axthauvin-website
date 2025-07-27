import Link from "next/link";
import { ArrowLeft, Download, MapPin } from "lucide-react";
import { getCVData } from "@/lib/cv";
import Image from "next/image";
import React from "react";
import { FroggerSkillsGame } from "@/components/Frogger";
import { IconType } from "react-icons/lib";

export default async function CVPage() {
  const cvData = await getCVData();

  const skills = cvData.skills.skills.map((skill) => ({
    name: skill.name,
    icon: skill.icon.name,
    url: skill.url ?? "",
  }));

  return (
    <main className="content min-h-screen max-w-4xl mx-auto px-6 py-12">
      {/* Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover-fade text-sm"
        >
          <ArrowLeft size={16} />
          Retour
        </Link>
        <Link
          href="/curriculum/axthauvin_cv_2025.pdf"
          className="inline-flex items-center gap-2 text-muted-foreground hover-fade text-sm"
          target="_blank"
        >
          <Download size={16} />
          Version PDF
        </Link>
      </div>

      {/* En-tête */}
      <header className="mb-1 flex justify-center gap-4">
        <Image
          src="/moi au soleil.jpg"
          alt="Axel Thauvin"
          width={100}
          height={100}
          className="rounded-full border-2 border- shadow-lg mb-4 text-muted"
          priority
        />
        <div>
          <h1 className="text-3xl  mb-2">Axel Thauvin</h1>
          <p className="text-muted-foreground">
            Étudiant ingénieur en informatique
          </p>
          <div className="flex items-center text-sm mt-4 mt-0.5 m-0">
            <MapPin size={20} className="text-muted-foreground" />
            <span className="text-muted-foreground ml-2">Paris, France</span>
          </div>
        </div>
      </header>

      {/* À propos */}
      <section className="mb-12">
        <h2 className="text-lg mb-4 border-b border-gray-800 pb-2">
          {cvData.about.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {cvData.about.content}
        </p>
      </section>

      {/* Compétences */}
      <FroggerSkillsGame title={cvData.skills.title} skills={skills} />
      {/* <section className="mb-12">
        <h2 className="text-lg  mb-6 border-b border-gray-800 pb-2">
          {cvData.skills.title}
        </h2>
        <div className="relative w-full overflow-hidden">
          {[0, 1, 2].map((row) => (
            <div
              key={row}
              className="flex gap-6 animate-marquee py-4"
              style={{
                animationDuration: `${100}s`, // Slower animation
                animationDirection: row % 2 === 0 ? "normal" : "reverse",
              }}
            >
              {[
                ...cvData.skills.skills.slice(
                  row * Math.ceil(cvData.skills.skills.length / 3),
                  (row + 1) * Math.ceil(cvData.skills.skills.length / 3)
                ),
                ...cvData.skills.skills.slice(
                  row * Math.ceil(cvData.skills.skills.length / 3),
                  (row + 1) * Math.ceil(cvData.skills.skills.length / 3)
                ),
              ].map((skill, idx) => (
                <a
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`row${row}-${idx}`}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 dark:bg-gray-800/50 bg-gray-200/60 border border-gray-600 dark:border-gray-600 border-gray-300 rounded-full text-sm text-gray-300 dark:text-gray-300 text-gray-800 whitespace-nowrap flex-shrink-0 hover:bg-green-700/50 dark:hover:bg-green-700/50 hover:bg-gray-300/80 hover:text-black dark:hover:text-white transition-all duration-300"
                >
                  {React.createElement(skill.icon)}
                  <span>{skill.name}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      </section> */}

      {/* Expérience */}
      <section className="mb-12">
        <h2 className="text-lg  mb-6 border-b border-gray-800 pb-2">
          {cvData.experience.title}
        </h2>
        <div className="relative">
          {/* Ligne verticale principale */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600"></div>
          <div className="space-y-8">
            {cvData.experience.jobs.map((job, index) => (
              <div key={index} className="relative">
                {/* Point sur la timeline */}
                <div className="absolute left-6 top-2 w-5 h-5 bg-white rounded-full border-4 border-gray-950 shadow-md z-10"></div>

                {/* Contenu de l'expérience */}
                <div className="ml-20 backdrop-blur-sm border border-gray-800 rounded-xl p-6  transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                  {/* En-tête avec titre et période */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-6">
                    <h3 className="text-xl font-semibold leading-tight flex-1">
                      {job.title}
                    </h3>
                    <span className="text-muted-foreground font-medium text-sm px-3 py-1 rounded-md border border-gray-600 whitespace-nowrap">
                      {job.period}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="space-y-3">
                    {job.description.map((desc, descIndex) => (
                      <div
                        key={descIndex}
                        className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2.5 flex-shrink-0"></div>
                        <p className="text-sm">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formation */}
      <section className="mb-12">
        <h2 className="text-lg mb-6 border-b border-gray-800 pb-2">
          {cvData.education.title}
        </h2>
        <div className="relative">
          {/* Ligne verticale principale */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600"></div>
          <div className="space-y-8">
            {cvData.education.degrees.map((degree, index) => (
              <div key={index} className="relative">
                {/* Point sur la timeline */}
                <div className="absolute left-6 top-2 w-5 h-5 bg-white rounded-full border-4 border-gray-950 shadow-md z-10"></div>

                {/* Contenu de la formation */}
                <div className="ml-20 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                  {/* En-tête avec titre et période */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4">
                    <h3 className="text-xl font-semibold leading-tight flex-1">
                      {degree.title}
                    </h3>
                    <span className="text-muted-foreground font-medium text-sm px-3 py-1 rounded-md border border-gray-600 whitespace-nowrap">
                      {degree.period}
                    </span>
                  </div>
                  {/* Description */}
                  <ul className="space-y-2">
                    {degree.description.map((desc, descIndex) => (
                      <li
                        key={descIndex}
                        className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2.5 flex-shrink-0"></div>
                        <span className="text-sm">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
