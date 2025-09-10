
"use client";

import Container from "@/components/ui/container";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { BookOpenText, CheckCircle2 } from "lucide-react"; 
import OurImpactSection from "@/components/sections/our-impact-section";
import OurStorySection from "@/components/sections/our-story-section";

export default function OurStoryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <div className="py-16 sm:py-24">
            <OurStorySection />
            <OurImpactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

