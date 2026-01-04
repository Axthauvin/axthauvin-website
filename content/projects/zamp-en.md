---
title: "ZAMP"
description: "Application that installs and manages a local development environment with Apache, MySQL, and PHP in one click. Automated service manipulation to simplify user experience."
date: 2024-11-10T13:24:50+02:00
featured: false
image: "/projects/zamp/zamp-icon.png"
technologies: ["Electron", "HTML", "CSS", "Apache", "MySQL", "PHP"]
author: ["Axel Thauvin"]
draft: false
links:
  - type: "github"
    url: "https://github.com/axthauvin/zamp"
  - type: "download"
    url: "https://github.com/axthauvin/zamp/releases"
    label: "Download ZAMP"
---

## The Story Behind ZAMP

When I started web development and doing PHP, I always used [UwAmp](https://www.uwamp.com/en/). It's lightweight, practical, and does the job.  
But let's be honest: **the interface is starting to show its age**, and you can feel the project hasn't really evolved in a while. After juggling between my projects, I wanted something **more modern, more fluid**, and especially, **simpler to manage daily**.

![UwAmp image](/projects/zamp/uwamp.png)

> This is what UwAmp looks like!

This is how **ZAMP** was born! A nod to both _WAMP_ and this desire to start from scratch with a more intuitive approach. The idea was, without knowing anything about Apache configuration, to be able to create an application I could use for web development.

![Zamp with loaded projects](/projects/zamp/ZAMP-interface.png)

---

## Why ZAMP?

The goal was simple: **recreate the UwAmp experience**, but in a **modern and automated** version.  
ZAMP installs and manages a complete local environment (Apache, MySQL, PHP) in one click, without having to dive into configuration files or open a console.

Built with [Electron](https://www.electronjs.org/), the program is based on a clear and streamlined interface, designed for developers who just want to **code**, not spend their time configuring their environment.

---

## What ZAMP Changes

One of the points that always frustrated me with classic tools is project management.  
Often, everything is locked in a single `www` folder, and you constantly have to move or copy your files.

With **ZAMP**, I wanted to break this constraint: The application **automatically** modifies Apache's configuration to point to any project folder.

Result: you can switch **from one project to another with one click**, without moving anything.  
It's fluid, fast, and especially much more natural.

---

## An Integrated PHP Extension Manager

Another idea I had in mind from the start: make PHP configuration **visual**.  
No more lines to comment in `php.ini`, ZAMP offers an interface with **checkboxes** to enable or disable PHP extensions.

![PHP Configuration](/projects/zamp/PHPConfig.png)

---

## An All-in-One Stack, Hassle-Free

ZAMP groups Apache, MySQL (via MariaDB), and PHP, with a fully automated management system.  
Everything can be **started, stopped, or reconfigured** from the interface.

Among the main features:

- **No manual configuration**: install, launch, develop.
- **Project management**: switch from one project to another without touching files.
- **PHP version control**: download and change versions easily.
- **SQL launcher**: start or stop MariaDB with one click.

---

## Why a Fish? 🐟

When I first shared ZAMP on [Reddit](https://www.reddit.com/r/opensource/comments/1d0synm/comment/l5pyg6k/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button), a user commented that my project looked a bit "**fishy**" (suspicious).  
It made me laugh, and rather than take it badly, I decided to make it **the project's symbol**.

Since then, **ZAMP's logo is a fish**.  
It's become a sort of self-deprecating statement: a little nod to that remark, but also to the open source spirit. I think it's important to **not take yourself too seriously**, even when developing technical tools.

---

## Installation

ZAMP is currently only available on **Windows**.

### Windows

1. Download the latest version from [GitHub](https://github.com/Axthauvin/ZAMP/releases/).
2. Simply install the program.
3. Launch **ZAMP** and start developing!

---

## In Summary

ZAMP is my way of **reconciling simplicity and modernity** in local development.  
A tool designed for developers who like to understand what they're doing, but who don't want to spend 30 minutes launching Apache and MariaDB without it crashing (because yes, it often happens with uWamp 👀).

The project is **open source** and still in development, any contribution is welcome!  
👉 [See the project on GitHub](https://github.com/axthauvin/zamp)
