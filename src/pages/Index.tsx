
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import ProjectsSection from "@/components/ProjectsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import StackedCards from "@/components/StackedCards";
import ValuesMissionVisionCards from "@/components/ValuesMissionVisionCards";
import PresencesSection from "@/components/PresencesSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import BlogsSection from "@/components/BlogsSection";
import EMICalculator from "@/components/EMICalculator";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";

const Index = () => {
  const cardData = [
    {
      id: 'values',
      colors: ['hsl(var(--values-bg))', 'hsl(var(--values-bg))'] as [string, string],
      borderColor: 'rgba(255, 255, 255, 0.2)',
      content: (
        <div className="w-full">
          <div className="hidden md:flex">
            <div className="flex-1 bg-values-bg p-8 lg:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-brand-navy mb-4">
                    Our Values
                  </h3>
                  <div className="w-16 h-1 bg-brand-blue rounded-full mb-6"></div>
                </div>
                <p className="text-brand-gray leading-relaxed text-lg">
                  Integrity, transparency, and excellence form the foundation of everything we do.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative h-full min-h-[300px]">
                <img 
                  src={lifestyleInterior}
                  alt="Our Values"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5"></div>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <div className="relative h-48">
              <img 
                src={lifestyleInterior}
                alt="Our Values"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="bg-values-bg p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3">
                    Our Values
                  </h3>
                  <div className="w-12 h-1 bg-brand-blue rounded-full mb-4"></div>
                </div>
                <p className="text-brand-gray leading-relaxed">
                  Integrity, transparency, and excellence form the foundation of everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'vision',
      colors: ['hsl(var(--vision-bg))', 'hsl(var(--vision-bg))'] as [string, string],
      borderColor: 'rgba(255, 255, 255, 0.2)',
      content: (
        <div className="w-full">
          <div className="hidden md:flex">
            <div className="flex-1 bg-vision-bg p-8 lg:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-brand-navy mb-4">
                    Our Vision
                  </h3>
                  <div className="w-16 h-1 bg-brand-blue rounded-full mb-6"></div>
                </div>
                <p className="text-brand-gray leading-relaxed text-lg">
                  To be Mumbai's most trusted real estate developer, creating sustainable communities.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative h-full min-h-[300px]">
                <img 
                  src={lifestyleInterior}
                  alt="Our Vision"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5"></div>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <div className="relative h-48">
              <img 
                src={lifestyleInterior}
                alt="Our Vision"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="bg-vision-bg p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3">
                    Our Vision
                  </h3>
                  <div className="w-12 h-1 bg-brand-blue rounded-full mb-4"></div>
                </div>
                <p className="text-brand-gray leading-relaxed">
                  To be Mumbai's most trusted real estate developer, creating sustainable communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mission',
      colors: ['hsl(var(--mission-bg))', 'hsl(var(--mission-bg))'] as [string, string],
      borderColor: 'rgba(255, 255, 255, 0.2)',
      content: (
        <div className="w-full">
          <div className="hidden md:flex">
            <div className="flex-1 bg-mission-bg p-8 lg:p-12 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-brand-navy mb-4">
                    Our Mission
                  </h3>
                  <div className="w-16 h-1 bg-brand-blue rounded-full mb-6"></div>
                </div>
                <p className="text-brand-gray leading-relaxed text-lg">
                  Building quality homes that blend contemporary design with innovation and sustainability.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative h-full min-h-[300px]">
                <img 
                  src={lifestyleInterior}
                  alt="Our Mission"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5"></div>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <div className="relative h-48">
              <img 
                src={lifestyleInterior}
                alt="Our Mission"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="bg-mission-bg p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3">
                    Our Mission
                  </h3>
                  <div className="w-12 h-1 bg-brand-blue rounded-full mb-4"></div>
                </div>
                <p className="text-brand-gray leading-relaxed">
                  Building quality homes that blend contemporary design with innovation and sustainability.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light-blue/20 via-background to-background">
      <Header />
      <HeroSection />
      <AboutUsSection />
      {/* Values, Vision & Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
            Our Values, Vision & Mission
          </h2>
          <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-brand-gray max-w-4xl mx-auto leading-relaxed">
            The core principles and aspirations that guide our journey in creating exceptional real estate experiences.
          </p>
        </div>
        <StackedCards cards={cardData} />
      </section>
      
      {/* Stats section */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-brand p-8 lg:p-12 shadow-brand animate-fade-in" style={{ borderRadius: '20px 60px 20px 60px' }}>
            {/* Desktop Grid Layout */}
            <div className="hidden lg:grid lg:grid-cols-6 gap-8">
              {[
                { value: "25+", label: "Years of Excellence" },
                { value: "1.5", label: "Million Sq. Ft. Developed" },
                { value: "1500+", label: "Happy Families" },
                { value: "6.5", label: "Lakh Sq. Ft. Under Construction" },
                { value: "22", label: "Successful Projects" },
                { value: "7", label: "Prime Locations" }
              ].map((stat, index) => (
                <div key={index} className="text-center text-white">
                  <div className="text-3xl lg:text-4xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm lg:text-base opacity-90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile/Tablet Marquee Layout */}
            <div className="lg:hidden overflow-hidden">
              <div className="flex animate-marquee hover:pause">
                {/* First set of cards */}
                {[
                  { value: "25+", label: "Years of Excellence" },
                  { value: "1.5", label: "Million Sq. Ft. Developed" },
                  { value: "1500+", label: "Happy Families" },
                  { value: "6.5", label: "Lakh Sq. Ft. Under Construction" },
                  { value: "22", label: "Successful Projects" },
                  { value: "7", label: "Prime Locations" }
                ].map((stat, index) => (
                  <div key={`first-${index}`} className="text-center text-white min-w-[160px] flex-shrink-0 mx-4">
                    <div className="text-3xl font-bold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm opacity-90 whitespace-normal">
                      {stat.label}
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {[
                  { value: "25+", label: "Years of Excellence" },
                  { value: "1.5", label: "Million Sq. Ft. Developed" },
                  { value: "1500+", label: "Happy Families" },
                  { value: "6.5", label: "Lakh Sq. Ft. Under Construction" },
                  { value: "22", label: "Successful Projects" },
                  { value: "7", label: "Prime Locations" }
                ].map((stat, index) => (
                  <div key={`second-${index}`} className="text-center text-white min-w-[160px] flex-shrink-0 mx-4">
                    <div className="text-3xl font-bold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm opacity-90 whitespace-normal">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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
