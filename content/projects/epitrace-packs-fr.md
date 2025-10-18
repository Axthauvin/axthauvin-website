---
title: "EPITRACE Packs Extension"
description: "Transforme la consultation de tes résultats de code en une expérience de 'pack opening' amusante."
date: 2025-03-03
image: "/projects/epitrace/logo.png"
technologies: ["HTML", "CSS", "JavaScript", "Firefox XPI", "CI-CD"]
author: ["Axel Thauvin"]
github: "https://github.com/Axthauvin/epitrace-packs"
demo: "https://github.com/Axthauvin/epitrace-packs/releases"
---

### Une extension qui transforme les résultats de code en expérience ludique

**EPITRACE Packs Extension** est une extension web que j’ai développée pour améliorer et rendre plus amusante la vie des étudiants en programmation. L’idée est de prendre le moment, souvent monotone ou stressant, de la vérification des résultats et de le transformer en un jeu de **"pack opening"**.

#### Qu'est ce que la "Moulinette" et les "Traces"

Pour les étudiants de l'EPITA, comme dans de nombreuses écoles d'informatique, l'évaluation des projets de code se fait via un système de correction automatique appelé la **"Moulinette"**.

- **La "Moulinette"** : C'est l'outil qui prend le code soumis et exécute une série de tests pour vérifier sa validité et sa performance.
- **Les "Traces"** : C'est le **résultat final** de cette correction, exprimé sous forme de pourcentage de réussite. Ce pourcentage représente à quel point le code a passé les tests de la moulinette. L'objectif est d'avoir la meilleure note, et donc de viser le 100% !

![Illustration des traces](/projects/epitrace/traces.png)

_Aperçu des traces EPITRACE sans l'extension - interface standard montrant les résultats de correction_

---

## Fonctionnalités principales : La Gamification des Résultats

L'extension transforme la lecture de ces "Traces" (les pourcentages) en un moment engageant :

- **Ouvrir les traces comme des packs FIFA** : Au lieu d'afficher le pourcentage immédiatement, l'extension déclenche une animation de type **"pack opening"** (similaire aux jeux de cartes à collectionner ou aux loot boxes), révélant le pourcentage de réussite avec un effet visuel surprise.
- **Flexer ses réussites** : Les pourcentages parfaits ou très élevés déclenchent des animations spéciales (un "icon pack"), offrant aux étudiants le moyen idéal de célébrer et de montrer leur succès à leurs amis.

![Image demo](https://github.com/Axthauvin/epitrace-packs/raw/main/images_github/illustration.gif)

---

## Installation

L’extension est disponible directement sur GitHub.
👉 [Voir les releases sur GitHub](https://github.com/Axthauvin/epitrace-packs/releases) et suivre les instructions.

⚠️ **Attention :** L’extension est un fichier `.xpi` conçu pour **Firefox**. Les fichiers sont générés automatiquement via CI/CD. Pensez à vérifier et adapter la configuration de Firefox (`about:config`) si nécessaire pour permettre l'installation d'extensions non publiées officiellement.

---

## Contribuer

EPITRACE Packs est un projet _open source_ !

N’hésite pas à ouvrir [une _issue_ sur le dépôt GitHub](https://github.com/Axthauvin/epitrace-packs/issues/new). Ton retour est précieux !

Ce projet est distribué sous licence **MIT**.
Tu peux consulter le fichier LICENSE pour plus de détails.

Une question ou un feedback ?
**[axel.thauvin@epita.fr](mailto:axel.thauvin@epita.fr)**
