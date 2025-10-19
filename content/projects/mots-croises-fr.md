---
title: "Programme Mots Croisés"
description: "Résoudre des grilles de mots croisés, trouver des mots par motif et croiser automatiquement plusieurs mots grâce à un solveur universel."
date: 2021-05-30T18:00:00+02:00
featured: false
image: "projects/mots-croises/mots-croises-preview.png"
technologies: ["HTML", "CSS", "JavaScript"]
author: ["Axel Thauvin"]
demo: "https://programmemotscroises.github.io/"
draft: false
accentColor: "#3b82f6"
---

## Pourquoi un programme de mots croisés ?

Tout a commencé avec mes grands-parents.  
Ils adorent faire des **mots croisés**, c’est leur petit rituel du week-end.  
J’ai souvent essayé de les aider à trouver les mots manquants, même si, à l’époque, j’étais loin d’être un expert.

Parfois, certaines définitions étaient **vraiment trop compliquées**, et ils me demandaient de “jeter un œil sur Internet”… autrement dit, de **les aider à tricher un peu**

Alors, en classe de première, j’ai voulu les aider à ma manière, en leur créant **un outil capable de trouver des mots à partir d'un motif**

C’est ainsi qu’est né **le Programme Mots Croisés**, un de mes **premiers vrais projets personnels**, inspiré directement de mes cours de NSI (Numérique et Sciences Informatiques), où j’avais découvert des notions comme la **distance de Hamming**.

---

### Recherche de mots par motif

Sur la page d’accueil, l’utilisateur saisit un motif comme `*A*E*`, avec des jokers personnalisés :

- `*` → n’importe quelle lettre
- `/` → une voyelle
- `#` → une consonne

Le site affiche instantanément **tous les mots correspondants**, classés par proximité (exact, une lettre différente, etc.), avec de **petits badges colorés** pour les distinguer.  
Sur mobile, des boutons d’aide permettent d’insérer facilement ces caractères spéciaux. (Même en première je pensais déjà au responsive !)

Chaque mot trouvé est cliquable et renvoie directement vers sa définition sur le **Larousse**.

![Illustration de la recherche](/projects/mots-croises/recherche.png)

---

### Croisement de deux mots

Une page dédiée permet de **croiser deux mots selon des motifs** et de choisir la **case exacte de croisement**.  
L’expérience se déroule en trois étapes simples :

1. Saisie des deux motifs
2. Sélection du point de croisement (dans une mini-grille cliquable)
3. Visualisation de toutes les combinaisons valides directement dans la grille

Chaque résultat est interactif : un clic suffit pour afficher le croisement choisi.  
C’est une fonctionnalité que mes grands-parents aiment bien, pusiquelle permet d’éliminer des dizaines de possibilités d’un coup !

---

### Résolution de grilles complètes

En première, c’était **le morceau que je n’avais pas réussi à terminer** : le solveur de grilles entières.  
Quatre ans plus tard, j’ai décidé de **reprendre le projet** pour lui redonner un coup de neuf… et cette fois, j’ai enfin réussi à implémenter l’algorithme complet !

L’utilisateur peut créer une **grille personnalisée** (de 5 à 25 cases), y saisir quelques lettres, jokers ou voyelles/consonnes, puis laisser le **solveur universel** trouver toutes les solutions possibles.

Le système :

- détecte automatiquement tous les mots horizontaux et verticaux,
- utilise un **algorithme de backtracking** pour explorer les combinaisons valides,
- et affiche les solutions dans une **grille 2D claire et colorée**.

---

## Architecture technique

À l’époque, j’utilisais simplement **HTML, CSS et JavaScript pur** (je ne connaissais même pas encore TypeScript).  
Je n’avais pas de base de données SQL, alors j’ai écrit un **scraper en Python** pour extraire la liste complète des mots français depuis un site de Scrabble.

Les mots sont ensuite enregistrés **dans le localStorage** du navigateur, ce qui rend l’application **utilisable hors ligne**, et totalement indépendante d’un serveur.  
C’était ma première vraie approche de **stockage local et d’optimisation algorithmique**.

---

## De bons souvenirs ?

Ce projet, né d’une petite idée familiale, est vite devenu **un terrain d’expérimentation algorithmique et de design**.  
Et aujourd’hui encore, mes grands-parents s’en servent pour résoudre leurs grilles ou, disons-le honnêtement, **pour tricher plus efficacement**

C’est l’un de ces projets qui me rappellent pourquoi j’aime coder : partir d’un besoin simple, presque anecdotique, et en faire quelque chose de **utile, élégant et amusant**.

(Au passage, c’est l’un des premiers projets où j’ai pu expérimenter avec Git. En regardant l’historique aujourd’hui, je me rends compte que je ne faisais pas vraiment de commits… je uploadais simplement les fichiers)
