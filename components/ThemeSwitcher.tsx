"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";

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
  return appliedTheme;
};

const ThemeSwitcher: React.FC = () => {
  const { theme = "system", setTheme } = useTheme();

  useEffect(() => {
    const appliedTheme = applyTheme(theme as Theme);
    setTheme(appliedTheme);

    if (theme === "system") {
      const handler = () => applyTheme("system");
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, [setTheme, theme]);

  return null;
};

export default ThemeSwitcher;
