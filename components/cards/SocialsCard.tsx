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
    { Icon: TfiGithub, href: "https://github.com/axthauvin", label: "GitHub" },
    {
      Icon: TfiLinkedin,
      href: "https://linkedin.com/in/axthauvin",
      label: "LinkedIn",
    },
    {
      Icon: FaXTwitter,
      href: "https://twitter.com/axthauvin",
      label: "Twitter",
    },
    { Icon: Mail, href: "#", label: "Email", onClickAction: handleEmailClick },
  ];

  return (
    <Card className="border-neutral-800 bg-neutral-950 p-6 h-full">
      <div className="space-y-3">
        {socials.map(({ Icon, href, label, onClickAction }) => (
          <a
            {...(onClickAction ? { onClick: onClickAction } : { href })}
            key={label}
            target="_blank"
            className="flex items-center gap-3 p-3 rounded-md border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200 group cursor-pointer"
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
