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
  SiElectron,
  SiSpring,
  SiHuggingface,
} from "react-icons/si";
import { RiJavaFill } from "react-icons/ri";
import { TbBrandAzure, TbBrandCSharp } from "react-icons/tb";
import { FaQuestion } from "react-icons/fa";

export const iconMap: Record<string, IconType> = {
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
  SiElectron,
  SiSpring,
  RiJavaFill,
  TbBrandCSharp,
  SiHuggingface,
  TbBrandAzure,
};

export function getIcon(iconName: string): IconType {
  return iconMap[iconName] || FaQuestion;
}
