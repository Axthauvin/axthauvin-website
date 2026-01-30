---
title: "Chess Game & P2P"
description: "Integration of a complete chess game on this portfolio. Battle against AI (Stockfish) or in real-time multiplayer (P2P)."
date: 2026-01-24T14:00:00+02:00
featured: true
image: "projects/p2p-chess/icon.png"
technologies: ["React", "JavaScript", "Firebase", "Stockfish.js", "WebSockets"]
hidden: true
author: ["Axel Thauvin"]
---

After spending quite some time understanding how **Stockfish** works for my [Chess.com game analyzer project](/projects/chess-analyser), I realized that something was missing on my portfolio. Analyzing is good, but playing is better! So I decided to integrate a complete chess board directly on the site, allowing visitors to start a quick game against an AI (Stockfish) or challenge a friend in real-time via a link, all without leaving the browser. _(a bit useless, but very fun to code!)_

## Stockfish in the Browser

The first step was to reuse what I had already done: run **Stockfish** (the world's most powerful chess engine) directly in the user's browser. This part was the quickest to set up thanks to my previous experience.

I reused the `Web Workers` principle to run **Stockfish 17 Lite** in the background without blocking the interface. The flow is simple:

1. The player moves a piece.
2. The application sends the FEN (the notation of the board state) to the Stockfish Worker.
3. The engine calculates the best move (with limited depth to not humiliate the player too quickly) and sends it back to the React interface.

In reality, it's even simpler than the Chess.com extension, because here I directly use Stockfish's result as the move played by the AI.

## Multiplayer Mode

This is where it gets interesting. I wanted two people to be able to play against each other in a simple way. The problem in the web world is that to do real-time between two clients, you generally need a server that relays messages.

To achieve this, I needed a way for the two browsers to exchange moves in real-time. I didn't want to set up a heavy backend architecture for this, especially since my current hosting solution didn't allow it.

That's where **Peer to Peer (P2P)** comes into play.

### P2P

![P2P diagram image](https://shareaza.sourceforge.net/w/images/1/1a/Networks.png)

**Peer to Peer** (P2P) is a network protocol in which the two players communicate directly with each other, without going through a central server to manage the game. This is ideal for a chess game where latency must be minimal, but also to avoid having to manage a complex server infrastructure.

### Firebase

![Firebase](https://firebase.google.com/static/images/products/realtime-database/database-2.png)

I opted for **Firebase Realtime Database** as a proxy. Concretely, the database acts as a simple synchronized mailbox:

1. **Player A** creates a game → this writes an entry in the database.
2. **Player B** joins → they subscribe to changes to this entry.
3. When I move a pawn, I send the move to Firebase.
4. Firebase instantly notifies the opponent who sees the pawn move on their screen.

It's a super efficient solution, since I don't have a server to maintain, and the latency is almost imperceptible for a turn-based game like chess.

## Under the Hood: WebRTC & Signaling

The most complex part of WebRTC is that two browsers can't connect directly to each other by magic. They don't know each other's IP address or port, and are often hidden behind routers (NAT).

To solve this, I implemented a **Signaling** mechanism using Firebase Firestore as a matchmaker. Here's how the connection unfolds, step by step:

### 1. Signaling (The Meeting)

This is the phase where the two clients exchange their coordinates via the database.

- **The Offer (Caller):** The game creator generates an "Offer" (SDP) that contains the technical info of their session. They store it in a Firestore document `rooms/{roomId}`.
- **The Answer (Callee):** The second player reads this offer, configures it on their browser, generates an "Answer" and sends it back via Firestore.

### 2. NAT Traversal (ICE Candidates)

In parallel, each browser asks a **STUN** server (I use Google's: `stun:stun1.l.google.com`): _"Hey, what's my public IP?"_

This information is called **ICE Candidates**. As soon as a browser finds one, it sends it to the other via a Firestore subcollection.

### 3. The Data Channel

Once the two browsers have exchanged their offers/answers and found a compatible network path (thanks to the ICE candidates), the direct connection opens!

From this precise moment, **Firebase is no longer used for the game**. I use an `RTCDataChannel` to send moves (e.g., "e2e4") directly from one browser to the other.

> **Why is this cool?** Because the latency is minimal. The chess move doesn't go _Player A → Server → Player B_, but directly _Player A → Player B_.

## Conclusion

This project is kind of the logical continuation of my extension. I was able to reuse my knowledge of the UCI protocol and Stockfish manipulation, while discovering the challenges of real-time state synchronization with React.

In the end, it's a project I'm quite proud of. It makes the portfolio a bit more lively and it allowed me to code something I actually use (yes, I sometimes play against myself to test...).

Feel free to start a game via the "Hobbies" section of the site and challenge me!

PS: By the way, Stockfish 17 Lite is [available at this address if you want to try it too](/stockfish.js).
