---
title: "parcoursup-explorer.fr"
description: "Parcoursup analysis program, allowing high school students to visualize programs obtained according to their specialties, and explore admission statistics."
date: 2022-07-20T21:18:50+02:00
featured: false
image: "projects/parcoursup-explorer/Parcoursup-app-icon.png"
technologies: ["PHP", "Javascript", "ChartJS", "Excel", "CSV", "JSON"]
author: ["Axel Thauvin"]
draft: false
links:
  - type: "website"
    url: "https://parcoursup-explorer.fr"
    label: "Visit the site"
  - type: "demo"
    url: "https://programme-ind-sup.alwaysdata.net/"
    label: "Version for Institut Notre Dame"
---

To help high school students with their orientation, I created a statistics program that, based on the results of students from previous cohorts, determines which programs students obtained according to their specialties.
The high school that wishes to have the program must then fill out an Excel file containing the list of all programs where students received at least one admission offer.

A version of this website was sold to Institut Notre Dame de Bourg la Reine, and the website is available at this address [ParcoursupExplorer for Institut Notre Dame](https://programme-ind-sup.alwaysdata.net/)

![Home page](/projects/parcoursup-explorer/parcoursup-app%20main%20page.png)
_Application interface_

# Description:

The program is divided into 2 distinct parts:

- **Offers accepted by students**: Programs where students chose to go in the end

- **Offers made to students**: The program then lists all programs where students were accepted according to their specialties (example: MPSI prep school or a non-selective computer science bachelor's degree)

## Offers Accepted by Students

![Accepted programs](/projects/parcoursup-explorer/parcoursup-app%20accepted.png)
_Graph showing all offers accepted by students of the 2023 cohort_

This graph allows students to see what the main choices of students are, and thus get an idea of program categories.

This information is also useful for the high school, as it gives information about the most attractive information for students.

## Offers Made to Students

This is the part that is at the center of the program. To better understand it, I'll break down the interface.

![Main page](/projects/parcoursup-explorer/parcoursup-app%20propositions%20main.png)
_Main program page_

Thus, the student must select 2 specialties, so that the program can find all programs that were obtained by students with the same specialties in a previous year.

![Specialty choice](/projects/parcoursup-explorer/parcoursup-app%20spes.png)
_Specialty choice_

The program then finds 64 students with these specialties in previous years.

![Statistics](/projects/parcoursup-explorer/parcoursup-app%20all%20forma.png)
_It is then possible to select different filters such as: choice of option, and choice of the 3rd specialty dropped._
