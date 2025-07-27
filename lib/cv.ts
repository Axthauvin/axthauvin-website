import { IconType } from "react-icons/lib";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiPhp,
  SiC,
  SiMysql,
  SiPostgresql,
  SiDocker,
  SiLinux,
  SiGit,
  SiUnity,
  SiTailwindcss,
} from "react-icons/si";
import { RiJavaFill } from "react-icons/ri";
import { TbBrandCSharp } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa";

export interface CVData {
  about: {
    title: string;
    content: string;
  };
  skills: {
    title: string;
    skills: {
      name: string;
      icon: IconType;
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
    }[];
  };
  education: {
    title: string;
    degrees: {
      title: string;
      period: string;
      description: string[];
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
          icon: SiJavascript,
          iconName: "SiJavascript",
          url: "https://developer.mozilla.org/fr/docs/Web/JavaScript",
        },
        {
          name: "TypeScript",
          icon: SiTypescript,
          iconName: "SiTypescript",
          url: "https://www.typescriptlang.org/",
        },
        {
          name: "React",
          icon: SiReact,
          iconName: "SiReact",
          url: "https://react.dev/",
        },
        {
          name: "Next.js",
          icon: SiNextdotjs,
          iconName: "SiNextdotjs",
          url: "https://nextjs.org/",
        },
        {
          name: "Node.js",
          icon: SiNodedotjs,
          iconName: "SiNodedotjs",
          url: "https://nodejs.org/",
        },
        {
          name: "Python",
          icon: SiPython,
          iconName: "SiPython",
          url: "https://www.python.org/",
        },
        {
          name: "Java",
          icon: RiJavaFill,
          iconName: "RiJavaFill",
          url: "https://www.java.com/",
        },
        {
          name: "PHP",
          icon: SiPhp,
          iconName: "SiPhp",
          url: "https://www.php.net/",
        },
        {
          name: "C#",
          icon: TbBrandCSharp,
          iconName: "TbBrandCSharp",
          url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
        },
        {
          name: "C",
          icon: SiC,
          iconName: "SiC",
          url: "https://en.cppreference.com/w/c",
        },
        {
          name: "SQL",
          icon: FaDatabase,
          iconName: "FaDatabase",
          url: "https://www.mysql.com/",
        },
        {
          name: "Git",
          icon: SiGit,
          iconName: "SiGit",
          url: "https://git-scm.com/",
        },
        {
          name: "Unity",
          icon: SiUnity,
          iconName: "SiUnity",
          url: "https://unity.com/",
        },
        {
          name: "Tailwind CSS",
          icon: SiTailwindcss,
          iconName: "SiTailwindcss",
          url: "https://tailwindcss.com/",
        },
        {
          name: "PostgreSQL",
          icon: SiPostgresql,
          iconName: "SiPostgresql",
          url: "https://www.postgresql.org/",
        },
        {
          name: "MySQL",
          icon: SiMysql,
          iconName: "SiMysql",
          url: "https://www.mysql.com/",
        },
        {
          name: "Docker",
          icon: SiDocker,
          iconName: "SiDocker",
          url: "https://www.docker.com/",
        },
        {
          name: "Linux",
          icon: SiLinux,
          iconName: "SiLinux",
          url: "https://www.kernel.org/",
        },
      ],
    },
    experience: {
      title: "Mon expérience professionnelle",
      jobs: [
        {
          title:
            "Auto-entrepreneur création et vente du programme Parcoursup Explorer",
          period: "03/2022 – Aujourd'hui",
          description: [
            "Outil de statistiques interactives pour orienter les lycéens pour Parcoursup",
            "Collaboration avec des lycées pour personnaliser et déployer l'outil",
          ],
        },
        {
          title: "Stagiaire à Nomadia",
          period: "06/2023 – 07/2023",
          description: [
            "Automatisation des processus de traitement et résolution des tickets grâce à une IA (LLM)",
            "Standardisation et amélioration de la documentation technique via des solutions IA",
          ],
        },
        {
          title: "Formateur au Fablab de Bagneux",
          period: "08/2020 – 09/2022",
          description: [
            "Initiation à la programmation et aux technologies du numérique",
            "Cours pour des groupes d'enfants de 7-12 ans, Fablab de Bagneux",
            "Cours individuel en ligne sur Scratch et Unity",
          ],
        },
        {
          title:
            "Déclaration du statut d'auto entrepreneur pour donner des cours de programmation",
          period: "Août 2020",
          description: [
            "Pour partager ma passion, je me suis déclaré en tant qu'auto entrepreneur. Ainsi, je donne des cours en ligne sur Scratch pour apprendre la programmation aux plus jeunes.",
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
          description: [
            "Programmation – gestion de projets – intelligence artificielle – projets de groupe",
            "Développement d'un client BitTorrent, d'un terminal conforme aux normes POSIX et d'un jeu vidéo multijoueur avec gestion du réseau",
          ],
        },
        {
          title:
            "Sejong University - Semestre à l'international en computer sciences en Corée du Sud",
          period: "02/2024 – 07/2024",
          description: [
            "Études en Computer Engineering dans un environnement multiculturel, et majorant aux cours de Machine Learning et Database",
            "Création d'un CRM avec MariaDB et PHP pour gérer les utilisateurs et les données clients dans le cadre d'un projet académique",
          ],
        },
        {
          title:
            "Institut Notre-Dame - Baccalauréat NSI, Mathématiques et option Maths expertes",
          period: "2022",
          description: ["Baccalauréat mention très bien"],
        },
      ],
    },
  };
}
