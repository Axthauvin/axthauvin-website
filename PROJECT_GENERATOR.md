# Project Generator Script

A Node.js script to quickly scaffold new projects with proper structure and default content.

## Quick Start

To create a new project, run:

```bash
npm run new-project
```

The script will interactively ask you for:

- Project title
- Description
- Technologies
- Featured status
- GitHub URL (optional)
- Demo URL (optional)

## What Gets Created

### 1. Markdown File

Location: `content/projects/[project-slug]-fr.md`

Contains:

- Frontmatter with metadata (title, description, image path, date, technologies, etc.)
- Default content sections (Introduction, Context, Features, Technologies, Challenges, Result, Conclusion)
- Properly formatted YAML front matter

### 2. Images Folder

Location: `public/projects/[project-slug]/`

Includes:

- A README with instructions
- Ready to receive your project images
- Expecting `icon-rectangle.png` for the project card

## Example Usage

```bash
$ npm run new-project

🚀 Create New Project

Project title: My Awesome App
Project description: A revolutionary application
Technologies (comma-separated): React, Node.js, MongoDB
Featured project? (y/n): y
GitHub URL (optional): https://github.com/myuser/awesome-app
Demo URL (optional): https://awesome-app.com

📝 Creating project: my-awesome-app-fr

✅ Project created successfully!

📄 Markdown file: content/projects/my-awesome-app-fr.md
📁 Images folder: public/projects/my-awesome-app/
```

## After Creation

1. Edit the generated markdown file to add your project content
2. Add images to the images folder (especially `icon-rectangle.png`)
3. Your project will automatically appear in the projects list

## Technical Details

- **Slug generation**: Automatically converts title to URL-friendly format
- **French suffix**: Adds `-fr` suffix for French project pages
- **Image path**: Automatically configured to point to correct folder
- **Date**: Uses ISO 8601 format with current date/time
- **Validation**: Checks if project already exists before creating

---

Made with ❤️ for rapid project scaffolding
