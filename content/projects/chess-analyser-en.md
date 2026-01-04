---
title: "Chess.com Game Analyzer"
description: "This extension allows you to analyze games directly on Chess.com using Stockfish 17 lite and my move classification algorithm."
image: "/projects/chess-analyser/chess-analyser-icon-rectangle.png"
date: 2025-05-25T21:18:50+02:00
featured: true
technologies:
  [
    "TypeScript",
    "Vite",
    "Stockfish.js",
    "WebAssembly",
    "Chrome Extension",
    "Firefox Extension",
  ]

author: ["Axel Thauvin"]
---

> For legal reasons, I cannot publish or open source the source code of this extension. However, the project remains documented here (screenshots, technical explanations, and demonstrations), but the code and releases will remain private.

When I got back into chess, I quickly became addicted to the analysis tool offered by [chess.com](https://www.chess.com/).
It provides precise evaluations of moves played, visualizes the best moves, and helps improve effectively. But this service is paid: you have to pay around €17 per month to access it.

![Analyze](https://images.chesscomfiles.com/uploads/v1/article/30337.d5f1d2b8.668x375o.ee42794e9138@2x.png)

Rather than subscribing, I set myself a personal challenge: **recreate these features myself, by developing an open-source Chrome extension, capable of analyzing games in real-time using Stockfish, and offering elegant visualization directly integrated into the chess.com interface**.

This project quickly took on a scope I wouldn't have imagined at the start. It eventually became **my first real complete project made in TypeScript**. It's also an excellent technical experimentation ground, particularly around communication with a UCI engine like Stockfish and developing custom chess game analysis algorithms.

## Tech & Stack

This project is a Chrome/Firefox extension that I developed in [TypeScript](https://www.typescriptlang.org/) with [Vite](https://vite.dev/) for packaging: a modern stack, fast to reload, very pleasant for web extension development.

It embeds a lightweight version of the Stockfish 17 engine (Lite), directly in the browser, allowing evaluations to run locally, **without depending on an external API**.

![Presentation gif](/projects/chess-analyser/presentation.gif)

## How the Extension Works

The extension automatically detects moves played in a real-time game on Chess.com, integrating directly into the website's interface. It observes the evolution of the board position move by move, then queries **[Stockfish](https://stockfishchess.org/)** locally to extract a precise evaluation.

### Retrieving the Board State

At each move played, the extension intercepts the [FEN (Forsyth-Edwards Notation)](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation) directly from the chess.com DOM. This string encodes the piece arrangement, the turn (whether it's white or black to move), castling rights, en passant captures, etc.

```swift
r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 4
```

From this FEN, the extension uses a JavaScript interface to send the position to Stockfish via a `Web Worker` process running the engine locally (thanks to the WebAssembly version of Stockfish, [stockfish.js](https://github.com/nmrugg/stockfish.js)).

### Analysis by Stockfish

Stockfish receives the FEN and generates a positional evaluation. The extension executes the following commands:

```javascript
worker.postMessage("uci");
worker.postMessage("position fen <FEN>");
worker.postMessage("eval");
```

The `eval` command returns structured text output, which the extension analyzes line by line. For example:

```text
Classical evaluation   -0.08 (white side)
Final evaluation       -0.08 (white side)
```

### Detecting the Best Moves

The extension then queries Stockfish to get the best moves to play from the current position:

```javascript
worker.postMessage("go depth 16");
```

It then retrieves the engine's principal variation (PV) lines:

```bash
info depth 15 score cp -8 pv e2e4 e7e5 g1f3 ...
```

Each move is evaluated in centipawns (1/100th of a pawn), which is then converted to estimated win percentage using a classic logistic function:

```js
winrate = 100 / (1 + Math.exp(-eval * 0.004));
```

It can thus compare the winrate before and after the player's move, to identify mistakes, inaccuracies, or perfect moves.

## My Move Classification Algorithm

One of the notable features of the extension is that it doesn't rely on any external library to classify moves (Best Move, Brilliant Move, Mistake, etc.). I designed a completely custom classification algorithm, designed to be both simple, transparent, and customizable.

![Move classification](/projects/chess-analyser/chess-classifications.png)

The main criterion used is the variation in win percentage between two successive positions. If a move significantly improves the chances of winning or, conversely, causes them to drop dramatically, it is classified accordingly. But this variation is not analyzed alone.

The algorithm also takes into account the type of piece played, or even sacrificed. A queen sacrifice, for example, won't have the same impact as a simple pawn exchange, even if the evaluation variation is identical. This allows better reflection of the strategic or tactical value of the move.

![Brilliant move!!](/projects/chess-analyser/brillant-move.png)

> Here for example, the move is brilliant because if the opponent takes my bishop (which I therefore sacrificed), I can **force checkmate**!

The context of the move is also taken into account: is it a forced move, a logical sequence, an imminent mate, or an unexpected turnaround? The algorithm dynamically adapts its evaluation thresholds based on the situation, using a formula with adjustable thresholds according to the previous evaluation.

Finally, certain specific patterns are recognized: brilliant sacrifices or missed mates can trigger special classifications like "Brilliant", "Miss" or "Forced". This gives the analysis a finer and more human dimension, beyond simple numbers.

![Blunder??](/projects/chess-analyser/blunder.png)

> Here, I gave away my queen in 1 move due to time pressure, hence the 'Blunder' classification...

## Integrating with the chess.com Interface

The user interface was designed to integrate naturally with the Chess.com aesthetic, without disrupting the gaming experience. The extension overlays information subtly, but clearly and immediately. Moves played are enriched by a **system of colored arrows drawn directly on the board** (similar to those on the original site).

![Colored arrows](/projects/chess-analyser/arrows.png)

Added to this are discreet icons placed next to moves in the notation, which adopt the Chess.com style (stars, exclamation points, etc.) to quickly identify "Blunders", "Best Moves", "Misses", or even brilliant moves. The goal is to keep a clean but expressive rendering: the player can at a glance visualize the impact of each decision without taking their eyes off the game.

The graphic style is therefore directly inspired by the Chess.com UI, with a strong desire to stay within their visual codes, so that the extension seems almost native to the platform. Everything is designed not to overload, but to enrich the interface.

![Colored arrows](/projects/chess-analyser/recap.png)

> I coded a complete SVG graphics system to display the game's 'momentum' and visualize who's winning at what moment in the game
