
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/#hero" },
  { label: "Our Story", href: "/#our-story" },
  { label: "Contribute", href: "/#contribute" },
  { label: "Events", href: "/#events" },
  { label: "Speakers", href: "/#speakers" },
  { label: "Volunteer", href: "/#volunteer" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const scrollThreshold = 50; // Hide header after scrolling down this much

  useEffect(() => {
    setMounted(true);

    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const previousScrollY = lastScrollYRef.current;

      if (currentScrollY <= scrollThreshold) {
        setIsHeaderVisible(true); // Always show if near the top
      } else if (currentScrollY > previousScrollY) {
        setIsHeaderVisible(false); // Scrolling DOWN
      } else if (currentScrollY < previousScrollY) {
        setIsHeaderVisible(true); // Scrolling UP
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!mounted) {
    return (
      <header className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm",
        "transition-transform duration-300 ease-in-out",
        "translate-y-0"
      )}>
        <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
           <Link href="/#hero" className="flex items-center"> {/* Changed href */}
            <Image
              src="/images/logo.png"
              alt="GUM Events Logo"
              width={72}
              height={72}
              className="h-[72px] w-[72px]"
              data-ai-hint="logo brand"
              priority
              style={{ objectFit: 'contain' }}
            />
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" disabled className="h-10 w-10 shrink-0" />
            <Button variant="ghost" size="icon" disabled>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm",
      "transition-transform duration-300 ease-in-out",
      isHeaderVisible ? "translate-y-0" : "-translate-y-full"
    )}>
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link href="/#hero" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}> {/* Changed href */}
          <Image
            src="/images/logo.png"
            alt="GUM Events Logo"
            width={72}
            height={72}
            className="h-[72px] w-[72px]"
            data-ai-hint="logo brand"
            priority
            style={{ objectFit: 'contain' }}
          />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav className="hidden items-center space-x-0.5 sm:space-x-1 md:flex">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                asChild
                className="text-sm sm:text-base px-3 sm:px-4 hover:bg-transparent hover:text-accent hover:font-semibold focus-visible:outline-none focus-visible:text-accent focus-visible:underline focus-visible:underline-offset-2 will-change-[color,font-weight]"
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>

          <ThemeToggleButton />

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
                  <Link href="/#hero" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}> {/* Changed href */}
                    <Image
                      src="/images/logo.png"
                      alt="GUM Events Logo"
                      width={62}
                      height={62}
                      className="h-[62px] w-[62px]"
                      data-ai-hint="logo brand"
                      style={{ objectFit: 'contain' }}
                    />
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
                      className="justify-start text-xl"
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
      </div>
    </header>
  );
}
