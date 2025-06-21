"use client";

import { useEffect, useLayoutEffect, useState } from "react";

// SSR-safe layout effect
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const useDarkMode = () => {
  const [theme, setTheme] = useState(null);

  // Detect and initialize theme once on mount
  useIsomorphicLayoutEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  // Apply theme and set up system preference listener
  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (e) => {
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
    };

    mediaQuery.addEventListener("change", onSystemChange);
    return () => mediaQuery.removeEventListener("change", onSystemChange);
  }, [theme]);

  return [theme, setTheme];
};

// Utility classes
const modeBackground = (theme) =>
  theme === "dark" ? "bg-gray-800" : "bg-white";

const modeBackgroundTrueBlack = (theme) =>
  theme === "dark" ? "bg-black" : "bg-white";

const modeBackdrop = (theme) => (theme === "dark" ? "dark" : "light");

export { useDarkMode, modeBackground, modeBackdrop, modeBackgroundTrueBlack };
