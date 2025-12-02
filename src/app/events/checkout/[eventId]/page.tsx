
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Container from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = 'force-dynamic'; // Ensures the page is always rendered dynamically

interface EventCheckoutPageProps {
  params: Promise<{
    eventId: string;
  }>;
}

export default async function EventCheckoutPage({ params }: EventCheckoutPageProps) {
  const { eventId } = await params;

  if (!eventId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow py-12">
          <Container>
            <Card className="max-w-lg mx-auto text-center">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-destructive">Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Event ID is missing. Cannot load checkout.</p>
                <Button asChild>
                  <Link href="/">Return to Homepage</Link>
                </Button>
              </CardContent>
            </Card>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-secondary dark:bg-background">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <Container>
          <Card className="max-w-3xl mx-auto shadow-xl bg-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-card-foreground">
                Event Registration
              </CardTitle>
              <div className="mt-2 mx-auto h-[3px] w-20 rounded-full bg-gradient-to-r from-primary to-accent"></div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 text-center">
              <p className="text-muted-foreground">
                Ticket sales for this Eventbrite listing have ended.
              </p>
              <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <Link href="/#events">View current events</Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
