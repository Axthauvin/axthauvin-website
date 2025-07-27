---
title: "Application Absence"
description: "Application web permettant de signaler l'absence d'un personnel en un clic via un trombinoscope, avec notifications par email et gestion simplifiée de la base de données."
date: 2022-03-24T21:18:50+02:00
featured: false
image: "projects/app-absence/Absence-app-icon.png"
technologies:
  ["PHP", "HTML", "CSS", "JavaScript", "MySQL", "SMTP (Email)", "Bootstrap"]
author: ["Axel Thauvin"]
---

# Fonctionnement du programme :

À la demande du chef d'établissement du [Lycée Notre Dame de Bourg-la-Reine](http://www.indblr.asso.fr/), j'ai conçu et réalisé, en respectant le cahier des charges demandé, un site internet permettant de signaler très vite à partir d'un smartphone ou d'un ordinateur, aux personnels concernés de l'établissement l'absence d'un de leurs collègues dès connaissance de l'information par un membre du conseil de direction.

# Description

L'utilisateur dispose d'un trombinoscope sur lequel il lui suffit de chercher la photo de la personne absente, ou de chercher le nom dans la barre de recherche dédiée.

![trombinoscope](/projects/app-absence/trombinoscope.png)
_Interface de l'application_

> Afin de respecter le droit à l'image du personnel de l'établissement, les photos et les noms présentés ici ont été générés par ordinateur, et ne sont en aucun cas des vrais personnes.

Puis, par un simple clic 🖱️sur la photo de la personne concernée, elle est notée absente. _La photo devient alors rouge_.

![Illustration rouge](/projects/app-absence/Capture-2.png)

Ainsi, il est très facile de voir si une personne du personnel a déjà été préalablement marquée absente par quelqu'un d'autre.

Puis, **_un mail est envoyé_** à une liste de personnes prédéfinies (celles qui doivent savoir que la personne est absente)
![Exemple mail envoyé](/projects/app-absence/Absence-Email.png)
_Exemple de mail envoyé par le programme_

### Un programme complètement autonome

L'avantage pour l'utilisateur, c'est que j'ai créé une interface graphique pour éditer la base de données. Ainsi, l'utilisateur même sans connaissance en programmation peut mettre facilement à jour la base de données grâce à une interface dédiée.

![Illustration modify](/projects/app-absence/modify-absence.png)

Les quelques champs facilitent l'utilisation du programme.

> Il est aussi possible d'ajouter et de supprimer des personnes dans la base de donnée seulement par quelques clics.

![Illustration modify](/projects/app-absence/Ajout-absence.png)
