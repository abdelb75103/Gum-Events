"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Container from "@/components/ui/container";
import { Mail } from 'lucide-react';
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-background relative">
      <Container>
        <ScrollReveal>
          <Card className="max-w-3xl mx-auto shadow-2xl bg-card border-primary/10 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />
            <CardHeader className="text-center pt-10">
              <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4 w-fit">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Get In Touch</CardTitle>
              <div className="mt-4 mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-accent"></div>
              <CardDescription className="text-lg md:text-xl text-muted-foreground mt-6 max-w-xl mx-auto">
                Have questions or want to learn more? We'd love to hear from you. Reach out to us directly via email.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-10 px-6 sm:px-10">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold w-full sm:w-auto h-auto py-4 px-8 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 rounded-full"
              >
                <a href="mailto:info@growingupmuslimevents.com" className="flex items-center justify-center gap-2">
                  info@growingupmuslimevents.com
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </ScrollReveal>
      </Container>
    </section>
  );
}

