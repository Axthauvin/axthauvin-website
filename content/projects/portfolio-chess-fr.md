---
title: "Jeu d'Échecs & P2P"
description: "Intégration d'un jeu d'échecs complet sur ce portfolio. Affrontement contre l'IA (Stockfish) ou en multijoueur (P2P) temps réel."
date: 2026-01-24T14:00:00+02:00
featured: true
image: "projects/p2p-chess/icon.png"
technologies: ["React", "JavaScript", "Firebase", "Stockfish.js", "WebSockets"]
author: ["Axel Thauvin"]
---

Après avoir passé pas mal de temps à décortiquer le fonctionnement de **Stockfish** pour mon projet d'[analyseur de parties Chess.com](/projects/chess-analyser), je me suis dit qu'il manquait une pièce au puzzle sur mon portfolio. Analyser, c'est bien, mais jouer, c'est mieux !

J'ai donc décidé d'intégrer un plateau d'échecs complet directement sur le site, pour permettre aux visiteurs de lancer une partie rapide contre une IA (Stockfish) ou de défier un ami en temps réel via un lien, le tout sans quitter le navigateur. _(un peu inutile, mais très fun à coder !)_

## Stockfish dans le navigateur

La première étape a été de réutiliser ce que j'avais déjà fait : faire tourner **Stockfish** (le moteur d'échecs le plus puissant du monde) directement dans le navigateur de l'utilisateur.

Cette partie était la plus rapide à mettre en place grâce à mon expérience précédente. J'ai réutilisé le principe des `Web Workers` pour faire tourner **Stockfish 17 Lite** en arrière-plan sans bloquer l'interface.

Le flux est simple :

1. Le joueur déplace une pièce.
2. L'application envoie le FEN (la notation de l'état du plateau) au Worker Stockfish.
3. Le moteur calcule le meilleur coup (avec une profondeur limitée pour ne pas humilier le joueur trop vite) et le renvoie à l'interface React.

En réalité, c'est même plus simple que l'extension Chess.com, car ici j'utilise directement le résultat de stockfish comme coup joué par l'IA.

## Le mode Multijoueur

C'est là que ça devient intéressant. Je voulais que deux personnes puissent jouer l'une contre l'autre de manière simple. Le soucis dans le monde du web, c'est que pour faire du temps réel entre deux clients, il faut généralement un serveur qui relaie les messages.

Pour réaliser ça, j'avais besoin d'un moyen pour que les deux navigateurs s'échangent les coups en temps réel. Je ne voulais pas monter une architecture backend trop lourde pour ça, d'autant plus que ma solution d'hébergement actuelle ne le permettait pas. C'est là que le **Peer to Peer (P2P)** entre en jeu.

### P2P

![Image schéma P2P](https://shareaza.sourceforge.net/w/images/1/1a/Networks.png)

**Le Peer to Peer** (P2P), est un protocole réseau, dans lequel les deux joueurs communiquent directement entre eux, sans passer par un serveur central pour gérer la partie. Ce qui est idéal pour un jeu d'échecs où la latence doit être minimale, mais aussi pour éviter de devoir gérer une infrastructure serveur complexe.

### Firebase

![Firebase](https://firebase.google.com/static/images/products/realtime-database/database-2.png)

J'ai opté pour **Firebase Realtime Database** comme proxy.
Concrètement, la base de données agit comme une simple boîte aux lettres synchronisée :

1. Le **Joueur A** crée une partie -> ça écrit une entrée dans la base de données.
2. Le **Joueur B** rejoint -> il s'abonne aux changements de cette entrée.
3. Quand je bouge un pion, j'envoie le coup à Firebase.
4. Firebase notifie instantanément l'adversaire qui voit le pion bouger sur son écran.

C'est une solution super efficace, puisque je n'ai pas de serveur à maintenir, et la latence est quasi imperceptible pour un jeu au tour par tour comme les échecs.

## Sous le capot : WebRTC & Signaling

La partie la plus complexe du WebRTC, c'est que deux navigateurs ne peuvent pas se connecter directement l'un à l'autre par magie. Ils ne connaissent ni l'adresse IP, ni le port de l'autre, et sont souvent cachés derrière des routeurs (NAT).

Pour résoudre ça, j'ai implémenté un mécanisme de **Signaling** en utilisant Firebase Firestore comme entremetteur. Voici comment se déroule la connexion, étape par étape :

### 1. Le Signaling (La rencontre)

C'est la phase où les deux clients s'échangent leurs coordonnées via la base de données.

- **L'Offre (Caller) :** Le créateur de la partie génère une "Offre" (SDP) qui contient les infos techniques de sa session. Il la stocke dans un document Firestore `rooms/{roomId}`.
- **La Réponse (Callee) :** Le deuxième joueur lit cette offre, la configure sur son navigateur, génère une "Réponse" (Answer) et la renvoie via Firestore.

### 2. La traversée du NAT (ICE Candidates)

En parallèle, chaque navigateur demande à un serveur **STUN** (j'utilise ceux de Google : `stun:stun1.l.google.com`) : _"Hé, quelle est mon IP publique ?"_.

Ces informations s'appellent des **ICE Candidates**. Dès qu'un navigateur en trouve un, il l'envoie à l'autre via une sous-collection Firestore.

### 3. Le Canal de Données (Data Channel)

Une fois que les deux navigateurs ont échangé leurs offres/réponses et trouvé un chemin réseau compatible (grâce aux candidats ICE), la connexion directe s'ouvre !

À partir de ce moment précis, **Firebase n'est plus utilisé pour le jeu**. J'utilise un `RTCDataChannel` pour envoyer les coups (ex: "e2e4") directement d'un navigateur à l'autre.

> **Pourquoi c'est cool ?** Parce que la latence est minimale. Le coup d'échecs ne fait pas _Joueur A -> Serveur -> Joueur B_, mais directement _Joueur A -> Joueur B_.

## Bilan

Ce projet, c'est un peu la suite logique de mon extension. J'ai pu réutiliser mes connaissances sur le protocole UCI et la manipulation de Stockfish, tout en découvrant les défis de la synchronisation d'états en temps réel avec React.

Au final, c'est un projet dont je suis assez fier. Ça rend le portfolio un peu plus vivant et ça m'a permis de coder un truc que j'utilise vraiment (oui, je joue parfois contre moi-même pour tester...).

N'hésitez pas à lancer une partie via la section "Hobbies" du site et à me défier !

PS: Au passage, stockfish 17 lite est [dispo à cette adresse si vous voulez l'essayer vous aussi](/stockfish.js).
