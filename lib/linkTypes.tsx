import {
  Github,
  ExternalLink,
  Globe,
  Chrome,
  Download,
  FileText,
  Package,
  Link as LinkIcon,
  type LucideIcon,
} from "lucide-react";
import { LinkType } from "./projects";

export interface LinkTypeConfig {
  icon: LucideIcon;
  label: string;
  description: string;
  buttonStyle?: "primary" | "secondary";
}

export const linkTypeConfigs: Record<LinkType, LinkTypeConfig> = {
  github: {
    icon: Github,
    label: "Code source",
    description: "Voir le code sur GitHub",
    buttonStyle: "primary",
  },
  demo: {
    icon: ExternalLink,
    label: "Démo",
    description: "Essayer la démo",
    buttonStyle: "secondary",
  },
  website: {
    icon: Globe,
    label: "Site web",
    description: "Visiter le site",
    buttonStyle: "primary",
  },
  "chrome-store": {
    icon: Chrome,
    label: "Chrome Web Store",
    description: "Installer sur Chrome",
    buttonStyle: "primary",
  },
  "firefox-addon": {
    icon: Chrome, // Firefox icon would be better but lucide doesn't have it
    label: "Firefox Add-ons",
    description: "Installer sur Firefox",
    buttonStyle: "secondary",
  },
  download: {
    icon: Download,
    label: "Télécharger",
    description: "Télécharger le projet",
    buttonStyle: "secondary",
  },
  documentation: {
    icon: FileText,
    label: "Documentation",
    description: "Lire la documentation",
    buttonStyle: "secondary",
  },
  npm: {
    icon: Package,
    label: "NPM",
    description: "Voir sur NPM",
    buttonStyle: "secondary",
  },
  other: {
    icon: LinkIcon,
    label: "Lien",
    description: "Voir le lien",
    buttonStyle: "secondary",
  },
};

export function getLinkConfig(type: LinkType): LinkTypeConfig {
  return linkTypeConfigs[type];
}
