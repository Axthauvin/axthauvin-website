# Scripts

This folder contains utility scripts for the project.

## create-project.js

Creates a new project with the proper file structure and default content.

### Usage

Run the script using npm:

```bash
npm run new-project
```

Or directly with node:

```bash
node scripts/create-project.js
```

### What it does

The script will prompt you for:

- **Project title**: The display name of your project
- **Description**: A short description of the project
- **Technologies**: Comma-separated list of technologies used
- **Featured**: Whether the project should be featured on the homepage (y/n)
- **GitHub URL**: Optional link to the GitHub repository
- **Demo URL**: Optional link to a live demo

Then it will:

1. Generate a slugified name from the title (e.g., "My Project" → "my-project-fr")
2. Create a markdown file in `content/projects/` with frontmatter and default sections
3. Create an images folder in `public/projects/` for the project
4. Add a README in the images folder with instructions

### Example

```
🚀 Create New Project

Project title: Chess Analyzer
Project description: An extension to analyze chess games
Technologies (comma-separated): TypeScript, Chrome Extension, Stockfish
Featured project? (y/n): y
GitHub URL (optional): https://github.com/username/chess-analyzer
Demo URL (optional):

📝 Creating project: chess-analyzer-fr

✅ Project created successfully!

📄 Markdown file: content/projects/chess-analyzer-fr.md
📁 Images folder: public/projects/chess-analyzer/

📋 Next steps:
1. Edit chess-analyzer-fr.md to add your content
2. Add images to public/projects/chess-analyzer/
3. Make sure to include icon-rectangle.png for the project card
```

### File Structure Created

```
content/projects/
  └── [project-slug]-fr.md          # Project markdown file

public/projects/
  └── [project-slug]/
      ├── README.md                  # Instructions for images
      └── icon-rectangle.png         # (you need to add this)
```

### Notes

- The script automatically appends `-fr` to the slug for French projects
- The markdown file includes default sections you can customize
- Don't forget to add the `icon-rectangle.png` image (recommended size: 1200x630px)
