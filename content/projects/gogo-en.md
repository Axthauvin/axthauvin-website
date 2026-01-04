---
title: "GoGo"
description: "A browser extension that allows you to create custom shortcuts to your favorite sites, directly from the address bar."
image: "/projects/gogo/gogo-icon-rectangle.png"
date: 2025-11-08
featured: true
technologies:
  [
    "Javascript",
    "Chrome Extension",
    "Firefox Extension",
    "WebExtension API",
    "Node.js",
  ]
author: ["Axel Thauvin"]
links:
  - type: "github"
    url: "https://github.com/axthauvin/gogo"
  - type: "chrome-store"
    url: "https://chromewebstore.google.com/detail/gogo-%E2%80%93-your-shortcut-engi/paagjphnidjcdcekdhoelkmjhknfgiad"
    label: "Chrome Web Store"
  - type: "firefox-addon"
    url: "https://addons.mozilla.org/fr/firefox/addon/gogo-web-shortcut-tool/"
    label: "Firefox addons"
---

### Searching for Links When in a Company

When I was interning at Société Générale, I discovered an internal tool called GO.
The idea is quite simple: a shortcut system for group applications.
To find different software, you just had to type `go/jira`, `go/git` or `go/mail`, and you were immediately redirected to the right service.
It's not a complicated tool, but after a few weeks, it's impossible to do without.

So I wondered if I could also recode this kind of system?

### Why Did It Work for Them?

Their tool worked thanks to a simple but very clever mechanism: internal DNS servers.
In companies, DNS (Domain Name System) is often managed by the company.
It's what translates domain names into IP addresses.

![DNS image](/projects/gogo/dns.jpeg)

For example `google.com` → `142.250.75.14`.

In Société Générale's case, they had configured a special shortcut:
when someone typed `go/jira`, the internal DNS understood that the `go/` prefix should point to an internal server, which then redirected the user to the right tool (jira.sg, git.sg, etc.).
It's simple, fast, and above all: it works across the entire company network!

### An Already Existing Behavior (But Hidden)

Little anecdote: Chrome, Edge, and Firefox already have a somewhat similar behavior.
When you type a keyword like `docs` in the address bar, the browser first tries to resolve it as a URL (`http://docs/`) before doing a Google search.
This is the logic I wanted to exploit: intercept this moment, understand what the user is typing (`go gmail`), and redirect them to the right site.

But for that, I needed a clean, portable, and simple-to-install entry point.
And that's where the idea became clear:

> Create a Chrome (and Firefox) extension that reproduces this behavior, without a server and without DNS (and yes, it simplifies life anyway with extensions).

## GoGo

This is how GoGo was born (I thought the name was funny so it stayed that way)
A very simple extension that allows you to create your own shortcuts, directly in a browser.
No more need for internal servers or system administrators.

- `go gmail` → opens Gmail
- `go yt` → YouTube
- `go gh` → your GitHub profile

![GoGo create](/projects/gogo/create.png)

![GoGo aliases](/projects/gogo/aliases.png)

---

### Tech & Stack

I wanted a **lightweight** extension, **multi-browser** (Chrome and Firefox), and especially **without backend**.
Here are the main technical choices:

- **WebExtension API** to intercept address bar requests (`tabs`, `webNavigation`)
- **`chrome.storage` / `browser.storage`** to store aliases locally
- A small **Node.js build script** (`build.js`) to generate both distributions at once:

  ```bash
  node build.js all
  ```

No TypeScript for now, I'll see if the extension gets bigger if it's worth migrating.

---

### How the Extension Works

The extension defines a **reserved keyword** (`go`) in the address bar.
When the user types `go gmail`:

1. The browser intercepts the request via the `webNavigation` API.
2. The extension extracts the `gmail` part.
3. It searches if a `gmail` alias is defined in local storage.
4. If yes, it immediately opens the corresponding URL in the current tab.

```javascript
browser.webNavigation.onBeforeNavigate.addListener((details) => {
  const input = extractAlias(details.url);
  if (aliases[input]) {
    browser.tabs.update(details.tabId, { url: aliases[input] });
  }
});
```

That's literally it.

---

### Privacy

GoGo works **entirely offline**.
Aliases are saved locally, thanks to the `chrome.storage.local` API (for Chrome) or `browser.storage.local` (for Firefox).

---

### Why This Project

I like to give myself little challenges, and see if I can recode small tools that can be useful daily.

It's also a nod to what I discovered at Société Générale: sometimes, **a good company idea** just deserves to be adapted for the general public.
