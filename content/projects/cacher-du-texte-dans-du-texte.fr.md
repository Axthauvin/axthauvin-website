---
title: "Cacher du texte dans du texte"
description: Comment j'ai caché du texte dans du texte. En manipulant les bits du texte, j'ai réussi à cacher du texte dans du texte avec des caractères cachés.
date: 2021-11-04T22:35:57Z
featured: false
image: "projects_images/cacher-du-texte-dans-du-texte/icon.png"
technologies: ["HTML", "CSS", "JavaScript"]
author: ["Axel Thauvin"]
---

> Le projet est actuellement hébergé sur [https://cacherdutexte.github.io](https://cacherdutexte.github.io)

## Comment j'ai caché du texte dans du texte

C'est une façon en manipulant les bits de cacher du texte dans du texte.
Imaginons la chaine de caractère :

```text
Hacker
```

Que je veux cacher dans le message :

```text
Bonjour, je suis Axel Thauvin
```

- Dans un premier temps, on vient récupérer la **représentation décimale dans la table UTF-8** de chaque caractère de la chaine `Hacker`.

  _Voici dans un tableau, la représentation décimale des 127 premiers caractères (aussi appelé tableau ASCII) :_
  ![Tableau ascii](https://github.com/Axthauvin/cacher-du-texte-dans-du-texte/blob/main/images/UTF8-TABLE.png?raw=true)

Pour l'exemple, nous allons prendre le caractère `H`.
Ici, sa représentation décimale est **_72_** (base 10).

- Ensuite nous allons convertir ce nombre en base 6 sur 4 'bits'

  ## Pourquoi ?

  Si nous codons les lettres en base 6 sur 4 bits, nous aurons la représentation maximale de `5555` -> soit 6⁴ -> `1296` :
  _la valeur maximale que nous allons pouvoir exploiter dans ce tableau_

  En fait nous avons 5 **caractères invisibles** qui vont correspondrent aux chiffres de ces bits, que nous allons _cacher_ dans notre texte.

  - _Pour le 0 il n'y a pas de caractère caché_
  - _Pour le 1 c'est le caractère unicode `\u200C`_
  - _Pour le 2 c'est le caractère unicode `\u200D`_
  - _Pour le 3 c'est le caractère unicode `\u200E`_
  - _Pour le 4 c'est le caractère unicode `\u200F`_
  - _Pour le 5 c'est le caractère unicode `\u034F`_

  ## Exemple avec le `H`

  Ici la représentation décimale de `H` est **_72_**.
  Sa représentation en _base 6 sur 4 bits_ est `0200`.

  Je vais donc :

  - Pas ajouter de caractère pour le 1er bit (car il vaut 0)
  - Ajouter le caractère `\u200D` pour le 2ème bit (car il vaut 2)
  - Pas ajouter de caractère pour le 3ème bit (car il vaut 0)
  - Pas ajouter de caractère pour le 4ème bit (car il vaut 0)

  **_Reprenons la chaine initiale_**
  J'ai `Bonjour, je suis Axel Thauvin`.
  Je vais donc écrire : **Bo`\u200D`nj** juste pour le H

  **_Et je fais pareil avec tous les caractères de `Hacker`._**
  Ce qui me donne :
  `Bo‍njou‍r‏,‌ j‍e‏ ‎su‍i͏s͏ A‍x‏e͏l ‎T‌hauvin` (généré avec mon programme, vous pouvez l'essayer sur mon site)

  **_Voilà le résultat :_**
  ![Image gif](https://github.com/Axthauvin/cacher-du-texte-dans-du-texte/raw/main/images/VideoIllustration.gif)
