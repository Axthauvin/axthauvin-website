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
    tagline: "Étudiant en 4ᵉ année à l’EPITA majeure IMAGE",
    description: "Passionné par l'IA, le développement web et les échecs.",
  },

  // CV Card
  cvCard: {
    title: "Ingénieur full-stack",
    description:
      "Étudiant à l’EPITA, stagiaire à la Société Générale, je conçois des solutions déployées et utilisées en conditions réelles.",
    button: "Voir mon expérience",
  },

  // Hobbies Card
  hobbies: {
    title: "Mes hobbies",
    description:
      "Passionné par les échecs et les défis algorithmiques, j'aime me challenger autant sur l'échiquier qu'en code.",
    playChess: "Affrontez-moi aux échecs",
    favoriteBook: "Mon livre préféré",
    trophyHunter: "Chasseur de trophées",
  },

  // Socials
  socials: {
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "Twitter",
    email: "Email",
    downloadCV: "Télécharger mon CV",
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
    url: "/curriculum/axthauvin_cv_2025.pdf",
    pdfVersion: "Télécharger la version PDF",
    role: "Étudiant ingénieur en informatique",
    location: "Paris, France",
    about: {
      title: "À propos de moi",
      content: `Étudiant en école d’ingénieur à l’EPITA, je développe des applications web full-stack avec une approche très orientée produit.

J’aime construire des outils simples à utiliser, qui répondent à un vrai besoin, du prototype jusqu’à la mise en production.  
En parallèle de mon cursus, je travaille sur des sides-projects, dont <a href='https://ecrismalettre.fr' target='_blank' class='underline'>ecrismalettre.fr</a>, un service de génération de lettres de motivation à partir d’un CV et d’une offre d’emploi.`,
    },
    skills: {
      title: "Stack technique",
      description: `Au cours de mes projets et expériences, j'ai eu l'occasion de travailler avec une variété de technologies.
        Voici un aperçu de mes compétences techniques :`,
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
        title: "AI Engineer (LLM / RAG) - Société Générale",
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
        period: "09/2022 - Aujourd'hui",
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
        period: "09/2022 - 06/2025",
        location: "Créteil, France",
        tags: ["Informatique", "Licence"],
        descriptions: {
          0: "Obtention de la licence en parallèle de mon cursus à l'EPITA",
        },
      },
      sejong: {
        title:
          "Sejong University - Semestre à l'international en computer sciences en Corée du Sud",
        period: "02/2024 - 07/2024",
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
    open: "Cliquer pour ouvrir",
    close: "Cliquer pour fermer",
  },

  // Chess
  chess: {
    play: "Jouer aux échecs avec moi",
    title: "Vous vs Stockfish en local",
    yourMove: "Votre coup",
    stockfishMove: "Coup de Stockfish",
    check: "Échec !",
    checkmate: "Échec et mat !",
    stalemate: "Pat !",
    draw: "Match nul !",
    resign: "Vous avez abandonné. Stockfish gagne !",
    yourTurn: "C'est votre tour.",
    stockfishThinking: "Stockfish réfléchit...",
    explanation:
      "Vous jouez les blancs. Faites votre coup en cliquant sur une pièce puis sur la case de destination.",
    playAgain: "Rejouer",
    resetGame: "Réinitialiser la partie",
    cannotGetStockfishMove:
      "Impossible d'obtenir le coup de Stockfish. Veuillez relancer une nouvelle partie.",
    aiServiceUnavailable:
      "Le service IA est indisponible pour le moment. Veuillez réessayer plus tard.",
    enterFullscreen: "Plein écran",
    exitFullscreen: "Quitter le plein écran",
    start: "Commencer la partie",
    youStart: "Vous commencez",
    youWon: "Vous avez gagné ! Félicitations !",
    stockfishWon: "Stockfish a gagné ! Plus de chance la prochaine fois.",
    drawGame: "La partie s'est terminée par un match nul.",
    stockfishTimeout:
      "Le service IA est indisponible (timeout). Veuillez réessayer plus tard.",
    stockfishTurn: "C'est au tour de Stockfish.",
    showHistory: "Voir l'historique",
    gameHistory: "Historique de la partie",
    gameHistoryDescription:
      "Copiez ceci pour l'importer sur chess.com ou d'autres plateformes d'échecs",
    copy: "Copier",
    close: "Fermer",
    historyCopied: "Historique de la partie copié dans le presse-papiers !",
    copyFailed: "Échec de la copie de l'historique",
    gameOverDescription: "La partie est terminée",
    congratulations: "Félicitations ! Vous avez gagné !",
    betterLuckNextTime: "Plus de chance la prochaine fois !",
    drawMessage: "La partie s'est terminée par un match nul",
    copyToChessCom:
      "Copiez pour importer sur chess.com ou d'autres plateformes",
    analyzeOnChessCom: "Analyser sur Chess.com",
  },
};

export default fr;
