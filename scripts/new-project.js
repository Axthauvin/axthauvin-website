#!/usr/bin/env node

/**
 * Project Generator Script
 *
 * This script automates the creation of new project entries for the portfolio website.
 * It creates both the markdown content file and the corresponding images folder.
 *
 * Usage:
 *   npm run new-project
 *   OR
 *   node scripts/create-project.js
 *
 * The script will interactively prompt for:
 *   - Project title (required)
 *   - Description
 *   - Technologies (comma-separated)
 *   - Featured status (y/n)
 *   - GitHub URL (optional)
 *   - Demo URL (optional)
 *
 * Output:
 *   - content/projects/[slug]-fr.md - Project markdown file
 *   - public/projects/[slug]/ - Images directory
 *
 * Example:
 *   Title: "Chess Analyzer"
 *   Creates:
 *     - content/projects/chess-analyzer-fr.md
 *     - public/projects/chess-analyzer/
 */

// The actual implementation is in create-project.js
console.log("Please run: npm run new-project");
console.log("Or: node scripts/create-project.js");
