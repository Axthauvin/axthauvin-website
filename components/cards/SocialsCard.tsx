"use client";

import { TfiGithub, TfiLinkedin } from "react-icons/tfi";
import { Card } from "../ui/card";
import { Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";

const handleEmailClick = () => {
  console.log("Email button clicked");
  // copy email to clipboard
  navigator.clipboard.writeText("axthauvin@gmail.com");
  toast.success("L'email a bien été copié !");
};

export const SocialsCard = () => {
  const socials = [
    {
      Icon: TfiGithub,
      href: "https://github.com/axthauvin",
      label: "GitHub",
      accentColor: "#ce48ff",
    },
    {
      Icon: TfiLinkedin,
      href: "https://linkedin.com/in/axthauvin",
      label: "LinkedIn",
      accentColor: "#008dd8",
    },
    {
      Icon: FaXTwitter,
      href: "https://twitter.com/axthauvin",
      label: "Twitter",
      accentColor: "#2e2e2eff",
    },
    {
      Icon: Mail,
      href: "#",
      label: "Email",
      onClickAction: handleEmailClick,
      accentColor: "#d14836",
    },
  ];

  return (
    <Card className="border-neutral-800 bg-neutral-950 p-6 h-full">
      <div className="space-y-3">
        {socials.map(({ Icon, href, label, onClickAction, accentColor }) => (
          <a
            {...(onClickAction ? { onClick: onClickAction } : { href })}
            key={label}
            target="_blank"
            className="flex items-center gap-3 p-3 rounded-md border border-neutral-800 hover:border-neutral-700 transition-all duration-200 group cursor-pointer hover:bg-[var(--accent-bg)]"
            style={
              {
                "--accent": accentColor,
                "--accent-bg": `${accentColor}10`,
              } as React.CSSProperties
            }
          >
            <Icon className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
            <span className="text-sm text-neutral-400 group-hover:text-white transition-colors">
              {label}
            </span>
          </a>
        ))}
      </div>
    </Card>
  );
};
