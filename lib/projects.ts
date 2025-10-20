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

// Ensure image paths are absolute from the public root
function normalizeImagePath(img?: string): string {
  if (!img) return "";
  // Keep remote or data URLs as-is
  if (
    img.startsWith("http://") ||
    img.startsWith("https://") ||
    img.startsWith("data:")
  ) {
    return img;
  }
  // Ensure leading slash for assets under public/
  return img.startsWith("/") ? img : `/${img}`;
}

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
        image: normalizeImagePath(data.image),
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
      image: normalizeImagePath(data.image),
      date: data.date,
      featured: data.featured || false,
      technologies: data.technologies || [],
      github: data.github,
      demo: data.demo,
      content,
      accentColor: data.accentColor,
    } as Project;
  } catch {
    return null;
  }
}

export function getFeaturedProject(): Project | null {
  const projects = getAllProjects();
  return projects.find((project) => project.featured) || projects[0] || null;
}
