
import Container from "@/components/ui/container";
import NewsletterForm from "@/components/forms/newsletter-form";
import { Button } from "@/components/ui/button";
import { Users2, Mail, Instagram } from "lucide-react"; // Added Instagram

export default function CommunitySection() {
  return (
    <section id="community" className="py-16 sm:py-24 bg-background">
      <Container>
        <div className="mb-12 text-center">
          <Users2 className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Join Our Community
          </h2>
          <div className="mt-2 mx-auto h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-accent"></div>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Stay connected, get updates, and engage with fellow members.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8">
          <div className="rounded-lg border bg-card p-8 shadow-sm">
            <div className="flex items-center mb-4">
              <Mail className="h-8 w-8 text-accent mr-3" />
              <h3 className="text-2xl font-semibold text-foreground">Subscribe to Our Newsletter</h3>
            </div>
            <p className="mb-6 text-muted-foreground">
              Get the latest news, event announcements, and insightful articles delivered straight to your inbox.
            </p>
            <NewsletterForm />
          </div>

          <div className="rounded-lg border bg-card p-8 shadow-sm">
            <div className="flex items-center mb-4">
              <Instagram className="h-8 w-8 text-accent mr-3" />
              <h3 className="text-2xl font-semibold text-foreground">Follow Us on Instagram</h3>
            </div>
            <p className="mb-6 text-muted-foreground">
              Catch our latest updates, stories, and community highlights on Instagram.
            </p>
            <Button
              asChild
              size="lg" // size="lg" applies h-11. The custom padding below will override height.
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground text-base py-3 px-6 sm:py-4 sm:px-8 font-bold w-full"
            >
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                Follow on Instagram
                <Instagram className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </Button>
            <p className="mt-4 text-xs text-muted-foreground text-center">
              Stay tuned for more ways to connect!
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
