import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import ContributeSection from "@/components/sections/contribute-section";
import EventsSection from "@/components/sections/events-section";
import SpeakersSection from "@/components/sections/speakers-section";
import GetInvolvedSection from "@/components/sections/get-involved-section";
import StoryBook from "@/components/sections/story-book";
import SupportSection from "@/components/sections/support-section";

// No props are being passed to Home, so we can simplify the component definition.
export default function Home() {
  // Logic for contribution_success, contribution_canceled, etc.,
  // is handled on other pages or via components, so no logic is needed here.
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <StoryBook />
        <SupportSection />
        <ContributeSection />
        <EventsSection />
        <SpeakersSection />
        <GetInvolvedSection />
      </main>
      <Footer />
    </div>
  );
}
