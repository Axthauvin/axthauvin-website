"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Download,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { FroggerSkillsGame } from "@/components/Frogger/index";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n";
import en from "@/lib/i18n/translations/en";
import fr from "@/lib/i18n/translations/fr";

interface Skill {
  name: string;
  iconName: string;
  url: string;
}

export default function CVPageClient({ skills }: { skills: Skill[] }) {
  const { t, locale } = useTranslation();

  // Automatically detect jobs from translations
  const translations = locale === "fr" ? fr : en;
  const jobsData = translations.cv.jobs;
  const jobs = Object.keys(jobsData).map((key) => ({ key }));

  // Automatically detect degrees from translations
  const degreesData = translations.cv.degrees;
  const degrees = Object.keys(degreesData).map((key) => ({ key }));

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Navigation */}
      <div className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} />
              {t("cv.back")}
            </Link>
            <Link
              href="/curriculum/axthauvin_cv_2025.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors text-sm font-medium border border-border"
              target="_blank"
            >
              <Download size={16} />
              {t("cv.pdfVersion")}
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <Image
              src="/axel_big.png"
              alt="Axel Thauvin"
              width={140}
              height={140}
              className="rounded-full border-2 border-border max-h-[140px]"
              sizes="(max-width: 640px) 100px, 140px"
              priority
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-foreground">
                Axel Thauvin
              </h1>
              <p className="text-xl text-foreground/80 font-semibold mb-4">
                {t("cv.role")}
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full text-sm border border-border">
                <MapPin size={16} className="text-foreground/60" />
                <span>{t("cv.location")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-8">
          {/* About Section */}
          <section>
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-foreground/20 rounded-full" />
                <h2 className="text-2xl font-bold">{t("cv.about.title")}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("cv.about.content").replace(/\n/g, "<br/>"),
                  }}
                />
              </p>
            </div>
          </section>

          {/* Skills Section */}
          <section>
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-foreground/20 rounded-full" />
                <h2 className="text-2xl font-bold">{t("cv.skills.title")}</h2>
              </div>
            </div>
            <FroggerSkillsGame title="" skills={skills} />
          </section>

          {/* Experience & Education Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-foreground/20 rounded-full" />
              <h2 className="text-2xl font-bold">{t("cv.path.title")}</h2>
            </div>

            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-muted rounded-lg border border-border h-auto">
                <TabsTrigger
                  value="experience"
                  className="py-3 rounded data-[state=active]:bg-background"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  {t("cv.experience.tabLabel")}
                </TabsTrigger>
                <TabsTrigger
                  value="formation"
                  className="py-3 rounded data-[state=active]:bg-background"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {t("cv.education.tabLabel")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="experience" className="mt-0">
                <div className="relative space-y-6">
                  {/* Vertical line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-border rounded-full" />

                  {jobs.map((job, index) => {
                    const descriptions = [];
                    let i = 0;
                    while (true) {
                      const desc = t(`cv.jobs.${job.key}.descriptions.${i}`);
                      if (desc === `cv.jobs.${job.key}.descriptions.${i}`)
                        break;
                      descriptions.push(desc);
                      i++;
                    }

                    const tags =
                      (translations.cv.jobs as any)[job.key]?.tags || [];

                    return (
                      <div key={index} className="relative">
                        {/* Timeline point */}
                        <div className="absolute left-0 top-9 w-[16px] h-[16px] rounded-full bg-foreground border-[3px] border-background z-10" />

                        <div className="bg-card rounded-lg p-6 pl-12 ml-6 border border-border">
                          {/* Header with title and period */}
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                                {t(`cv.jobs.${job.key}.title`)
                                  .split("\n")
                                  .map((line: string, i: number) => (
                                    <span key={i} className="block">
                                      {line}
                                    </span>
                                  ))}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 text-sm">
                                <span className="font-medium text-foreground/80 px-2.5 py-0.5 bg-muted rounded">
                                  {t(`cv.jobs.${job.key}.type`)}
                                </span>
                                <span className="flex items-center gap-1.5 text-muted-foreground">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {t(`cv.jobs.${job.key}.location`)}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded sm:whitespace-nowrap border border-border">
                              <Calendar className="w-3.5 h-3.5" />
                              {t(`cv.jobs.${job.key}.period`)}
                            </div>
                          </div>

                          {/* Description */}
                          <ul className="space-y-2 mb-4">
                            {descriptions.map((desc, descIndex) => (
                              <li
                                key={descIndex}
                                className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                              >
                                <span className="text-foreground/60 flex-shrink-0">
                                  •
                                </span>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: desc.replace(
                                      /<a\s+href="([^"]*)"[^>]*>(.*?)<\/a>/gi,
                                      (
                                        match: string,
                                        href: string,
                                        text: string,
                                      ) => {
                                        return `<a href="${href}" class="underline underline-offset-2" rel="noopener noreferrer" target="_blank">${text}</a>`;
                                      },
                                    ),
                                  }}
                                  className="break-words flex-1"
                                />
                              </li>
                            ))}
                          </ul>

                          {/* Tags */}
                          {tags && tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                              {tags.map((tag: string, tagIndex: number) => (
                                <Badge
                                  key={tagIndex}
                                  variant="secondary"
                                  className="text-xs px-2.5 py-1 font-medium bg-muted"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="formation" className="mt-0">
                <div className="relative space-y-6">
                  {/* Vertical line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-border rounded-full" />

                  {degrees.map((degree, index) => {
                    const descriptions = [];
                    let i = 0;
                    while (true) {
                      const desc = t(
                        `cv.degrees.${degree.key}.descriptions.${i}`,
                      );
                      if (desc === `cv.degrees.${degree.key}.descriptions.${i}`)
                        break;
                      descriptions.push(desc);
                      i++;
                    }

                    const tags =
                      (translations.cv.degrees as any)[degree.key]?.tags || [];

                    return (
                      <div key={index} className="relative">
                        {/* Timeline point */}
                        <div className="absolute left-0 top-9 w-[16px] h-[16px] rounded-full bg-foreground border-[3px] border-background z-10" />

                        <div className="bg-card rounded-lg p-6 pl-12 ml-6 border border-border">
                          {/* Header with title and period */}
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                                {t(`cv.degrees.${degree.key}.title`)}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-3.5 h-3.5" />
                                {t(`cv.degrees.${degree.key}.location`)}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted px-3 py-1.5 rounded sm:whitespace-nowrap border border-border">
                              <Calendar className="w-3.5 h-3.5" />
                              {t(`cv.degrees.${degree.key}.period`)}
                            </div>
                          </div>

                          {/* Description */}
                          <ul className="space-y-2 mb-4">
                            {descriptions.map((desc, descIndex) => (
                              <li
                                key={descIndex}
                                className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                              >
                                <span className="text-foreground/60 mt-1 flex-shrink-0">
                                  •
                                </span>
                                <span className="break-words flex-1">
                                  {desc}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {/* Tags */}
                          {tags && tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                              {tags.map((tag: string, tagIndex: number) => (
                                <Badge
                                  key={tagIndex}
                                  variant="secondary"
                                  className="text-xs px-2.5 py-1 font-medium bg-muted"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>
    </main>
  );
}
