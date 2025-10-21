export interface CVData {
  about: {
    title: string;
    content: string;
  };
  skills: {
    title: string;
    skills: {
      name: string;
      iconName: string;
      url?: string; // Optional URL for linking to more info
    }[];
  };
  experience: {
    title: string;
    jobs: {
      title: string;
      period: string;
      description: string[];
      type?: string; // Type de contrat : Stage, CDI, Alternance, etc.
      location?: string; // Localisation
      tags?: string[]; // Technologies ou mots-clés
    }[];
  };
  education: {
    title: string;
    degrees: {
      title: string;
      period: string;
      description: string[];
      location?: string; // Localisation
      tags?: string[]; // Mots-clés ou spécialités
    }[];
  };
}

export async function getCVData(): Promise<CVData> {
  return {
    about: {
      title: "À propos de moi",
      content:
        "Étudiant en 4ᵉ année à l’EPITA, école d’ingénieur en informatique. Curieux, adaptable et à l’aise en équipe, je m’épanouis dans les projets techniques où la collaboration et la transmission de savoir sont au cœur des enjeux.",
    },
    skills: {
      title: "Mes compétences techniques",
      skills: [
        {
          name: "JavaScript",
          iconName: "SiJavascript",
          url: "https://developer.mozilla.org/fr/docs/Web/JavaScript",
        },
        {
          name: "TypeScript",
          iconName: "SiTypescript",
          url: "https://www.typescriptlang.org/",
        },
        {
          name: "React",
          iconName: "SiReact",
          url: "https://react.dev/",
        },
        {
          name: "Next.js",
          iconName: "SiNextdotjs",
          url: "https://nextjs.org/",
        },
        {
          name: "Node.js",
          iconName: "SiNodedotjs",
          url: "https://nodejs.org/",
        },
        {
          name: "Python",
          iconName: "SiPython",
          url: "https://www.python.org/",
        },
        {
          name: "Java",
          iconName: "RiJavaFill",
          url: "https://www.java.com/",
        },
        {
          name: "PHP",
          iconName: "SiPhp",
          url: "https://www.php.net/",
        },
        {
          name: "C#",
          iconName: "TbBrandCSharp",
          url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
        },
        {
          name: "C",
          iconName: "SiC",
          url: "https://en.cppreference.com/w/c",
        },
        {
          name: "PostgreSQL",
          iconName: "SiPostgresql",
          url: "https://www.postgresql.org/",
        },
        {
          name: "Git",
          iconName: "SiGit",
          url: "https://git-scm.com/",
        },
        {
          name: "Unity",
          iconName: "SiUnity",
          url: "https://unity.com/",
        },
        {
          name: "Tailwind CSS",
          iconName: "SiTailwindcss",
          url: "https://tailwindcss.com/",
        },
        {
          name: "MySQL",
          iconName: "SiMysql",
          url: "https://www.mysql.com/",
        },
        {
          name: "Docker",
          iconName: "SiDocker",
          url: "https://www.docker.com/",
        },
        {
          name: "Linux",
          iconName: "SiLinux",
          url: "https://www.kernel.org/",
        },
        {
          name: "Spring Boot",
          iconName: "SiSpring",
          url: "https://spring.io/projects/spring-boot",
        },
        {
          name: "ElectronJS",
          iconName: "SiElectron",
          url: "https://www.electronjs.org/",
        },
        {
          name: "Microsoft Azure",
          iconName: "TbBrandAzure",
          url: "https://azure.microsoft.com/",
        },
      ],
    },
    experience: {
      title: "Mon expérience professionnelle",
      jobs: [
        {
          title: "Data Engineer – Société Générale",
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
          description: [
            "Développement d’un chatbot basé sur LLM pour interroger une base de documentation via un système RAG.",
            "Mise en place du modèle, du backend, du frontend et intégration complète dans les systèmes de l'entreprise.",
          ],
        },
        {
          title: "Fondateur & CTO – EcrisMaLettre.fr",
          period: "Juillet 2025 - Aujourd'hui",
          type: "Projet personnel",
          location: "Paris, France",
          tags: ["Next.js", "TypeScript", "IA", "SaaS"],
          description: [
            "Création et développement d'un outil en ligne permettant aux étudiants de générer des lettres de motivation personnalisées en quelques secondes à partir de leur CV et d'une offre",
            "Site web : <a href='https://ecrismalettre.fr' class='hover:text-blue-500 underline' target='_blank'>ecrismalettre.fr</a>",
          ],
        },
        {
          title: "Trésorier de l'association BackToBasics (EPITA)",
          period: "Avril 2023 - Aujourd'hui",
          type: "Associatif",
          location: "Paris, France",
          tags: ["Gestion", "Formation", "Pédagogie", "Organisation", "Cours"],
          description: [
            "Gestion des finances de l'association",
            "Organisation d'événements et de formations pour les étudiants de classe préparatoire en Physique, Algorithmie, Programmation et Architecture des Ordinateurs.",
          ],
        },
        {
          title: `Auto-entrepreneur
            Création et vente du programme Parcoursup Explorer`,
          period: "03/2022 – Aujourd'hui",
          type: "Entrepreneuriat",
          location: "France",
          tags: [
            "JavaScript",
            "Data Visualization",
            "Parcoursup",
            "PHP",
            "Chart.js",
          ],
          description: [
            "Outil de statistiques interactives pour orienter les lycéens pour Parcoursup",
            "Collaboration avec des lycées pour personnaliser et déployer l'outil",
          ],
        },
        {
          title: "Stagiaire à Nomadia",
          period: "06/2023 – 07/2023",
          type: "Stage",
          location: "Lyon, France",
          tags: ["Python", "IA", "LLM", "Embeddings", "Automatisation"],
          description: [
            "Automatisation des processus de traitement et résolution des tickets grâce à une IA (LLM)",
            "Standardisation et amélioration de la documentation technique via des solutions IA",
          ],
        },
        {
          title: "Formateur au Fablab de Bagneux",
          period: "08/2020 – 09/2022",
          type: "Formateur",
          location: "Bagneux, France",
          tags: ["Scratch", "Unity", "Pédagogie"],
          description: [
            "Initiation à la programmation et aux technologies du numérique",
            "Cours pour des groupes d'enfants de 7-12 ans, Fablab de Bagneux",
            "Cours individuel en ligne sur Scratch et Unity",
          ],
        },
      ],
    },
    education: {
      title: "Mes formations",
      degrees: [
        {
          title: "EPITA école d'ingénieur",
          period: "09/2022 – Aujourd'hui",
          location: "Paris, France",
          tags: [
            "Informatique",
            "IA",
            "Projets",
            "Travail en équipe",
            "Développement",
          ],
          description: [
            "Programmation, gestion de projets, intelligence artificielle, projets de groupe",
            "Développement d'un client BitTorrent, d'un terminal conforme aux normes POSIX et d'un jeu vidéo multijoueur avec gestion du réseau",
          ],
        },
        {
          title:
            "Licence d'informatique à l'Université Paris-Est Créteil (UPEC)",
          period: "09/2022 – 06/2025",
          location: "Créteil, France",
          tags: ["Informatique", "Licence"],
          description: [
            "Obtention de la licence en parallèle de mon cursus à l’EPITA",
          ],
        },
        {
          title:
            "Sejong University - Semestre à l'international en computer sciences en Corée du Sud",
          period: "02/2024 – 07/2024",
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
          description: [
            "Études en Computer Engineering dans un environnement multiculturel, et majorant aux cours de Machine Learning et Database",
            "Création d'un CRM avec MariaDB et PHP pour gérer les utilisateurs et les données clients dans le cadre d'un projet académique",
          ],
        },
        {
          title:
            "Institut Notre-Dame - Baccalauréat NSI, Mathématiques et option Maths expertes",
          period: "2022",
          location: "Boulogne-Billancourt, France",
          tags: ["Mention Très Bien"],
          description: ["Baccalauréat mention très bien"],
        },
      ],
    },
  };
}
