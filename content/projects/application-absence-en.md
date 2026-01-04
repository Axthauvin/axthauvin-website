---
title: "Absence App"
description: "Web application that allows reporting staff absences in one click via a photo directory, with email notifications and simplified database management."
date: 2022-03-24T21:18:50+02:00
featured: false
image: "projects/app-absence/Absence-app-icon.png"
technologies:
  ["PHP", "HTML", "CSS", "JavaScript", "MySQL", "SMTP (Email)", "Bootstrap"]
author: ["Axel Thauvin"]
accentColor: "black"
---

# How the Program Works:

At the request of the principal of [Lycée Notre Dame de Bourg-la-Reine](http://www.indblr.asso.fr/), I designed and developed, following the required specifications, a website that allows quickly reporting a colleague's absence to relevant staff members as soon as the information is known by a member of the management team, from a smartphone or computer.

# Description

The user has access to a photo directory where they simply need to search for the absent person's photo, or search for the name in the dedicated search bar.

![photo directory](/projects/app-absence/trombinoscope.png)
_Application interface_

> To respect the image rights of the establishment's staff, the photos and names presented here have been computer-generated and are in no way real people.

Then, with a simple click 🖱️ on the person's photo, they are marked as absent. _The photo then turns red_.

![Red illustration](/projects/app-absence/Capture-2.png)

This makes it very easy to see if a staff member has already been previously marked as absent by someone else.

Then, **_an email is sent_** to a predefined list of people (those who need to know that the person is absent)
![Email example](/projects/app-absence/Absence-Email.png)
_Example of an email sent by the program_

### A Completely Autonomous Program

The advantage for the user is that I created a graphical interface to edit the database. Thus, even without programming knowledge, the user can easily update the database through a dedicated interface.

![Modify illustration](/projects/app-absence/modify-absence.png)

The few fields facilitate the use of the program.

> It is also possible to add and delete people from the database with just a few clicks.

![Modify illustration](/projects/app-absence/Ajout-absence.png)
