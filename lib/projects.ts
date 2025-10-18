import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  featured?: boolean;
  technologies: string[];
  github?: string;
  demo?: string;
  content: string;
  accentColor?: string;
}

const projectsDirectory = path.join(process.cwd(), "content/projects");

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const projects = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const slug = name.replace(/\.md$/, "");
      const fullPath = path.join(projectsDirectory, name);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        image: data.image,
        date: data.date,
        featured: data.featured || false,
        technologies: data.technologies || [],
        github: data.github,
        demo: data.demo,
        content,
        accentColor: data.accentColor,
      } as Project;
    });

  return projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getProjectBySlug(slug: string): Project | null {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      description: data.description,
      image: data.image,
      date: data.date,
      featured: data.featured || false,
      technologies: data.technologies || [],
      github: data.github,
      demo: data.demo,
      content,
    } as Project;
  } catch {
    return null;
  }
}

export function getFeaturedProject(): Project | null {
  const projects = getAllProjects();
  return projects.find((project) => project.featured) || projects[0] || null;
}
