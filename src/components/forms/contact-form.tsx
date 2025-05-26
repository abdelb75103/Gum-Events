
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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending} className="w-full">
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export default function ContactForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
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
        formRef.current?.reset(); // Reset form on successful submission
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={dispatch} className="space-y-6">
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
    </form>
  );
}

