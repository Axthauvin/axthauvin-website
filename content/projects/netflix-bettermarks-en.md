---
title: "Netflix BetterMarks, chrome extension"
description: "Chrome extension that displays IMDB, Metacritic, and AlloCiné ratings on Netflix. API manipulation to enhance user experience."
date: 2021-04-22T22:01:06Z
featured: false
image: "projects/netflix-bettermarks/Netflix-icon.png"
technologies: ["HTML", "CSS", "JavaScript"]
author: ["Axel Thauvin"]
draft: false
links:
  - type: "github"
    url: "https://github.com/Axthauvin/Netflix-better-marks"
  - type: "download"
    url: "https://github.com/Axthauvin/Netflix-better-marks/releases"
    label: "Download the extension"
---

## Netflix BetterMarks

[**Download the extension on GitHub 👇🏻**](https://github.com/Axthauvin/Netflix-better-marks/releases)

---

### The Story

**Netflix BetterMarks** is **my very first Chrome extension**.  
At the time, I wanted to make Netflix a bit more "intelligent", or at least, more transparent.  
I know that when I look for a movie or series, I always end up checking its rating on **IMDB**, **Metacritic**, or **AlloCiné**.  
So I thought: _"Why not display them directly on Netflix?"_

The idea was simple, but the implementation was a real challenge: the extension had to **analyze titles displayed on Netflix**, then **call multiple APIs** to retrieve corresponding ratings, all in real-time, without slowing down navigation.

It was my first real project manipulating the DOM of an external site and making multiple APIs communicate together, a small personal victory at the time.

Another important challenge was **retrieving the real name of the movie or series**.  
Netflix sometimes displays localized or modified titles (for example, "Very Bad Trip" instead of the original title, The Hangover), which complicated searching for ratings on different platforms.  
To solve this problem, I had to use the IMDB API to find the original title from the title displayed on Netflix, thus ensuring the accuracy of retrieved ratings.

---

### The Result

The extension automatically added IMDB, Metacritic, and AlloCiné ratings **directly on Netflix thumbnails**, in a small discreet but clearly visible box.  
The goal: help choose what to watch faster, without opening ten tabs.

![Result on Netflix](https://raw.githubusercontent.com/Axthauvin/Netflix-better-marks/main/NetflixBetterMarks-1.png)

A small menu also allowed activating or deactivating different rating sources, to customize the experience:

![Extension menu](https://raw.githubusercontent.com/Axthauvin/Netflix-better-marks/main/NetflixBetterMarks-5.png)

---

### And Today?

The extension **is no longer functional**, mainly because **the sites used for scraping and some APIs have evolved or are now protected**.  
This type of project depends heavily on the ecosystem, and the slightest modification on IMDB or Netflix's side can call everything into question.

Despite this, **Netflix BetterMarks remains a notable project**: it was my first Chrome extension, my first real API integration, and above all the trigger that made me want to create tools to improve the web.

The source code, of course, **no longer meets current standards**! At the time, there was no AI to help, and at **17 years old**, you don't always code very rigorously.

(If you want to see a crime scene, [I invite you to check out the repo](https://github.com/Axthauvin/Netflix-better-marks))
