
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
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground text-base py-3 px-6 sm:py-4 sm:px-8 font-bold"
            >
              <a href="mailto:info@growingupmuslimevents.com">
                Email Us: info@growingupmuslimevents.com
                <Mail className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
