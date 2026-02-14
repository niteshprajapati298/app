import Hero from "./components/Hero/Hero";
import LogoMarquee from "./components/LogoMarquee/LogoMarquee";
import ServicesSection from "./components/Services/ServicesSection";
import ProcessSection from "./components/Process/ProcessSection";
import ResultsSection from "./components/Results/ResultsSection";
import PhilosophySection from "./components/PhilosophySection/PhilosophySection";
import FaqSection from "./components/Faq/FaqSection";
import TestimonialSection from "./components/TestimonialSection/TestimonialSection";
import WhySection from "./components/Why/WhySection";
import FounderPerspective from "./components/FounderPerspective/FounderPerspective";
import CtaSection from "./components/CtaSection/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <ServicesSection />
      <ProcessSection />
      <ResultsSection />
      <PhilosophySection />
      <FaqSection />
      <TestimonialSection />
      <WhySection />
      <FounderPerspective />
      <CtaSection />
    </>
  );
}
