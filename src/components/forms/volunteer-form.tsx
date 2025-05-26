
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitVolunteerForm } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} disabled={pending} className="w-full">
      {pending ? "Submitting..." : "Submit Application"}
    </Button>
  );
}

export default function VolunteerForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(submitVolunteerForm, initialState);
  const { toast } = useToast();

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
        // Optionally reset form here if needed by managing form ref
      }
    }
  }, [state, toast]);

  return (
    <form action={dispatch} className="space-y-6">
      <div>
        <Label htmlFor="name-volunteer">Full Name</Label>
        <Input id="name-volunteer" name="name" type="text" required className="mt-1"/>
        {state.errors?.name && (
          <p className="mt-1 text-sm text-destructive">{state.errors.name.join(", ")}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email-volunteer">Email Address</Label>
        <Input id="email-volunteer" name="email" type="email" required className="mt-1"/>
        {state.errors?.email && (
          <p className="mt-1 text-sm text-destructive">{state.errors.email.join(", ")}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone-volunteer">Phone Number (Optional)</Label>
        <Input id="phone-volunteer" name="phone" type="tel" className="mt-1"/>
         {state.errors?.phone && (
          <p className="mt-1 text-sm text-destructive">{state.errors.phone.join(", ")}</p>
        )}
      </div>

      <div>
        <Label htmlFor="interests-volunteer">Why are you interested in volunteering? (Briefly describe your interests/skills)</Label>
        <Textarea id="interests-volunteer" name="interests" rows={4} required className="mt-1"/>
        {state.errors?.interests && (
          <p className="mt-1 text-sm text-destructive">{state.errors.interests.join(", ")}</p>
        )}
      </div>
      
      <SubmitButton />
    </form>
  );
}
