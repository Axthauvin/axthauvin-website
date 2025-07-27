"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark" | "system";

const getSystemTheme = (): "light" | "dark" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const applyTheme = (theme: Theme) => {
  const html = document.documentElement;
  let appliedTheme = theme;
  if (theme === "system") {
    appliedTheme = getSystemTheme();
  }
  html.classList.remove("light", "dark");
  html.classList.add(appliedTheme);
};

const themeOptions: { value: Theme; label: string; icon: JSX.Element }[] = [
  {
    value: "light",
    label: "Light",
    icon: <Sun size={20} />,
  },
  {
    value: "dark",
    label: "Dark",
    icon: <Moon size={20} />,
  },
  {
    value: "system",
    label: "System",
    icon: <Monitor size={20} />,
  },
];

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("system");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyTheme(theme);

    if (theme === "system") {
      const handler = () => applyTheme("system");
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [theme]);

  // Close menu on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const currentOption = themeOptions.find((opt) => opt.value === theme);

  return null;

  //   return (
  //     <div className="relative inline-block" ref={menuRef}>
  //       <button
  //         type="button"
  //         aria-label="Toggle theme menu"
  //         onClick={() => setOpen((v) => !v)}
  //         className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 relative"
  //       >
  //         {currentOption?.icon}
  //         <span className="sr-only">Toggle theme</span>
  //       </button>
  //       {open && (
  //         <div className="absolute right-0 mt-2 w-40 bg-popover border border-border rounded-md shadow-lg z-10">
  //           {themeOptions.map((option) => (
  //             <button
  //               key={option.value}
  //               type="button"
  //               className={`flex items-center w-full px-3 py-2 text-sm gap-2 hover:bg-accent transition ${
  //                 theme === option.value ? "font-bold bg-accent/30" : ""
  //               }`}
  //               onClick={() => {
  //                 setTheme(option.value);
  //                 setOpen(false);
  //               }}
  //               aria-pressed={theme === option.value}
  //             >
  //               {option.icon}
  //               {option.label}
  //             </button>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //   );
};

export default ThemeSwitcher;
