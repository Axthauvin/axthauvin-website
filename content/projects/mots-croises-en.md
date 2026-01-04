---
title: "Crossword Puzzle Program"
description: "Solve crossword grids, find words by pattern, and automatically cross multiple words with a universal solver."
date: 2021-07-23T18:00:00+02:00
featured: false
image: "projects/mots-croises/mots-croises-preview.png"
technologies: ["HTML", "CSS", "JavaScript"]
author: ["Axel Thauvin"]
draft: false
accentColor: "#3b82f6"
links:
  - type: "github"
    url: "https://github.com/programmemotscroises/programmemotscroises.github.io"
  - type: "demo"
    url: "https://programmemotscroises.github.io/"
    label: "Try the solver"
---

## Why a Crossword Puzzle Program?

It all started with my grandparents.  
They love doing **crossword puzzles**, it's their little weekend ritual.  
I often tried to help them find missing words, even though, at the time, I was far from being an expert.

Sometimes, certain definitions were **really too complicated**, and they would ask me to "take a look on the Internet"... in other words, to **help them cheat a little**

So, in my junior year of high school, I wanted to help them in my own way, by creating **a tool capable of finding words from a pattern**

This is how **the Crossword Puzzle Program** was born, one of my **first real personal projects**, directly inspired by my CS classes (Computer Science and Digital Sciences), where I had discovered concepts like **Hamming distance**.

---

### Word Search by Pattern

On the home page, the user enters a pattern like `*A*E*`, with custom wildcards:

- `*` → any letter
- `/` → a vowel
- `#` → a consonant

The site instantly displays **all matching words**, sorted by proximity (exact, one letter different, etc.), with **small colored badges** to distinguish them.  
On mobile, help buttons allow easy insertion of these special characters. (Even in junior year I was already thinking about responsiveness!)

Each word found is clickable and links directly to its definition on **Larousse**.

![Search illustration](/projects/mots-croises/recherche.png)

---

### Crossing Two Words

A dedicated page allows you to **cross two words according to patterns** and choose the **exact crossing box**.  
The experience unfolds in three simple steps:

1. Enter the two patterns
2. Select the crossing point (in a clickable mini-grid)
3. Visualize all valid combinations directly in the grid

Each result is interactive: a click is enough to display the chosen crossing.  
It's a feature my grandparents like, since it allows eliminating dozens of possibilities at once!

---

### Complete Grid Resolution

In junior year, this was **the piece I hadn't managed to finish**: the complete grid solver.  
Four years later, I decided to **revisit the project** to give it a facelift... and this time, I finally managed to implement the complete algorithm!

The user can create a **custom grid** (from 5 to 25 squares), enter a few letters, wildcards or vowels/consonants, then let the **universal solver** find all possible solutions.

The system:

- automatically detects all horizontal and vertical words,
- uses a **backtracking algorithm** to explore valid combinations,
- and displays solutions in a **clear and colored 2D grid**.

---

## Technical Architecture

At the time, I simply used **pure HTML, CSS, and JavaScript** (I didn't even know TypeScript yet).  
I didn't have an SQL database, so I wrote a **Python scraper** to extract the complete list of French words from a Scrabble site.

The words are then saved **in the browser's localStorage**, which makes the application **usable offline**, and completely independent of a server.  
It was my first real approach to **local storage and algorithmic optimization**.

---

## Good Memories?

This project, born from a small family idea, quickly became **an experimental ground for algorithms and design**.  
And even today, my grandparents still use it to solve their grids or, let's be honest, **to cheat more effectively**

It's one of those projects that remind me why I love coding: starting from a simple, almost anecdotal need, and making something **useful, elegant, and fun**.

(By the way, it's one of the first projects where I was able to experiment with Git. Looking at the history today, I realize I wasn't really making commits... I was just uploading files)
