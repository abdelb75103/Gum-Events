import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-8 text-center text-muted-foreground">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Copyright className="mr-2 h-4 w-4" />
          <p className="text-sm">
            {new Date().getFullYear()} Growing Up Muslim. All rights reserved.
          </p>
        </div>
        <p className="mt-2 text-xs">
          Designed with peace and community in mind.
        </p>
      </div>
    </footer>
  );
}
