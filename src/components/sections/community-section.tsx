
"use client";

import Container from "@/components/ui/container";
import { Mail } from 'lucide-react';
import { socialLinks } from '@/app/config';
import { SocialLinkCard } from '@/components/shared/social-link-card';

export default function CommunitySection() {
  return (
    <section id="community" className="py-16 sm:py-24 bg-background">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Stay Connected
          </h2>
          <div className="mt-2 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow us on your favorite platforms to stay updated with our latest news, community insights, and event announcements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {socialLinks.map((link) => (
            <SocialLinkCard key={link.name} link={link} />
          ))}
        </div>
      </Container>
    </section>
  );
}
