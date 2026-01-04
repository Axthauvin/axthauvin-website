---
title: "Hide Text in Text"
description: "How I hid text within text. By manipulating text bits, I managed to hide text within text using invisible characters."
date: 2021-11-04T22:35:57Z
featured: false
image: "projects/cacher-du-texte-dans-du-texte/icon.png"
technologies: ["HTML", "CSS", "JavaScript"]
author: ["Axel Thauvin"]
links:
  - type: "demo"
    url: "https://cacherdutexte.github.io"
    label: "Try the demo"
  - type: "github"
    url: "https://github.com/cacherdutexte/cacherdutexte.github.io"
---

> The project is currently hosted at [https://cacherdutexte.github.io](https://cacherdutexte.github.io)

## How I Hid Text Within Text

This is a way to hide text within text by manipulating bits.
Imagine the string:

```text
Hacker
```

That I want to hide in the message:

```text
Hello, I'm Axel Thauvin
```

- First, we retrieve the **decimal representation in the UTF-8 table** of each character in the `Hacker` string.

  _Here's a table showing the decimal representation of the first 127 characters (also called ASCII table):_
  ![ASCII table](https://github.com/Axthauvin/cacher-du-texte-dans-du-texte/blob/main/images/UTF8-TABLE.png?raw=true)

For example, let's take the character `H`.
Here, its decimal representation is **_72_** (base 10).

- Then we'll convert this number to base 6 on 4 'bits'

  ## Why?

  If we encode the letters in base 6 on 4 bits, we'll have a maximum representation of `5555` -> which is 6⁴ -> `1296`:
  _the maximum value we can exploit in this table_

  In fact, we have 5 **invisible characters** that will correspond to the digits of these bits, which we'll _hide_ in our text.

  - _For 0 there is no hidden character_
  - _For 1 it's the unicode character `\u200C`_
  - _For 2 it's the unicode character `\u200D`_
  - _For 3 it's the unicode character `\u200E`_
  - _For 4 it's the unicode character `\u200F`_
  - _For 5 it's the unicode character `\u034F`_

  ## Example with `H`

  Here the decimal representation of `H` is **_72_**.
  Its representation in _base 6 on 4 bits_ is `0200`.

  So I will:

  - Not add a character for the 1st bit (because it equals 0)
  - Add the character `\u200D` for the 2nd bit (because it equals 2)
  - Not add a character for the 3rd bit (because it equals 0)
  - Not add a character for the 4th bit (because it equals 0)

  **_Let's take the initial string again_**
  I have `Hello, I'm Axel Thauvin`.
  So I'll write: **He`\u200D`ll** just for the H

  **_And I do the same with all the characters of `Hacker`._**
  Which gives me:
  `He‍llo‍,‏ ‌I‍'‏m‎ A‍x͏e͏l ‍T‏h͏auvin` (generated with my program, you can try it on my site)

  **_Here's the result:_**
  ![GIF image](https://github.com/Axthauvin/cacher-du-texte-dans-du-texte/raw/main/images/VideoIllustration.gif)
