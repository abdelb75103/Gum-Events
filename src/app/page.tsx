
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import OurStorySection from "@/components/sections/our-story-section";
import OurImpactSection from "@/components/sections/our-impact-section";
import ContributeSection from "@/components/sections/contribute-section";
import EventsSection from "@/components/sections/events-section";
import SpeakersSection from "@/components/sections/speakers-section";
import VolunteerSection from "@/components/sections/volunteer-section";
import ContactSection from "@/components/sections/contact-section";
import ExpandableChatDemoSection from "@/components/sections/expandable-chat-demo-section";


interface HomePageProps {
  searchParams?: {
    contribution_success?: string;
    contribution_canceled?: string;
    session_id?: string;
  };
}

export default async function Home({ searchParams: searchParamsProp }: HomePageProps) {
  const searchParams = await Promise.resolve(searchParamsProp);
  const showContributionSuccess = searchParams?.contribution_success === 'true';
  // We could also handle contribution_canceled here if needed in the future

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <OurStorySection />
        <OurImpactSection />
        <ContributeSection displayContributionSuccess={showContributionSuccess} /> 
        <EventsSection />
        <SpeakersSection />
        <VolunteerSection />
        <ContactSection />
        <ExpandableChatDemoSection />
      </main>
      <Footer />
    </div>
  );
}
