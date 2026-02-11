import Hero from "./components/Hero/Hero";
import ServicesSection from "./components/Services/ServicesSection";
import ProcessSection from "./components/Process/ProcessSection";
import ResultsSection from "./components/Results/ResultsSection";
import WhySection from "./components/Why/WhySection";
import CtaSection from "./components/CtaSection/CtaSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProcessSection />
      <ResultsSection />
      <WhySection />
      <CtaSection />
    </>
  );
}
