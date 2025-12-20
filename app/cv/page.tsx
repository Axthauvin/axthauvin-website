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
          src="/axel_big.png"
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
            <div className="relative space-y-6">
              {/* Ligne verticale */}
              <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40" />

              {cvData.experience.jobs.map((job, index) => (
                <div
                  key={index}
                  className="group relative bg-card rounded-xl p-6 pl-12 shadow-sm border border-border/40 hover:shadow-md hover:border-border transition-all duration-200"
                >
                  {/* Point de timeline */}
                  <div className="absolute left-[5px] top-8 w-[14px] h-[14px] rounded-full bg-primary border-4 border-background shadow-sm group-hover:scale-125 transition-transform duration-200" />

                  {/* Header avec titre et période */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight">
                        {job.title.split("\n").map((line, i) => (
                          <span key={i} className="block">
                            {line}
                          </span>
                        ))}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        {job.type && (
                          <>
                            <span className="font-medium text-foreground/80">
                              {job.type}
                            </span>
                            {job.location && <span>•</span>}
                          </>
                        )}
                        {job.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {job.location}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-sm text-muted-foreground font-medium whitespace-nowrap">
                      {job.period}
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-4">
                    {job.description.map((desc, descIndex) => (
                      <li
                        key={descIndex}
                        className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="text-muted-foreground/60 flex-shrink-0">
                          •
                        </span>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: desc.replace(
                              /<a\s+href="([^"]*)"[^>]*>(.*?)<\/a>/gi,
                              (match, href, text) => {
                                return `<a href="${href}" class="text-primary hover:underline font-medium transition-colors" rel="noopener noreferrer" target="_blank">${text}</a>`;
                              }
                            ),
                          }}
                          className="break-words flex-1"
                        />
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-border/40">
                      {job.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs px-2.5 py-1 font-medium bg-muted/60 hover:bg-muted transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="formation">
            <div className="space-y-6">
              {cvData.education.degrees.map((degree, index) => (
                <div
                  key={index}
                  className="group relative bg-card rounded-xl p-6 shadow-sm border border-border/40 hover:shadow-md hover:border-border transition-all duration-200"
                >
                  {/* Header avec titre et période */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-1 leading-tight">
                        {degree.title}
                      </h3>
                      {degree.location && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5" />
                          {degree.location}
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-sm text-muted-foreground font-medium whitespace-nowrap">
                      {degree.period}
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-4">
                    {degree.description.map((desc, descIndex) => (
                      <li
                        key={descIndex}
                        className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="text-muted-foreground/60 flex-shrink-0">
                          •
                        </span>
                        <span className="break-words flex-1">{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  {degree.tags && degree.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-3 border-t border-border/40">
                      {degree.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs px-2.5 py-1 font-medium bg-muted/60 hover:bg-muted transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
