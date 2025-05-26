
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react"; // Removed Moon, Sun as theme toggle is not implemented

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Events", href: "#events" },
  { label: "Speakers", href: "#speakers" },
  { label: "Community", href: "#community" },
  { label: "Volunteer", href: "#volunteer" },
  { label: "Contribute", href: "#contribute" },
  { label: "Contact", href: "#contact" },
];

const LogoSvg = ({width = 36, height = 36}: {width?: number, height?: number}) => (
  <svg width={width} height={height} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <title>GUM Logo</title>
    {/* Green Figure */}
    <circle cx="18" cy="18" r="8" style={{ fill: 'var(--primary)' }} />
    <path d="M10 50 C10 35, 18 28, 18 28 C18 28, 26 35, 26 50 Z" style={{ fill: 'var(--primary)' }} />

    {/* Orange Figure */}
    <circle cx="42" cy="18" r="8" style={{ fill: 'var(--accent)' }} />
    <path d="M34 50 C34 35, 42 28, 42 28 C42 28, 50 35, 50 50 Z" style={{ fill: 'var(--accent)' }} />
  </svg>
);


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Return a basic structure or null to avoid hydration mismatch if any client-side only logic was present.
    // For this component, it's mainly for the isMobileMenuOpen state and potential future theme toggles.
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
           <Link href="#hero" className="flex items-center gap-2">
            <LogoSvg />
            <span className="text-xl font-bold text-foreground">GUM Events</span>
          </Link>
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" disabled>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#hero" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
          <LogoSvg />
          <span className="text-xl font-bold text-foreground">GUM Events</span>
        </Link>

        <nav className="hidden items-center space-x-1 md:flex">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="mb-6 flex items-center justify-between">
                <Link href="#hero" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                   <LogoSvg width={28} height={28} />
                  <span className="text-lg font-bold">GUM Events</span>
                </Link>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </SheetTrigger>
              </div>
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className="justify-start text-lg"
                    asChild
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
