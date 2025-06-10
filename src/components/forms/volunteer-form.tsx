
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useEffect, useRef } from "react"; // Added useRef
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitVolunteerForm } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} loading={pending} className="w-full">
      Submit Application
    </Button>
  );
}

export default function VolunteerForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(submitVolunteerForm, initialState);
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
    <form ref={formRef} action={dispatch} className="space-y-6"> {/* Added formRef */}
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
