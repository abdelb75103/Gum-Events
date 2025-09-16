
"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Container from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HeartHandshake } from "lucide-react";

export default function VolunteerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-secondary dark:bg-background">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <Container>
          <Card className="max-w-4xl mx-auto shadow-xl bg-card">
            <CardHeader className="text-center">
              <HeartHandshake className="mx-auto h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-card-foreground">
                Volunteer With Us
              </CardTitle>
              <div className="mt-2 mx-auto h-[3px] w-20 rounded-full bg-gradient-to-r from-primary to-accent"></div>
               <CardDescription className="pt-4 text-base md:text-lg text-muted-foreground">
                Thank you for your interest! Please fill out the form below to get involved.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="w-full overflow-hidden rounded-lg border">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdJxFScjAEpc9IhhSYK_5WpFNhJWwYai8_wwaAP8lKfuLanEw/viewform?embedded=true"
                  width="100%"
                  height="2400"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="w-full"
                >
                  Loading…
                </iframe>
              </div>
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
