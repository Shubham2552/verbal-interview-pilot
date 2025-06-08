
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import AudienceSurvey from "@/components/landing/AudienceSurvey";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <BenefitsSection />
        <TestimonialsSection />
        <AudienceSurvey />
        <FAQSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
