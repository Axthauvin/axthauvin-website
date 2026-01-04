export interface Skills {
  skills: {
    name: string;
    iconName: string;
    url?: string; // Optional URL for linking to more info
  }[];
}

export async function getSkills(): Promise<Skills> {
  return {
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
  };
}
