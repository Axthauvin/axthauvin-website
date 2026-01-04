const fr = {
  // Common
  common: {
    back: "Retour",
    viewAll: "Voir tous les projets",
    pdfVersion: "Version PDF",
    viewCV: "Voir mon CV",
    seeCode: "Voir le code",
    seeDemo: "Voir la démo",
    projectNotFound: "Projet non trouvé",
    emailCopied: "L'email a bien été copié !",
  },

  // Header
  header: {
    back: "Retour",
  },

  // Footer
  footer: {
    copyright: "Tous droits réservés.",
  },

  // Intro Card
  intro: {
    tagline: "Je code quand je m'ennuie.",
    description:
      "J'essaie de transformer des idées techniques en outils simples et utiles.",
  },

  // CV Card
  cvCard: {
    title: "Étudiant en 4ᵉ année à l'EPITA",
    description:
      "Passionné par le développement d'outils simples et accessibles.",
    button: "Voir mon CV",
  },

  // Hobbies Card
  hobbies: {
    title: "Mes hobbies",
    description:
      "Passionné par les échecs et les défis, j'aime me challenger autant sur l'échiquier qu'en code.",
    projectsIntro:
      "Juste en dessous, vous trouverez une collection de mes projets personnels.",
    playChess: "Jouer aux échecs",
    favoriteBook: "Mon livre préféré",
    trophyHunter: "Chasseur de trophées",
  },

  // Socials
  socials: {
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    email: "Email",
  },

  // 404 Page
  notFound: {
    title: "Page introuvable",
    message: "Hmmm. Vous n'auriez pas dû arriver là...",
    subMessage: "Cette page n'existe pas (encore ?).",
    backHome: "Retour à l'accueil",
    previousPage: "Page précédente",
  },

  // CV Page
  cv: {
    back: "Retour",
    pdfVersion: "Version PDF",
    role: "Étudiant ingénieur en informatique",
    location: "Paris, France",
    about: {
      title: "À propos de moi",
      content:
        "Étudiant en 4ᵉ année à l'EPITA, école d'ingénieur en informatique. Curieux, adaptable et à l'aise en équipe, je m'épanouis dans les projets techniques où la collaboration et la transmission de savoir sont au cœur des enjeux.",
    },
    skills: {
      title: "Mes compétences techniques",
    },
    experience: {
      title: "Mon expérience professionnelle",
      tabLabel: "Expérience professionnelle",
    },
    education: {
      title: "Mes formations",
      tabLabel: "Formation",
    },
    path: {
      title: "Mon parcours",
    },
    // Jobs
    jobs: {
      sgDataEngineer: {
        title: "Data Engineer - Société Générale",
        period: "Septembre 2025 - Février 2026",
        type: "Stage",
        location: "Paris, France",
        tags: [
          "LLM",
          "RAG",
          "Python",
          "Backend",
          "Frontend",
          "React",
          "Spring Boot",
        ],
        descriptions: {
          0: "Développement d'un chatbot basé sur LLM pour interroger une base de documentation via un système RAG.",
          1: "Mise en place du modèle, du backend, du frontend et intégration complète dans les systèmes de l'entreprise.",
        },
      },
      ecrisMaLettre: {
        title: "Fondateur & CTO  EcrisMaLettre.fr",
        period: "Juillet 2025 - Aujourd'hui",
        type: "Projet personnel",
        location: "Paris, France",
        tags: ["Next.js", "TypeScript", "IA", "SaaS"],
        descriptions: {
          0: "Création et développement d'un outil en ligne permettant aux étudiants de générer des lettres de motivation personnalisées en quelques secondes à partir de leur CV et d'une offre",
          1: "Site web : <a href='https://ecrismalettre.fr' class='hover:text-blue-500 underline' target='_blank'>ecrismalettre.fr</a>",
        },
      },
      backToBasics: {
        title: "Trésorier de l'association BackToBasics (EPITA)",
        period: "Avril 2023 - Aujourd'hui",
        type: "Associatif",
        location: "Paris, France",
        tags: ["Gestion", "Formation", "Pédagogie", "Organisation", "Cours"],
        descriptions: {
          0: "Gestion des finances de l'association",
          1: "Organisation d'événements et de formations pour les étudiants de classe préparatoire en Physique, Algorithmie, Programmation et Architecture des Ordinateurs.",
        },
      },
      parcoursup: {
        title:
          "Auto-entrepreneur\nCréation et vente du programme Parcoursup Explorer",
        period: "03/2022 - Aujourd'hui",
        type: "Entrepreneuriat",
        location: "France",
        tags: [
          "JavaScript",
          "Data Visualization",
          "Parcoursup",
          "PHP",
          "Chart.js",
        ],
        descriptions: {
          0: "Outil de statistiques interactives pour orienter les lycéens pour Parcoursup",
          1: "Collaboration avec des lycées pour personnaliser et déployer l'outil",
        },
      },
      nomadia: {
        title: "Stagiaire à Nomadia",
        period: "06/2023 - 07/2023",
        type: "Stage",
        location: "Lyon, France",
        tags: ["Python", "IA", "LLM", "Embeddings", "Automatisation"],
        descriptions: {
          0: "Automatisation des processus de traitement et résolution des tickets grâce à une IA (LLM)",
          1: "Standardisation et amélioration de la documentation technique via des solutions IA",
        },
      },
      fablab: {
        title: "Formateur au Fablab de Bagneux",
        period: "08/2020 - 09/2022",
        type: "Formateur",
        location: "Bagneux, France",
        tags: ["Scratch", "Unity", "Pédagogie"],
        descriptions: {
          0: "Initiation à la programmation et aux technologies du numérique",
          1: "Cours pour des groupes d'enfants de 7-12 ans, Fablab de Bagneux",
          2: "Cours individuel en ligne sur Scratch et Unity",
        },
      },
    },
    // Education
    degrees: {
      epita: {
        title: "EPITA école d'ingénieur",
        period: "09/2022  Aujourd'hui",
        location: "Paris, France",
        tags: [
          "Informatique",
          "IA",
          "Projets",
          "Travail en équipe",
          "Développement",
        ],
        descriptions: {
          0: "Programmation, gestion de projets, intelligence artificielle, projets de groupe",
          1: "Développement d'un client BitTorrent, d'un terminal conforme aux normes POSIX et d'un jeu vidéo multijoueur avec gestion du réseau",
        },
      },
      upec: {
        title: "Licence d'informatique à l'Université Paris-Est Créteil (UPEC)",
        period: "09/2022  06/2025",
        location: "Créteil, France",
        tags: ["Informatique", "Licence"],
        descriptions: {
          0: "Obtention de la licence en parallèle de mon cursus à l'EPITA",
        },
      },
      sejong: {
        title:
          "Sejong University - Semestre à l'international en computer sciences en Corée du Sud",
        period: "02/2024  07/2024",
        location: "Séoul, Corée du Sud",
        tags: [
          "Machine Learning",
          "Database",
          "PHP",
          "MariaDB",
          "Hugging Face",
          "OS",
          "Algorithmes",
          "Spark",
        ],
        descriptions: {
          0: "Études en Computer Engineering dans un environnement multiculturel, et majorant aux cours de Machine Learning et Database",
          1: "Création d'un CRM avec MariaDB et PHP pour gérer les utilisateurs et les données clients dans le cadre d'un projet académique",
        },
      },
      bac: {
        title:
          "Institut Notre-Dame - Baccalauréat NSI, Mathématiques et option Maths expertes",
        period: "2022",
        location: "Boulogne-Billancourt, France",
        tags: ["Mention Très Bien"],
        descriptions: {
          0: "Baccalauréat mention très bien",
        },
      },
    },
  },

  // Projects
  projects: {
    allProjects: "Voir tous les projets",
  },

  // Language selector
  language: {
    en: "English",
    fr: "Français",
    select: "Langue",
  },

  // Book
  book: {
    quote:
      "J'ai peur. Pas de la vie ou de la mort, ou du néant mais de tout perdre comme si je n'avais jamais été.",
    author: "Daniel Keyes",
  },
};

export default fr;
