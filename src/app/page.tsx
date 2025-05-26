import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import EventsSection from "@/components/sections/events-section";
import SpeakersSection from "@/components/sections/speakers-section";
import CommunitySection from "@/components/sections/community-section";
import VolunteerSection from "@/components/sections/volunteer-section";
import ContributeSection from "@/components/sections/contribute-section";
import ContactSection from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <EventsSection />
        <SpeakersSection />
        <CommunitySection />
        <VolunteerSection />
        <ContributeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
