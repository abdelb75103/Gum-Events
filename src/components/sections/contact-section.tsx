import Container from "@/components/ui/container";
import ContactForm from "@/components/forms/contact-form";
import { Send } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-secondary">
      <Container>
        <div className="mb-12 text-center">
          <Send className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Have questions, feedback, or suggestions? We'd love to hear from you.
          </p>
        </div>
        
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border bg-card p-8 shadow-lg">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
