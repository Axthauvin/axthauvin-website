#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function createProject() {
  console.log("🚀 Create New Project\n");

  // Get project information
  const title = await question("Project title: ");
  if (!title.trim()) {
    console.error("❌ Project title is required");
    rl.close();
    process.exit(1);
  }

  const description = await question("Project description: ");
  const technologies = await question("Technologies (comma-separated): ");
  const featured = await question("Featured project? (y/n): ");
  const github = await question("GitHub URL (optional): ");
  const demo = await question("Demo URL (optional): ");

  rl.close();

  // Generate slug from title
  const slug = slugify(title);
  const projectSlug = `${slug}-fr`;

  console.log(`\n📝 Creating project: ${projectSlug}`);

  // Paths
  const contentDir = path.join(__dirname, "..", "content", "projects");
  const publicDir = path.join(__dirname, "..", "public", "projects");

  const markdownPath = path.join(contentDir, `${projectSlug}.md`);
  const projectImagesDir = path.join(publicDir, slug);

  // Check if project already exists
  if (fs.existsSync(markdownPath)) {
    console.error(`❌ Project "${projectSlug}" already exists!`);
    process.exit(1);
  }

  // Parse technologies
  const techArray = technologies
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  // Create markdown content
  const today = new Date().toISOString();
  const markdownContent = `---
title: "${title}"
description: "${description || "Description du projet"}"
image: "/projects/${slug}/icon-rectangle.png"
date: ${today}
featured: ${featured.toLowerCase() === "y" ? "true" : "false"}
technologies:
  [
${techArray.map((tech) => `    "${tech}",`).join("\n")}
  ]
author: ["Axel Thauvin"]
${
  github ? `github: "${github}"` : '#github: "https://github.com/username/repo"'
}
${demo ? `demo: "${demo}"` : '#demo: "https://demo-url.com"'}
---

## Introduction

Décrivez votre projet ici...

## Contexte

Expliquez le contexte et la motivation derrière ce projet.

## Fonctionnalités

- Fonctionnalité 1
- Fonctionnalité 2
- Fonctionnalité 3

## Technologies utilisées

${techArray.map((tech) => `- **${tech}**`).join("\n")}

## Défis et solutions

Expliquez les défis rencontrés et comment vous les avez résolus.

## Résultat

Décrivez le résultat final et ce que vous avez appris.

## Conclusion

Concluez sur votre expérience avec ce projet.
`;

  // Create directories
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  if (!fs.existsSync(projectImagesDir)) {
    fs.mkdirSync(projectImagesDir, { recursive: true });
  }

  // Write markdown file
  fs.writeFileSync(markdownPath, markdownContent, "utf8");

  // Create placeholder README in images folder
  const readmePath = path.join(projectImagesDir, "README.md");
  fs.writeFileSync(
    readmePath,
    `# ${title} - Images\n\nPlace your project images here.\n\nRequired images:\n- \`icon-rectangle.png\` - Main project icon (recommended size: 1200x630px)\n`,
    "utf8"
  );

  console.log("\n✅ Project created successfully!\n");
  console.log(`📄 Markdown file: ${markdownPath}`);
  console.log(`📁 Images folder: ${projectImagesDir}`);
  console.log(`\n📋 Next steps:`);
  console.log(`1. Edit ${projectSlug}.md to add your content`);
  console.log(`2. Add images to public/projects/${slug}/`);
  console.log(
    `3. Make sure to include icon-rectangle.png for the project card`
  );
  console.log(
    "\n💡 Tip: You can use screenshots, diagrams, or any visual content to enhance your project page."
  );
}

createProject().catch((err) => {
  console.error("❌ Error:", err);
  rl.close();
  process.exit(1);
});
