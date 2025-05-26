
"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggleButton() {
  // Initialize theme based on localStorage or system preference, defaulting to 'light'
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") {
      return "light"; // Default for SSR, will be corrected on client
    }
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Effect to apply the theme class to <html> and update localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Prevent rendering the button with the wrong icon during SSR/initial client render mismatch
  // by waiting for the theme to be definitively set by useEffect.
  // A loading state could also be used here for a skeleton.
  if (typeof window === "undefined") {
     return <Button variant="ghost" size="icon" disabled className="h-10 w-10 shrink-0" />;
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
