import Link from "next/link";
import {
  ArrowLeft,
  Download,
  MapPin,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import { getCVData } from "@/lib/cv";
import Image from "next/image";
import React from "react";
import { FroggerSkillsGame } from "@/components/Frogger/index";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default async function CVPage() {
  const cvData = await getCVData();

  const skills = cvData.skills.skills.map((skill) => ({
    name: skill.name,
    iconName: skill.iconName,
    url: skill.url ?? "",
  }));
  return (
    <main className="content min-h-screen max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Navigation */}
      <div className="mb-8 flex items-center justify-between flex-wrap gap-2">
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

      <header className="mb-1 flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-4 text-center sm:text-left">
        <Image
          src="/moi dans la nature.jpg"
          alt="Axel Thauvin"
          width={100}
          height={100}
          className="rounded-full shadow-lg mb-4 text-muted max-h-[100px]"
          sizes="(max-width: 640px) 64px, 100px"
          priority
        />
        <div>
          <h1 className="text-2xl sm:text-3xl  mb-1 sm:mb-2">Axel Thauvin</h1>
          <p className="text-muted-foreground">
            Étudiant ingénieur en informatique
          </p>
          <div className="flex items-center justify-center sm:justify-start text-sm mt-0.5">
            <MapPin size={20} className="text-muted-foreground" />
            <span className="text-muted-foreground ml-2">Paris, France</span>
          </div>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-lg mb-4 border-b pb-2 dark:border-gray-800  border-gray-200">
          {cvData.about.title}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {cvData.about.content}
        </p>
      </section>

      <FroggerSkillsGame title={cvData.skills.title} skills={skills} />

      <section className="mb-12">
        <h2 className="text-lg mb-6 border-b pb-2 dark:border-gray-800 border-gray-200">
          Mon parcours
        </h2>

        <Tabs defaultValue="experience" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 gap-2 mb-8 p-2 sm:p-1 h-full">
            <TabsTrigger value="experience" className="py-3 sm:py-2 ">
              <Briefcase className="w-4 h-4 text-muted-foreground mr-2" />
              Expérience professionnelle
            </TabsTrigger>
            <TabsTrigger value="formation" className="py-3 sm:py-2">
              <GraduationCap className="w-4 h-4 text-muted-foreground mr-2" />
              Formation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experience">
            <div className="space-y-5">
              {cvData.experience.jobs.map((job, index) => (
                <div
                  key={index}
                  className="group relative border dark:border-gray-800 border-gray-200 rounded-lg overflow-hidden transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-900/30"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-400 dark:bg-gray-600 group-hover:w-1 transition-all" />

                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-start sm:justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-start gap-2.5">
                          <div>
                            <h3 className="font-semibold text-sm sm:text-base leading-snug">
                              {job.title.split("\n").map((line, i) => (
                                <span key={i} className="block">
                                  {line}
                                </span>
                              ))}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                              {job.type && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded bg-muted font-medium">
                                  {job.type}
                                </span>
                              )}
                              <span className="inline-flex sm:hidden items-center px-2 py-0.5 rounded bg-muted font-medium">
                                {job.period}
                              </span>
                              {job.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {job.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="hidden sm:inline-block text-xs text-muted-foreground font-medium px-2.5 py-1 rounded bg-muted whitespace-nowrap">
                        {job.period}
                      </span>
                    </div>

                    <ul className="space-y-1.5 mb-3 ml-5 sm:ml-6">
                      {job.description.map((desc, descIndex) => (
                        <li
                          key={descIndex}
                          className="flex items-start gap-2.5 text-muted-foreground text-sm leading-relaxed"
                        >
                          <span className="text-muted-foreground">•</span>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: desc.replace(
                                /<a\s+href="([^"]*)"[^>]*>(.*?)<\/a>/gi,
                                (match, href, text) => {
                                  return `<a href="${href}" class="underline hover:text-foreground transition-colors" rel="noopener noreferrer" target="_blank">${text}</a>`;
                                }
                              ),
                            }}
                            className="break-words"
                          />
                        </li>
                      ))}
                    </ul>

                    {job.tags && job.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 ml-5 sm:ml-6">
                        {job.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="secondary"
                            className="text-xs px-2 py-0.5 font-normal"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="formation">
            <div className="space-y-5">
              {cvData.education.degrees.map((degree, index) => (
                <div
                  key={index}
                  className="group relative border dark:border-gray-800 border-gray-200 rounded-lg overflow-hidden transition-colors hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50/50 dark:hover:bg-gray-900/30"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-400 dark:bg-gray-600 group-hover:w-1 transition-all" />

                  <div className="p-4 sm:p-5">
                    <div className="flex items-start justify-start sm:justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-start gap-2.5">
                          <div>
                            <h3 className="font-semibold text-sm sm:text-base leading-snug">
                              {degree.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                              <span className="inline-flex sm:hidden items-center px-2 py-0.5 rounded bg-muted font-medium">
                                {degree.period}
                              </span>
                              {degree.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {degree.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className="hidden sm:inline-block text-xs text-muted-foreground font-medium px-2.5 py-1 rounded bg-muted whitespace-nowrap">
                        {degree.period}
                      </span>
                    </div>

                    <ul className="space-y-1.5 mb-3 ml-5 sm:ml-6">
                      {degree.description.map((desc, descIndex) => (
                        <li
                          key={descIndex}
                          className="flex items-start gap-2.5 text-muted-foreground text-sm leading-relaxed"
                        >
                          <span className="text-muted-foreground">•</span>
                          <span className="break-words">{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {degree.tags && degree.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 ml-5 sm:ml-6">
                        {degree.tags.map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="secondary"
                            className="text-xs px-2 py-0.5 font-normal"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
