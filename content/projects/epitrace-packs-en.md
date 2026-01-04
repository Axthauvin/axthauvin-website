---
title: "EPITRACE Packs Extension"
description: "Transforms viewing your code results into a fun 'pack opening' experience."
date: 2025-03-03
image: "/projects/epitrace/logo.png"
technologies: ["HTML", "CSS", "JavaScript", "Firefox XPI", "CI-CD"]
author: ["Axel Thauvin"]
links:
  - type: "github"
    url: "https://github.com/Axthauvin/epitrace-packs"
  - type: "firefox-addon"
    url: "https://github.com/Axthauvin/epitrace-packs/releases"
    label: "Download for Firefox"
  - type: "chrome-store"
    url: "https://chromewebstore.google.com/detail/epitrace-packs/nmjfkfbpiimebpnkonnanjiihgkcnoaj"
    label: "Chrome Web Store"
---

### An extension that transforms code results into a fun experience

**EPITRACE Packs Extension** is a web extension I developed to improve and make programming students' lives more fun. The idea is to take the often monotonous or stressful moment of checking results and transform it into a **"pack opening"** game.

#### What is the "Moulinette" and "Traces"

For EPITA students, like in many computer science schools, code project evaluation is done through an automatic grading system called the **"Moulinette"**.

- **The "Moulinette"**: It's the tool that takes submitted code and runs a series of tests to verify its validity and performance.
- **The "Traces"**: This is the **final result** of this grading, expressed as a success percentage. This percentage represents how well the code passed the moulinette tests. The goal is to get the best score, aiming for 100%!

![Traces illustration](/projects/epitrace/traces.png)

_Preview of EPITRACE traces without the extension - standard interface showing grading results_

---

## Main Features: Results Gamification

The extension transforms reading these "Traces" (percentages) into an engaging moment:

- **Open traces like FIFA packs**: Instead of displaying the percentage immediately, the extension triggers a **"pack opening"** animation (similar to collectible card games or loot boxes), revealing the success percentage with a surprise visual effect.
- **Flex your successes**: Perfect or very high percentages trigger special animations (an "icon pack"), giving students the ideal way to celebrate and show their success to friends.

![Demo image](https://github.com/Axthauvin/epitrace-packs/raw/main/images_github/illustration.gif)

---

## Installation

The extension is available directly on GitHub.
👉 [See releases on GitHub](https://github.com/Axthauvin/epitrace-packs/releases) and follow the instructions.

⚠️ **Warning:** The extension is an `.xpi` file designed for **Firefox**. Files are generated automatically via CI/CD. Remember to check and adapt Firefox configuration (`about:config`) if necessary to allow installation of unofficially published extensions.

---

## Contributing

EPITRACE Packs is an _open source_ project!

Feel free to open [an _issue_ on the GitHub repository](https://github.com/Axthauvin/epitrace-packs/issues/new). Your feedback is valuable!

This project is distributed under the **MIT** license.
You can consult the LICENSE file for more details.

Any questions or feedback?
**[axel.thauvin@epita.fr](mailto:axel.thauvin@epita.fr)**
