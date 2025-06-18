
"use server";

import { z } from "zod";
import { analyzeContactFormSentiment } from "@/ai/flows/analyze-contact-form-sentiment";

// Newsletter Form
const NewsletterFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export async function submitNewsletterForm(prevState: any, formData: FormData) {
  const validatedFields = NewsletterFormSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid email. Please try again.",
    };
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log("Newsletter signup:", validatedFields.data.email);
  }
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { message: "Thank you for subscribing to our newsletter!" };
}


// Volunteer Form
const VolunteerFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().optional(),
  interests: z.string().min(10, { message: "Please tell us a bit about your interests (min 10 characters)." }),
});

export async function submitVolunteerForm(prevState: any, formData: FormData) {
  const validatedFields = VolunteerFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    interests: formData.get("interests"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors and try again.",
    };
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log("Volunteer signup:", validatedFields.data);
  }
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { message: "Thank you for your interest in volunteering! We will be in touch soon." };
}


// Contact Form
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors and try again.",
    };
  }

  const { name, email, message } = validatedFields.data;

  try {
    const sentimentAnalysis = await analyzeContactFormSentiment({ message });
    if (process.env.NODE_ENV !== 'production') {
      console.log("Contact Form Submission:", { name, email, message });
      console.log("Sentiment Analysis:", sentimentAnalysis);
    }

    // You could add logic here based on sentiment (e.g., if urgent, send notification)
    if (sentimentAnalysis.urgency === "urgent" || sentimentAnalysis.sentiment === "negative") {
      console.warn("URGENT/NEGATIVE FEEDBACK RECEIVED:", { name, email, sentiment: sentimentAnalysis.sentiment, urgency: sentimentAnalysis.urgency });
      // Potentially send an email to admin, log to a special system, etc.
    }

    return { message: "Thank you for your message! We've received it and will get back to you soon." };
  } catch (error) {
    console.error("Error processing contact form:", error);
    return { message: "An error occurred while submitting your message. Please try again later." };
  }
}
