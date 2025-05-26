
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Events", href: "#events" },
  { label: "Speakers", href: "#speakers" },
  { label: "Community", href: "#community" },
  { label: "Volunteer", href: "#volunteer" },
  { label: "Contribute", href: "#contribute" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-32 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
           <Link href="#hero" className="flex items-center ml-24">
            <Image
              src="/images/logo.png"
              alt="GUM Events Logo"
              width={112}
              height={112}
              className="h-[112px] w-[112px]"
              data-ai-hint="logo"
              priority
            />
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
      <div className="container mx-auto flex h-32 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link href="#hero" className="flex items-center ml-24" onClick={() => setIsMobileMenuOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="GUM Events Logo"
            width={112}
            height={112}
            className="h-[112px] w-[112px]"
            data-ai-hint="logo"
            priority
          />
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
                <Link href="#hero" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src="/images/logo.png"
                    alt="GUM Events Logo"
                    width={96}
                    height={96}
                    className="h-24 w-24"
                    data-ai-hint="logo"
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
