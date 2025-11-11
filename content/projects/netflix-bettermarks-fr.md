---
title: "Netflix BetterMarks, extension chrome"
description: "Extension Chrome qui affiche les notes IMDB, Metacritique et AlloCiné sur Netflix. Manipulation des APIs pour enrichir l'expérience utilisateur."
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
    label: "Télécharger l'extension"
---

## Netflix BetterMarks

[**Télécharger l’extension sur GitHub 👇🏻**](https://github.com/Axthauvin/Netflix-better-marks/releases)

---

### L’histoire

**Netflix BetterMarks** est **ma toute première extension Chrome**.  
À l’époque, je voulais rendre Netflix un peu plus “intelligent”, ou du moins, plus transparent.  
Je sais que quand je cherche un film ou une série, je finit toujours par aller vérifier sa note sur **IMDB**, **Metacritic** ou **AlloCiné**.  
Alors je me suis dit : _“Pourquoi ne pas les afficher directement sur Netflix ?”_

L’idée était simple, mais l’implémentation a été un vrai défi : l’extension devait **analyser les titres affichés sur Netflix**, puis **appeler plusieurs APIs** pour récupérer les notes correspondantes le tout en temps réel, sans ralentir la navigation.

C’était mon premier vrai projet à manipuler le DOM d’un site externe et à faire dialoguer plusieurs APIs ensemble, une petite victoire personnelle à l’époque.

Un autre défi important était de **récupérer le vrai nom du film ou de la série**.  
Netflix affiche parfois des titres localisés ou modifiés (par exemple, “Very Bad Trip” au lieu du titre original, The Hangover), ce qui compliquait la recherche des notes sur les différentes plateformes.  
Pour résoudre ce problème, j’ai dû utiliser l’API d’IMDB afin de retrouver le titre original à partir du titre affiché sur Netflix, garantissant ainsi l’exactitude des notes récupérées.

---

### Le résultat

L’extension ajoutait automatiquement les notes IMDB, Metacritic et AlloCiné **directement sur les vignettes Netflix**, dans un petit encart discret mais bien visible.  
Le but : aider à choisir plus vite quoi regarder, sans ouvrir dix onglets.

![Résultat sur Netflix](https://raw.githubusercontent.com/Axthauvin/Netflix-better-marks/main/NetflixBetterMarks-1.png)

Un petit menu permettait aussi d’activer ou de désactiver les différentes sources de notation, pour personnaliser son expérience :

![Menu de l’extension](https://raw.githubusercontent.com/Axthauvin/Netflix-better-marks/main/NetflixBetterMarks-5.png)

---

### Et aujourd’hui ?

L’extension **n’est plus fonctionnelle**, principalement parce que **les sites utilisés pour le scraping et certaines APIs ont évolué ou sont désormais protégés**.  
Ce type de projet dépend fortement de l’écosystème, et la moindre modification côté IMDB ou Netflix peut tout remettre en cause.

Malgré cela, **Netflix BetterMarks reste un projet marquant** : c’était ma première extension Chrome, ma première vraie intégration d’APIs, et surtout le déclic qui m’a donné envie de créer des outils pour améliorer le web.

Le code source, forcément, **ne répond plus aux standards actuels** ! À l’époque, il n’y avait pas d’IA pour aider, et à **17 ans**, on ne code pas toujours de manière très rigoureuse.

(Si vous voulez aller voir une scène de crime, [je vous invite à aller voir le repo](https://github.com/Axthauvin/Netflix-better-marks))
