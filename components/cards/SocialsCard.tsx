"use client";

import { TfiGithub, TfiLinkedin } from "react-icons/tfi";
import { Card } from "../ui/card";
import { Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";
import { useTranslation } from "@/lib/i18n";

export const SocialsCard = () => {
  const { t } = useTranslation();

  const handleEmailClick = () => {
    navigator.clipboard.writeText("axthauvin@gmail.com");
    toast.success(t("common.emailCopied"));
  };

  const socials = [
    {
      Icon: TfiGithub,
      href: "https://github.com/axthauvin",
      label: t("socials.github"),
      accentColor: "#ce48ff",
    },
    {
      Icon: TfiLinkedin,
      href: "https://linkedin.com/in/axthauvin",
      label: t("socials.linkedin"),
      accentColor: "#008dd8",
    },
    {
      Icon: FaXTwitter,
      href: "https://twitter.com/axthauvin",
      label: t("socials.twitter"),
      accentColor: "#2e2e2eff",
    },
    {
      Icon: Mail,
      href: "#",
      label: t("socials.email"),
      onClickAction: handleEmailClick,
      accentColor: "#d14836",
    },
  ];

  return (
    <Card className="border-neutral-800 bg-neutral-950 p-6 h-full">
      <div className="space-y-3">
        {socials.map(({ Icon, href, label, onClickAction, accentColor }) => {
          return (
            <a
              key={label}
              {...(onClickAction ? { onClick: onClickAction } : { href })}
              target="_blank"
              className="flex items-center gap-3 p-3 rounded-md border border-neutral-800 hover:border-neutral-700 transition-all duration-300 group cursor-pointer hover:bg-[var(--accent-bg)] hover:-translate-y-0.5"
              style={
                {
                  "--accent": accentColor,
                  "--accent-bg": `${accentColor}10`,
                } as React.CSSProperties
              }
            >
              <Icon className="w-4 h-4 text-neutral-400 group-hover:text-[var(--accent)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" />
              <span className="text-sm text-neutral-400 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:font-medium">
                {label}
              </span>
            </a>
          );
        })}
      </div>
    </Card>
  );
};
