---
title: "ZAMP"
description: "Application qui installe et gère un environnement de développement local avec Apache, MySQL et PHP en un clic. Manipulation automatisée des services pour simplifier l'expérience utilisateur."
date: 2024-11-10T13:24:50+02:00
featured: false
image: "/projects_images/zamp/zamp-icon.png"
technologies: ["Electron", "HTML", "CSS", "Apache", "MySQL", "PHP"]
author: ["Axel Thauvin"]
draft: false
---

## Fonctionnement du programme

ZAMP est une application qui simplifie l'installation d'un environnement de développement web local en un seul clic. Conçue avec [Electron](https://www.electronjs.org/), elle regroupe Apache, MySQL et PHP, ce qui élimine le besoin de configuration manuelle.

> Ce projet est encore en cours de développement, et a pour but d'être open source, afin de laisser la communauté l'améliorer et le personnaliser.

## Vue d'ensemble

**ZAMP** est une pile de développement tout-en-un pour les développeurs web, **fournissant tout ce dont vous avez besoin** pour le développement web **_local_**. Il intègre de manière transparente Apache, MySQL et PHP, éliminant ainsi le besoin d'installations individuelles.
Avec **aucune configuration requise**, ZAMP simplifie votre processus de développement, vous permettant de vous concentrer uniquement sur la création de votre application. De plus, démarrer tous les services est aussi simple qu'un seul clic, améliorant ainsi votre productivité et votre efficacité.

![Zamp avec des projets chargés](/projects_images/zamp/ZAMP-interface.png)

## Fonctionnalités

- **Aucune Configuration Nécessaire**: Installez et exécutez. Pas besoin de passer des heures à configurer votre environnement.
  es- - **Gestion des Extensions**: Activez ou désactivez les extensions PHP avec une simple interface à cases à cocher.

- **Contrôle des Versions**: Téléchargez et passez facilement d'une version de PHP à une autre.
  ent.- **Lanceur MySQL / MariaDB**: Cliquez simplement pour ouvrir et fermer votre instance SQL.
  ce.
  -- **Configuration de Projet par Glisser-Déposer**: Glissez et déposez simplement vos dossiers de projet dans ZAMP pour commencer.e.
- **Contrôle des Versions**: Téléchargez et passez facilement d'une version de PHP à une autre.
- **Lanceur MySQL / MariaDB**: Cliquez simplement pour ouvrir et fermer votre instance SQL.
- **Configuration de Projet par Glisser-Déposer**: Glissez et déposez simplement vos dossiers de projet dans ZAMP pour commencer.

## Installation

Actuellement, ZAMP est uniquement disponible pour Windows. Nous travaillons activement à rendre ZAMP disponible pour macOS et Linux dans un futur proche. Restez à l'écoute pour les mises à jour !

### Windows

1. Téléchargez la dernière version de [ZAMP pour Windows](https://github.com/Axthauvin/ZAMP/releases/download/Windows-0.0.2/zamp.Setup.0.1.2.exe).
2. Extrayez l'archive à l'emplacement de votre choix.
3. Exécutez `zamp.Setup.1.0.0.exe`.

## Utilisation

Une fois installé, vous pouvez accéder aux services suivants :

- **Apache** : Cliquez sur le bouton de démarrage
  ![Bouton de démarrage](/projects_images/zamp/Startbutton.png)

- **PHPMyAdmin** : PHP se configurera automatiquement dans l'application.
  Vous pouvez toujours changer la version ou les extensions en utilisant les zones dédiées.
  ![Configuration PHP](/projects_images/zamp/PHPConfig.png)

- **MySQL / MariaDB** : ZAMP utilise MariaDB pour exécuter SQL car il dispose de binaires. MariaDB est rétrocompatible avec MySQL, vous pouvez donc toujours utiliser Workbench pour accéder à votre serveur.

Vous pouvez accéder au serveur SQL dans la zone dédiée

![Boutons SQL](/projects_images/zamp/MYSQL.png)
