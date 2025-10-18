---
title: "ecrismalettre.fr"
description: "L'outil fait la lettre de motivation parfaite. Dépose ton CV, colle le lien de l’offre, personnalise, et postule en un clin d’œil."
image: "/projects/ecrismalettre/ecrismalettre-card.png"
date: 2025-07-25
featured: true
technologies:
  [
    "TypeScript",
    "React",
    "Next.js",
    "OpenAI API",
    "Supabase",
    "SEO",
    "SSR",
    "Stripe",
  ]
author: ["Axel Thauvin"]
demo: "https://ecrismalettre.fr"
---

## Rendre les candidatures moins douloureuses

Quand j’ai cherché mon premier stage, j’ai vite compris que **les lettres de motivation étaient un gouffre de temps et d’énergie**. Chaque candidature demandait une reformulation différente, alors que les arguments restaient globalement les mêmes.

C’est de ce constat qu’est né **EcrisMaLettre.fr** : un service qui simplifie au maximum cette étape, en automatisant ce qui est répétitif tout en laissant la main à l’utilisateur pour affiner.

Mon objectif était clair : **concevoir un produit utile, accessible et rapide**, mais aussi **apprendre à développer un vrai site en React/Next.js**, avec une stack moderne et des problématiques concrètes (sécurité, SEO, déploiement, marketing).

---

## Premiers pas avec Next.js

![Image next JS](https://leblogduwebmaster.fr/data/medias/newtjs_logo.jpg)

EcrisMaLettre est mon **premier site React poussé en production**, et j’ai choisi **Next.js** comme framework. Next.js apporte une couche d’abstraction très pratique au-dessus de React :

- **Rendu côté serveur (SSR)** et **Static Site Generation (SSG)** → meilleures perfs et meilleur SEO.
- **Routing simplifié** : pas besoin de gérer manuellement React Router.
- **API Routes intégrées** : parfait pour des endpoints légers sans monter un serveur externe.
- **Optimisation automatique** : images, polices, bundles.

**Next.js combine la souplesse de React avec des outils prêts à l’emploi pour le déploiement, la performance et le référencement**. Cela m’a permis de me concentrer sur la logique produit plutôt que sur la configuration.

---

## De l’idée au produit

J’ai itéré en plusieurs étapes :

1. **MVP brut** : upload de CV en PDF + lien de l’offre → retour d’un texte généré par l’IA, sans mise en forme.
2. **Éditeur intégré** : possibilité de retoucher, raccourcir, ou reformuler directement dans l’app.
3. **Suivi de candidatures** : ajout d’un **tableau de bord** centralisé pour garder trace des envois.
4. **Onboarding & business model** : 3 essais gratuits, puis inscription obligatoire pour continuer.

À chaque étape, je testais avec des étudiants autour de moi pour ajuster l’expérience.

---

## Stack technique

- **Front & Framework** : Next.js + React, avec TypeScript pour sécuriser le code.
- **Auth & DB** : Supabase (auth par email, règles RLS pour cloisonner les données).
- **IA** : OpenAI API pour la génération du texte.
- **Infra** : hébergé sur un VPS que je paye moi, avec des intégrations CI/CD automatiques.

---

## SEO et marketing

Un site de ce type n’a de sens que s’il est visible. J’ai travaillé sur :

- **SEO** : sitemap.xml généré automatiquement par Next.js, métadonnées bien renseignées, optimisation du temps de chargement (audit PageSpeed).
- **Marketing étudiant** : bouche à oreille dans mon école, posts LinkedIn, premières inscriptions via ce réseau.
- **Mascotte** : un petit personnage orange avec casquette bleue qui rend le site plus mémorable et sympathique.
- **Compte Instagram** : J'essaye de poster des _memes_, afin de faire croitre de manière organique mes abonnés sur les réseaux sociaux.

---

## Où j’en suis

Aujourd’hui, **EcrisMaLettre.fr** fonctionne et est déjà utilisé par des étudiants pour leurs candidatures. C’est mon premier vrai produit en ligne, avec de vrais utilisateurs et des retours concrets. Au-delà de l’outil en lui-même, ce projet m’a permis d’apprendre à :

- Développer une application React/Next.js de bout en bout.
- Mettre en place une architecture sécurisée avec authentification.
- Penser **marketing et distribution** en plus du code.
- Comprendre l’importance du **SEO** et des perfs web.

C’est une première étape, mais c’est aussi une base solide pour mes futurs projets web.
