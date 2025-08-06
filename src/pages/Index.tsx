import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import PresencesSection from "@/components/PresencesSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import BlogsSection from "@/components/BlogsSection";
import EMICalculator from "@/components/EMICalculator";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light-blue/20 via-background to-background">
      <Header />
      <HeroSection />
      <AboutUsSection />
      <ProjectsSection />
      <WhyChooseUsSection />
      <PresencesSection />
      <SocialMediaSection />
      <BlogsSection />
      <EMICalculator />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
