import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type LinkType =
  | "github"
  | "demo"
  | "website"
  | "chrome-store"
  | "firefox-addon"
  | "download"
  | "documentation"
  | "npm"
  | "other";

export interface ProjectLink {
  type: LinkType;
  url: string;
  label?: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  featured?: boolean;
  technologies: string[];
  links?: ProjectLink[];
  // Deprecated fields (kept for backward compatibility)
  github?: string;
  demo?: string;
  content: string;
  accentColor?: string;
}

const projectsDirectory = path.join(process.cwd(), "content/projects");

function normalizeImagePath(img?: string): string {
  if (!img) return "";
  if (
    img.startsWith("http://") ||
    img.startsWith("https://") ||
    img.startsWith("data:")
  ) {
    return img;
  }
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

      // Support for new links format
      let links: ProjectLink[] = [];

      if (data.links && Array.isArray(data.links)) {
        links = data.links;
      } else {
        // Backward compatibility: convert old github/demo fields to new format
        if (data.github) {
          links.push({ type: "github", url: data.github });
        }
        if (data.demo) {
          links.push({ type: "demo", url: data.demo });
        }
      }

      return {
        slug,
        title: data.title,
        description: data.description,
        image: normalizeImagePath(data.image),
        date: data.date,
        featured: data.featured || false,
        technologies: data.technologies || [],
        links,
        github: data.github, // Keep for backward compatibility
        demo: data.demo, // Keep for backward compatibility
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

    // Support for new links format
    let links: ProjectLink[] = [];

    if (data.links && Array.isArray(data.links)) {
      links = data.links;
    } else {
      // Backward compatibility: convert old github/demo fields to new format
      if (data.github) {
        links.push({ type: "github", url: data.github });
      }
      if (data.demo) {
        links.push({ type: "demo", url: data.demo });
      }
    }

    return {
      slug,
      title: data.title,
      description: data.description,
      image: normalizeImagePath(data.image),
      date: data.date,
      featured: data.featured || false,
      technologies: data.technologies || [],
      links,
      github: data.github, // Keep for backward compatibility
      demo: data.demo, // Keep for backward compatibility
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
