
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect, useRef } from "react"; // Added useRef
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { submitNewsletterForm } from "@/app/actions";
import { Mail } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} loading={pending} className="w-full sm:w-auto">
      Subscribe
    </Button>
  );
}

export default function NewsletterForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(submitNewsletterForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null); // Added formRef

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
          title: "Success!",
          description: state.message,
        });
        formRef.current?.reset(); // Reset form on successful submission
      }
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={dispatch} className="mx-auto max-w-md space-y-4"> {/* Added formRef */}
      <div>
        <Label htmlFor="email-newsletter" className="sr-only">Email address</Label>
        <div className="relative">
           <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            id="email-newsletter"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            className="pl-10"
          />
        </div>
        {state.errors?.email && (
          <p className="mt-2 text-sm text-destructive">
            {state.errors.email.join(", ")}
          </p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
