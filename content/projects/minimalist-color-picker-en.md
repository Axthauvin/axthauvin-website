---
title: "Minimalist Color Picker"
description: "A small Rust application to pick colors anywhere on your computer."
image: "/projects/color-picker/icon.png"
date: 2026-01-30
featured: false
technologies: ["TypeScript", "Tauri", "React", "Rust"]
links:
  - type: "github"
    url: "https://github.com/axthauvin/minimalist-color-picker/releases"
    label: "View source code"
  - type: "download"
    url: "https://github.com/axthauvin/minimalist-color-picker/releases"
    label: "Download the application"

author: ["Axel Thauvin"]
---

Since most of my recent projects use web technologies, I spend a lot of time working with color palettes. I used browser extensions for a long time, but since migrating to Firefox, none of them fully satisfied me. Their major limitation remained frustrating, as it's impossible to 'go outside' the browser. Yet I often need to pick colors from images on my computer, or something easily accessible with a global keyboard shortcut.

![App interface](/projects/color-picker/main-interface.png)

From this observation, I had the idea to **learn Rust by developing my own desktop solution over a weekend**.

> Spoiler: it took me more than a weekend

## Choosing the stack: Tauri vs Electron

As I love experimenting with new technologies, I abandoned Electron, which I had [already used on ZAMP](/projects/ZAMP), in favor of **[Tauri](https://tauri.app/)**. It's a framework that had intrigued me for a while because it promises the best of both worlds, using the flexibility of the web (HTML/CSS/JS) for the interface and the raw power of **Rust** for the native backend.

The results speak for themselves. Where an Electron app bundles a complete browser (Chromium) and weighs heavily, Tauri simply uses the "webview" already present on the operating system. You get a tiny binary and ridiculous memory consumption while keeping the development comfort offered by React and Vite.

![Electron meme](https://i.redd.it/3muw8e1qpnzz.jpg)

> I couldn't resist

## How to capture the color under the cursor? (it's not that simple)

While retrieving the color under the cursor seems trivial in theory, the technical reality is much more complicated. You need to be able to locate the cursor at time T, identify which screen it's on (in a multi-monitor setup), capture the corresponding area and extract the pixel value, all in a few milliseconds to keep the interface fluid.

My first approach was to capture the entire screen to read a pixel from it. This was a mistake, as in multi-screen setups, the latency became noticeable. So I changed my strategy to a more targeted one, by having Rust capture only a tiny zone around the cursor, a square of just a few dozen pixels.

This optimization solved two problems at once. On one hand, the performance became excellent, and on the other hand, this "buffer zone" allowed me to very easily implement the **magnifier**. The image you see in the interface is ultimately just a raw zoom on this small capture, which makes pixel-perfect aiming much more intuitive.

![App magnifier](/projects/color-picker/magnifier.png)

One of the development challenges was also managing coordinates on Windows. Between screens positioned at negative coordinates and different scaling factors (DPI scaling, for example one screen at 100% next to another at 150%), position calculations require particular attention. Fortunately, the Rust community is very active, and I was able to rely on existing crates to handle those.

## An experience designed for workflow

I wanted a tool that completely disappears when I'm not using it. I designed the application to live in the system tray (Windows tray) and only respond when I invoke it via a shortcut. The idea is to be able to invoke the eyedropper with a simple `Ctrl+Shift+C` without ever having to look for the app icon.

![Shortcuts menu](/projects/color-picker/shortcuts.png)

Once the color is captured, the tool automatically handles what I found tedious to do manually. It converts the shade into standard formats (HEX, RGB for CSS, HSL for adjustments) and saves it in a local history. This allows you to go back to a color selected ten minutes earlier or compare two shades without having to redo the operation.

![Color formats](/projects/color-picker/colors-formats.png)

![Color history](/projects/color-picker/history.png)

## Conclusion

This project was the perfect excuse to write my first lines of Rust with a concrete goal behind it. It's a verbose and demanding language, but one that offers a very satisfying sense of robustness once the compiler stops complaining. I made a color picker that probably already existed, but more importantly I understood how Tauri works!
