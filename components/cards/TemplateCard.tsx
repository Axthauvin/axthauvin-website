"use client";

import { TfiGithub, TfiLinkedin } from "react-icons/tfi";
import { Card } from "../ui/card";
import { Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";
import { useTranslation } from "@/lib/i18n";
import * as React from "react";

export const TemplateCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children }, ref) => (
  <Card className="border-neutral-800 bg-neutral-950 p-6 hover:border-neutral-700 transition-all duration-300 h-full flex flex-col">
    <div className="space-y-3">{children}</div>
  </Card>
));
