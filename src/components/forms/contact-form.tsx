
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} loading={pending} className="w-full">
      Send Message
    </Button>
  );
}

type ContactFormState = { message: string; errors?: Record<string, string[]> };

export default function ContactForm() {
  const initialState: ContactFormState = { message: "", errors: {} };
  const [state, dispatch] = useActionState<ContactFormState, FormData>(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus(); // Get pending state for the overlay

  useEffect(() => {
    if (state.message && !pending) { // Ensure pending is false before showing toast
      if (state.errors && Object.keys(state.errors).length > 0) {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Message Sent!",
          description: state.message,
        });
        formRef.current?.reset();
      }
    }
  }, [state, toast, pending]);

  return (
    <div className="relative">
      <form ref={formRef} action={dispatch} className={cn("space-y-6", pending ? "opacity-50" : "")}>
        <fieldset disabled={pending} className="space-y-6">
          <div>
            <Label htmlFor="name-contact">Full Name</Label>
            <Input id="name-contact" name="name" type="text" required className="mt-1"/>
            {state.errors?.name && (
              <p className="mt-1 text-sm text-destructive">{state.errors.name.join(", ")}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email-contact">Email Address</Label>
            <Input id="email-contact" name="email" type="email" required className="mt-1"/>
            {state.errors?.email && (
              <p className="mt-1 text-sm text-destructive">{state.errors.email.join(", ")}</p>
            )}
          </div>

          <div>
            <Label htmlFor="message-contact">Your Message</Label>
            <Textarea id="message-contact" name="message" rows={5} required className="mt-1"/>
            {state.errors?.message && (
              <p className="mt-1 text-sm text-destructive">{state.errors.message.join(", ")}</p>
            )}
          </div>
          
          <SubmitButton />
        </fieldset>
      </form>
      {pending && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/70 dark:bg-background/70 backdrop-blur-sm rounded-md">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}
