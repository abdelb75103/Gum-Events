import Container from "@/components/ui/container";
import VolunteerForm from "@/components/forms/volunteer-form";
import { HeartHandshake } from "lucide-react";

export default function VolunteerSection() {
  return (
    <section id="volunteer" className="py-16 sm:py-24 bg-secondary">
      <Container>
        <div className="mb-12 text-center">
          <HeartHandshake className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get Involved - Volunteer With Us
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Make a difference in our community. We're looking for passionate individuals to help with our events and initiatives.
          </p>
        </div>
        
        <div className="mx-auto max-w-2xl">
          <div className="rounded-lg border bg-card p-8 shadow-lg">
            <VolunteerForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
