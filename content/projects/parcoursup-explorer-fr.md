---
title: "parcoursup-explorer.fr"
description: "Programme d'analyse des parcours Parcoursup, permettant aux lycéens de visualiser les formations obtenues selon leurs spécialités, et d'explorer les statistiques d'admission."
date: 2022-07-20T21:18:50+02:00
featured: false
image: "projects/parcoursup-explorer/Parcoursup-app-icon.png"
technologies: ["PHP", "Javascript", "ChartJS", "Excel"]
author: ["Axel Thauvin"]
demo: "https://parcoursup-explorer.fr"
draft: false
accentColor: "black"
---

Afin d'aider les lycéens dans leur orientation, j'ai réalisé un programme de statistiques, qui se basant sur les résultats des élèves des promotions ultérieures, de savoir quelles formations ont étées obtenues par les élèves en fonctions de leur spécialitées.
Le lycée qui souhaite disposer du programme doit alors remplir un fichier excel comportant la liste de toutes les formations où les élèves ont reçu au moins une proposition d'admission.

Une version de se site Internet a été vendue à l'Institut Notre Dame de Bourg la reine, et le site internet est disponible à cette adresse [ParcoursupExplorer pour l'Institut Notre Dame](https://programme-ind-sup.alwaysdata.net/)

![Page d'acceuil](/projects/parcoursup-explorer/parcoursup-app%20main%20page.png)
_Interface de l'application_

# Description :

Le programme se découpe en 2 parties distinctes :

- **Les propositions acceptées par les élèves** : Les formations où les élèves ont choisi d'aller au final

- **Les propositions faites aux élèves** : Le programme ressence alors toutes les formations où les élèves ont été acceptés en fonction de leur spécialités (example : Prépa MPSI ou une license non sélective en informatique)

## Propositions acceptées par les élèves

![Formation acceptées](/projects/parcoursup-explorer/parcoursup-app%20accepted.png)
_Graphique montrant toutes les propositions acceptées par les élèves de la promotion 2023_

Ce graphique permet aux élèves de voir quels sont les choix principaux des élèves, et donc d'avoir une idée des catégories de formations.

Cette information est aussi utile pour le lycée, car cela lui donne une information quant aux informations les plus attractives pour les élèves.

## Propositions faites aux élèves

C'est cette partie qui est au centre du programme. Afin de mieux la comprendre, je vais décomposer l'interface.

![Page principale](/projects/parcoursup-explorer/parcoursup-app%20propositions%20main.png)
_Page principale du programme_

Ainsi, l'élève doit sélectionner 2 spécialités, afin que le programme soit en mesure de ressortir toutes les formations qui ont été obtenues par les élèves avec les mêmes spécialités sur une année précédente.

![Choix spécialités](/projects/parcoursup-explorer/parcoursup-app%20spes.png)
_Choix des spécialités_

Le programme trouve alors 64 alèves avec ces spécialités dans les années précédantes.

![Statistiques](/projects/parcoursup-explorer/parcoursup-app%20all%20forma.png)
_Il est alors possible de sélectionner différents filtres tel que : le choix de l'option, rt le choix de la 3ème spécialité abandonnée._
