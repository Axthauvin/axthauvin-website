const en = {
  // Common
  common: {
    back: "Back",
    viewAll: "View all projects",
    pdfVersion: "PDF Version",
    viewCV: "View my CV",
    seeCode: "See code",
    seeDemo: "See demo",
    projectNotFound: "Project not found",
    emailCopied: "Email copied to clipboard!",
  },

  // Header
  header: {
    back: "Back",
  },

  // Footer
  footer: {
    copyright: "All rights reserved.",
  },

  // Intro Card
  intro: {
    tagline: "I code when I'm bored.",
    description: "I try to turn technical ideas into simple and useful tools.",
  },

  // CV Card
  cvCard: {
    title: "4th year student at EPITA",
    description: "Passionate about developing simple and accessible tools.",
    button: "View my CV",
  },

  // Hobbies Card
  hobbies: {
    title: "My hobbies",
    description:
      "Passionate about chess and challenges, I love to challenge myself both on the chessboard and in code.",
    projectsIntro:
      "Just below, you'll find a collection of my personal projects.",
    playChess: "Play chess",
    favoriteBook: "My favorite book",
    trophyHunter: "Trophy hunter",
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
    title: "Page not found",
    message: "Hmm. You shouldn't have ended up here...",
    subMessage: "This page doesn't exist (yet?).",
    backHome: "Back to home",
    previousPage: "Previous page",
  },

  // CV Page
  cv: {
    back: "Back",
    pdfVersion: "PDF Version",
    role: "Computer engineering student",
    location: "Paris, France",
    about: {
      title: "About me",
      content:
        "4th year student at EPITA, a computer engineering school. Curious, adaptable and comfortable in a team, I thrive in technical projects where collaboration and knowledge sharing are at the heart of the challenges.",
    },
    skills: {
      title: "My technical skills",
    },
    experience: {
      title: "My professional experience",
      tabLabel: "Professional experience",
    },
    education: {
      title: "My education",
      tabLabel: "Education",
    },
    path: {
      title: "My path",
    },
    // Jobs
    jobs: {
      sgDataEngineer: {
        title: "AI Engineer (LLM / RAG) - Société Générale",
        period: "September 2025 - February 2026",
        type: "Internship",
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
          0: "Development of a chatbot based on LLM to query a documentation database via a RAG system.",
          1: "Setting up the model, backend, frontend and full integration into the company's systems.",
        },
      },
      ecrisMaLettre: {
        title: "Founder & CTO  EcrisMaLettre.fr",
        period: "July 2025 - Present",
        type: "Personal project",
        location: "Paris, France",
        tags: ["Next.js", "TypeScript", "IA", "SaaS"],
        descriptions: {
          0: "Creation and development of an online tool allowing students to generate personalized cover letters in seconds from their CV and an offer",
          1: "Website: <a href='https://ecrismalettre.fr' class='hover:text-blue-500 underline' target='_blank'>ecrismalettre.fr</a>",
        },
      },
      backToBasics: {
        title: "Treasurer of the BackToBasics association (EPITA)",
        period: "April 2023 - Present",
        type: "Associative",
        location: "Paris, France",
        tags: ["Management", "Training", "Pedagogy", "Organization", "Courses"],
        descriptions: {
          0: "Management of the association's finances",
          1: "Organization of events and training for preparatory class students in Physics, Algorithms, Programming and Computer Architecture.",
        },
      },
      parcoursup: {
        title: "Self-entrepreneur\nCreation and sale of Parcoursup Explorer",
        period: "03/2022 - Present",
        type: "Entrepreneurship",
        location: "France",
        tags: [
          "JavaScript",
          "Data Visualization",
          "Parcoursup",
          "PHP",
          "Chart.js",
        ],
        descriptions: {
          0: "Interactive statistics tool to guide high school students for Parcoursup",
          1: "Collaboration with high schools to customize and deploy the tool",
        },
      },
      nomadia: {
        title: "Intern at Nomadia",
        period: "06/2023 - 07/2023",
        type: "Internship",
        location: "Lyon, France",
        tags: ["Python", "AI", "LLM", "Embeddings", "Automation"],
        descriptions: {
          0: "Automation of ticket processing and resolution through AI (LLM)",
          1: "Standardization and improvement of technical documentation via AI solutions",
        },
      },
      fablab: {
        title: "Trainer at Fablab de Bagneux",
        period: "08/2020 - 09/2022",
        type: "Trainer",
        location: "Bagneux, France",
        tags: ["Scratch", "Unity", "Pedagogy"],
        descriptions: {
          0: "Introduction to programming and digital technologies",
          1: "Classes for groups of children aged 7-12, Fablab de Bagneux",
          2: "Individual online classes on Scratch and Unity",
        },
      },
    },
    // Education
    degrees: {
      epita: {
        title: "EPITA engineering school",
        period: "09/2022 - Present",
        location: "Paris, France",
        tags: ["Computer Science", "AI", "Projects", "Teamwork", "Development"],
        descriptions: {
          0: "Programming, project management, artificial intelligence, group projects",
          1: "Development of a BitTorrent client, a POSIX-compliant terminal and a multiplayer video game with network management",
        },
      },
      upec: {
        title: "Computer science degree at Université Paris-Est Créteil (UPEC)",
        period: "09/2022 - 06/2025",
        location: "Créteil, France",
        tags: ["Computer Science", "Degree"],
        descriptions: {
          0: "Obtaining the degree in parallel with my studies at EPITA",
        },
      },
      sejong: {
        title:
          "Sejong University - International semester in computer sciences in South Korea",
        period: "02/2024 - 07/2024",
        location: "Seoul, South Korea",
        tags: [
          "Machine Learning",
          "Database",
          "PHP",
          "MariaDB",
          "Hugging Face",
          "OS",
          "Algorithms",
          "Spark",
        ],
        descriptions: {
          0: "Studies in Computer Engineering in a multicultural environment, and top of the class in Machine Learning and Database courses",
          1: "Creation of a CRM with MariaDB and PHP to manage users and customer data as part of an academic project",
        },
      },
      bac: {
        title:
          "Institut Notre-Dame - Baccalauréat NSI, Mathematics and Expert Math option",
        period: "2022",
        location: "Boulogne-Billancourt, France",
        tags: ["High Honors"],
        descriptions: {
          0: "Baccalauréat with honors (Mention Très Bien)",
        },
      },
    },
  },

  // Projects
  projects: {
    allProjects: "See all projects",
  },

  // Language selector
  language: {
    en: "English",
    fr: "Français",
    select: "Language",
  },

  // Book
  book: {
    quote:
      "I am afraid. Not of life or death, or of nothingness, but of losing everything as if I had never been.",
    author: "Daniel Keyes",
  },
};

export default en;
