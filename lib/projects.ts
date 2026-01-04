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

export type Locale = "en" | "fr";

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

// Extract base slug from filename (e.g., "gogo-fr" -> "gogo")
function getBaseSlug(filename: string): string {
  const slug = filename.replace(/\.md$/, "");
  // Remove language suffix (-en or -fr)
  return slug.replace(/-(en|fr)$/, "");
}

// Get all unique project base slugs
function getUniqueProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const slugs = new Set<string>();

  fileNames
    .filter((name) => name.endsWith(".md"))
    .forEach((name) => {
      slugs.add(getBaseSlug(name));
    });

  return Array.from(slugs);
}

// Read a project file and parse it
function parseProjectFile(filePath: string, slug: string): Project | null {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
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
      github: data.github,
      demo: data.demo,
      content,
      accentColor: data.accentColor,
    } as Project;
  } catch {
    return null;
  }
}

export function getAllProjects(locale: Locale = "en"): Project[] {
  const slugs = getUniqueProjectSlugs();

  const projects = slugs
    .map((slug) => {
      // Try to find the file with the requested locale
      let filePath = path.join(projectsDirectory, `${slug}-${locale}.md`);

      // Fallback to the other locale if not found
      if (!fs.existsSync(filePath)) {
        const fallbackLocale = locale === "en" ? "fr" : "en";
        filePath = path.join(projectsDirectory, `${slug}-${fallbackLocale}.md`);
      }

      // Last fallback: try without locale suffix (for backward compatibility)
      if (!fs.existsSync(filePath)) {
        filePath = path.join(projectsDirectory, `${slug}.md`);
      }

      if (!fs.existsSync(filePath)) {
        return null;
      }

      return parseProjectFile(filePath, slug);
    })
    .filter((project): project is Project => project !== null);

  return projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getProjectBySlug(
  slug: string,
  locale: Locale = "en"
): Project | null {
  try {
    // Try to find the file with the requested locale
    let filePath = path.join(projectsDirectory, `${slug}-${locale}.md`);

    // Fallback to the other locale if not found
    if (!fs.existsSync(filePath)) {
      const fallbackLocale = locale === "en" ? "fr" : "en";
      filePath = path.join(projectsDirectory, `${slug}-${fallbackLocale}.md`);
    }

    // Last fallback: try without locale suffix (for backward compatibility)
    if (!fs.existsSync(filePath)) {
      filePath = path.join(projectsDirectory, `${slug}.md`);
    }

    if (!fs.existsSync(filePath)) {
      return null;
    }

    return parseProjectFile(filePath, slug);
  } catch {
    return null;
  }
}

export function getFeaturedProject(locale: Locale = "en"): Project | null {
  const projects = getAllProjects(locale);
  return projects.find((project) => project.featured) || projects[0] || null;
}
