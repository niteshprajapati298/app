import Hero from "./components/Hero/Hero";
import LogoMarquee from "./components/LogoMarquee/LogoMarquee";
import ServicesSection from "./components/Services/ServicesSection";
import ProcessSection from "./components/Process/ProcessSection";
import ResultsSection from "./components/Results/ResultsSection";
import FaqSection from "./components/Faq/FaqSection";
import TestimonialSection from "./components/TestimonialSection/TestimonialSection";
import WhySection from "./components/Why/WhySection";
import FounderPerspective from "./components/FounderPerspective/FounderPerspective";
import ContactForm from "./components/ContactForm/ContactForm";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <ServicesSection />
      <ProcessSection />
      <ResultsSection />
      <FaqSection />
      <TestimonialSection />
      <FounderPerspective />
      <ContactForm />
    </>
  );
}
