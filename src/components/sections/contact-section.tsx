
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Container from "@/components/ui/container"; // Added standard container
import { Mail } from 'lucide-react';

export default function ContactSection() { // Changed to export default
  return (
    <section id="contact" className="py-16 sm:py-24 bg-background"> {/* Adjusted padding and background */}
      <Container> {/* Used standard container */}
        <Card className="max-w-2xl mx-auto shadow-xl bg-card">
          <CardHeader className="text-center">
            <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-card-foreground">Get In Touch</CardTitle>
            <div className="mt-2 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div> {/* Standard underline */}
            <CardDescription className="text-lg md:text-xl text-muted-foreground mt-4"> {/* Added mt-4 for spacing after underline */}
              Have questions or want to learn more? We'd love to hear from you. Reach out to us directly via email.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pt-6 pb-8">
            <Button
              asChild
              size="lg" // Retained for base height context if needed, but overridden by className
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold w-full whitespace-normal h-auto text-[10px] px-2 py-2 xs:text-xs xs:px-3 xs:py-2 sm:text-sm sm:px-4 sm:py-2.5 md:text-base md:px-6 md:py-3 break-words"
            >
              <a href="mailto:info@growingupmuslimevents.com">
                info@growingupmuslimevents.com
                <Mail className="ml-1 h-3 w-3 xs:ml-1.5 xs:h-3.5 xs:w-3.5 sm:ml-2 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}

