import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import Header from "@/components/Header";
import { remark } from "remark";
import html from "remark-html";
import ProjectPageClient from "@/components/ProjectPageClient";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects("en");
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "en");

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.title} - Axel Thauvin`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  // Load both language versions
  const projectEn = getProjectBySlug(slug, "en");
  const projectFr = getProjectBySlug(slug, "fr");

  if (!projectEn && !projectFr) {
    notFound();
  }

  // Convert markdown to HTML for both versions
  const contentHtmlEn = projectEn
    ? (await remark().use(html).process(projectEn.content)).toString()
    : "";
  const contentHtmlFr = projectFr
    ? (await remark().use(html).process(projectFr.content)).toString()
    : "";

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <ProjectPageClient
          projectEn={projectEn}
          projectFr={projectFr}
          contentHtmlEn={contentHtmlEn}
          contentHtmlFr={contentHtmlFr}
        />
      </main>
    </>
  );
}
