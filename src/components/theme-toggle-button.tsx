"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggleButton() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  // Effect to read theme from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Use stored preference, or system preference, or default to light
    const initialTheme = stored ?? (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
  }, []);

  // Effect to apply the theme class to <html> and persist to localStorage
  useEffect(() => {
    if (typeof window === "undefined" || theme === null) return;

    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Persist to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Show placeholder during initial render to avoid hydration mismatch
  if (theme === null) {
    return <Button variant="ghost" size="icon" disabled className="h-10 w-10 shrink-0 opacity-0" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="shrink-0"
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6" />
      ) : (
        <Moon className="h-6 w-6" />
      )}
    </Button>
  );
}
