import Link from "next/link";
import { ArrowLeft, Download, MapPin } from "lucide-react";
import { getCVData } from "@/lib/cv";
import Image from "next/image";
import React from "react";
import { FroggerSkillsGame } from "@/components/Frogger";

export default async function CVPage() {
  const cvData = await getCVData();

  const skills = cvData.skills.skills.map((skill) => ({
    name: skill.name,
    icon: skill.iconName,
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
          src="/moi dans la nature.jpg"
          alt="Axel Thauvin"
          width={100}
          height={100}
          className="rounded-full shadow-lg mb-4 text-muted max-h-[100px]"
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
        <h2 className="text-lg mb-4 border-b pb-2 dark:border-gray-800  border-gray-200">
          {cvData.about.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {cvData.about.content}
        </p>
      </section>

      {/* Compétences */}
      <FroggerSkillsGame title={cvData.skills.title} skills={skills} />

      {/* Expérience */}
      <section className="mb-12">
        <h2 className="text-lg  mb-6 border-b pb-2 dark:border-gray-800 border-gray-200">
          {cvData.experience.title}
        </h2>
        <div className="relative">
          {/* Ligne verticale principale */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600 dark:bg-gray-600 bg-gray-300"></div>
          <div className="space-y-8">
            {cvData.experience.jobs.map((job, index) => (
              <div key={index} className="relative">
                {/* Point sur la timeline */}
                <div className="absolute left-6 top-2 w-5 h-5 bg-white dark:bg-white bg-gray-100 rounded-full border-4 border-gray-200 dark:border-gray-950 border-gray-300 shadow-md z-10"></div>

                {/* Contenu de l'expérience */}
                <div className="ml-20 backdrop-blur-sm border dark:border-gray-800 border-gray-200 rounded-xl p-6  transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                  {/* En-tête avec titre et période */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-6">
                    <h3 className="text-xl font-semibold leading-tight flex-1">
                      {job.title.split("\n").map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <span className="text-muted-foreground font-medium text-sm px-3 py-1 rounded-md border border-gray-600 dark:border-gray-600 border-gray-300 whitespace-nowrap">
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
                        <div className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-500 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
                        <div
                          className="text-sm"
                          dangerouslySetInnerHTML={{
                            __html: desc.replace(
                              /<a\s+href="([^"]*)"[^>]*>(.*?)<\/a>/gi,
                              (match, href, text) => {
                                return `<a href="${href}" rel="noopener noreferrer">${text}</a>`;
                              }
                            ),
                          }}
                        />
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
        <h2 className="text-lg mb-6 border-b border-gray-200 dark:border-gray-800 border-gray-200 pb-2">
          {cvData.education.title}
        </h2>
        <div className="relative">
          {/* Ligne verticale principale */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-600 dark:bg-gray-600 bg-gray-300"></div>
          <div className="space-y-8">
            {cvData.education.degrees.map((degree, index) => (
              <div key={index} className="relative">
                {/* Point sur la timeline */}
                <div className="absolute left-6 top-2 w-5 h-5 bg-white dark:bg-white bg-gray-100 rounded-full border-4 border-gray-200 dark:border-gray-950 border-gray-300 shadow-md z-10"></div>

                {/* Contenu de la formation */}
                <div className="ml-20 backdrop-blur-sm border dark:border-gray-800 border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
                  {/* En-tête avec titre et période */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-4">
                    <h3 className="text-xl font-semibold leading-tight flex-1">
                      {degree.title}
                    </h3>
                    <span className="text-muted-foreground font-medium text-sm px-3 py-1 rounded-md border border-gray-600 dark:border-gray-600 border-gray-300 whitespace-nowrap">
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
                        <div className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-500 bg-gray-400 rounded-full mt-2.5 flex-shrink-0"></div>
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
