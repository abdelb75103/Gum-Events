
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Container from "@/components/ui/container";
import EventbriteCheckout from "@/components/eventbrite-checkout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EventCheckoutPageProps {
  params: {
    eventId: string;
  };
}

// Make the component async and await params
export default async function EventCheckoutPage({ params: paramsProp }: EventCheckoutPageProps) {
  const params = await Promise.resolve(paramsProp);
  const { eventId } = params;

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
            <CardContent className="pt-6">
              <EventbriteCheckout eventId={eventId} iframeContainerHeight={700} />
            </CardContent>
          </Card>
          <div className="text-center mt-8">
             <a
                href={`https://www.eventbrite.ie/e/${eventId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline hover:text-accent transition-colors"
             >
                Problems with the checkout? Click here to open on Eventbrite.
            </a>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
