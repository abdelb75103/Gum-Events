
"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggleButton() {
  // Initialize theme to 'light' by default.
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Effect to apply the theme class to <html>
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Prevent rendering the button with the wrong icon during SSR/initial client render mismatch.
  // This ensures that when the client hydrates, it initially sees a button that matches the 'light' default.
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

