
import Link from 'next/link';
import { socialLinks } from '@/app/config';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Copyright } from 'lucide-react'; // Added for consistency if needed, though original example didn't use it

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:px-8 md:h-24 md:flex-row md:py-0 lg:px-10">
        <div className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-2 md:text-left">
          {/* Icon from example removed, Copyright icon can be used if desired */}
          {/* <Copyright className="hidden h-5 w-5 text-muted-foreground md:inline-block" /> */}
          <p className="text-xs leading-loose text-muted-foreground">
            &copy; {new Date().getFullYear()} {'GUM Events'}. All rights reserved.
          </p>
        </div>
        
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </nav>

        <div className="flex items-center space-x-1">
          {socialLinks.map((link) => {
            const Icon = link.icon; // Get the icon component from the config
            return (
              <Button 
                key={link.name} 
                variant="ghost" 
                size="icon" 
                asChild 
                className="h-8 w-8 group hover:ring-2 hover:ring-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background"
              >
                <Link href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                  <Icon className={cn("h-6 w-6 text-muted-foreground", link.iconColorClass)} />
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

