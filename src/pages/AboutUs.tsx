import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectsSection from '@/components/ProjectsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import BlogsSection from '@/components/BlogsSection';
import FAQSection from '@/components/FAQSection';
import { useStackedCards } from '@/hooks/useStackedCards';
import axios from 'axios';
import aboutInterior from '@/assets/about-interior.jpg';
import lifestyleInterior from '@/assets/lifestyle-interior.jpg';

const AboutUs = () => {
  const [ourBusiness, setOurBusiness] = useState({
    description: `Swastik Group is a prime real estate company. We are known for our honesty, transparency, and the best. Premium quality work. As we've been working around for more than 25 years and creating amazing homes and business spaces that redefine luxury living. We focus on doing things correctly, and meeting deadlines. This approach has made us leaders in the real estate industry, respected for our commitment to ensuring our customers are satisfied with our work.`,
    image_url: aboutInterior
  });

  const [aboutUs, setAboutUs] = useState({
    content: `At Swastik Group, we're dedicated to honesty, openness, and quality work in each single thing we do. We've successfully completed various projects that blend contemporary design with luxury. We're proud to build durable homes and buildings that reflects comfortable living. With a committed and talented team, we aim to top expectations and leave a positive mark in the communities we serve.`,
    image_url: lifestyleInterior
  });

  const [whyChooseUs, setWhyChooseUs] = useState({
    description: "Our projects are known for their top-notch craftsmanship, smart design, and solid construction, giving customers great value.",
    features: [
      { title: "Timely Delivery", description: "We're proud to finish projects on time within the delivery date." },
      { title: "Professional Team", description: "Our experienced team always aims for excellence, from planning projects to helping customers." },
      { title: "Market Leadership", description: "We're leaders in redevelopment, known for quality work, on-time delivery, and being open with customers and partners." },
      { title: "Minimal Bureaucracy", description: "Our simple processes and 24/7 help make things easy for clients, creating a friendly and supportive atmosphere." }
    ]
  });

  const [projectsDescription, setProjectsDescription] = useState({
    description: `Over the years, In Swastik Group we completed more than 1 million square feet of high-quality homes and offices in Mumbai MMR, Nashik, Talegaon, and Shirdi. Our projects include tall buildings, modern office and shopping areas, and comfortable homes. Each project is carefully planned and built to show our dedication to quality, creativity, and customer satisfaction.`
  });

  const [statistics, setStatistics] = useState({
    years_of_excellence: '25+',
    million_sq_ft_developed: '1.5',
    happy_families: '1500+',
    lakh_sq_ft_under_construction: '6.5',
    successful_projects: '22',
    prime_locations: '7'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Our Business
        const ourBusinessResponse = await axios.get('http://localhost:5000/api/content/our-business');
        console.log('Fetched our_business:', ourBusinessResponse.data);
        setOurBusiness(ourBusinessResponse.data);

        // Fetch About Us
        const aboutUsResponse = await axios.get('http://localhost:5000/api/content/about-us');
        console.log('Fetched about_us:', aboutUsResponse.data);
        setAboutUs(aboutUsResponse.data);

        // Fetch Why Choose Us
        const whyChooseUsResponse = await axios.get('http://localhost:5000/api/content/why-choose-us');
        console.log('Fetched why_choose_us:', whyChooseUsResponse.data);
        setWhyChooseUs(whyChooseUsResponse.data);

        // Fetch Projects Description
        const projectsDescriptionResponse = await axios.get('http://localhost:5000/api/content/projects-description');
        console.log('Fetched projects_description:', projectsDescriptionResponse.data);
        setProjectsDescription(projectsDescriptionResponse.data);

        // Fetch Company Statistics
        const statisticsResponse = await axios.get('http://localhost:5000/api/content/company-statistics');
        console.log('Fetched company_statistics:', statisticsResponse.data);
        setStatistics(statisticsResponse.data);
      } catch (error) {
        if (error.response?.status === 404) {
          console.warn('No data found, using defaults');
        } else {
          console.error('Error fetching data:', error.message, error.response?.data);
        }
      }
    };
    fetchData();
  }, []);

  const stackedCardsData = [
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

  const { containerRef, getCardStyle } = useStackedCards({ 
    cards: stackedCardsData,
    cardHeight: 700 
  });

  const statsConfig = [
    { key: 'years_of_excellence', label: 'Years of Experience', value: statistics.years_of_excellence, suffix: '' },
    { key: 'million_sq_ft_developed', label: 'sq. ft. developed', value: statistics.million_sq_ft_developed, suffix: 'Million' },
    { key: 'happy_families', label: 'Happy Families', value: statistics.happy_families, suffix: '' },
    { key: 'lakh_sq_ft_under_construction', label: 'sq. ft. ongoing', value: statistics.lakh_sq_ft_under_construction, suffix: 'Lakh' },
    { key: 'successful_projects', label: 'Projects are completed', value: statistics.successful_projects, suffix: '' },
    { key: 'prime_locations', label: 'Projects which are ongoing', value: statistics.prime_locations, suffix: '' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Our Business Section */}
      <section className="py-10 lg:py-12 relative bg-[#EEF8FF]">
        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#EEF8FF]">
          <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
                  Our Business
                </h2>
                <div className="w-16 h-1 bg-brand-blue mb-6"></div>
              </div>
              
              <div className="text-gray-600 leading-relaxed space-y-4">
                {ourBusiness.description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="order-first lg:order-last">
              <div className="relative">
                <img 
                  src={ourBusiness.image_url} 
                  alt="Business Overview" 
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-10 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-r from-brand-blue to-blue-700 rounded-3xl px-8 py-12 text-white">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
              {statsConfig.map((stat) => (
                <div key={stat.key}>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                    {stat.value} {stat.suffix ? <span className="text-lg">{stat.suffix}</span> : null}
                  </h3>
                  <p className="text-sm lg:text-base opacity-90">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-10 lg:py-12 relative bg-[#EEF8FF]">
        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#EEF8FF]">
          <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <img 
                src={aboutUs.image_url} 
                alt="About Us" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
            
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
                  About Us
                </h2>
                <div className="w-16 h-1 bg-brand-blue mb-6"></div>
              </div>
              
              <div className="text-gray-600 leading-relaxed space-y-4">
                {aboutUs.content.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Values, Vision & Mission Section */}
      <section className="py-10 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div 
            ref={containerRef}
            className="relative h-[200vh]"
          >
            <div className="sticky top-0 h-screen flex items-center justify-center">
              <div className="relative w-full max-w-6xl">
                {stackedCardsData.map((card, index) => (
                  <div
                    key={card.id}
                    className="absolute inset-0 w-full"
                    style={getCardStyle(index)}
                  >
                    {card.content}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Us
            </h2>
            <div className="w-16 h-1 bg-brand-blue mx-auto mb-8"></div>
          </div>
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-gray-600 leading-relaxed text-lg">
              {whyChooseUs.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-card hover:shadow-brand transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Projects Description Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Our Projects
            </h2>
            <div className="w-16 h-1 bg-brand-blue mx-auto mb-8"></div>
          </div>
          
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-gray-600 leading-relaxed text-lg">
              {projectsDescription.description}
            </p>
          </div>
        </div>
      </section>
      
      {/* Projects Cards Section */}
      <ProjectsSection />

      {/* Why Choose Us Section (Component) */}
      <WhyChooseUsSection />

      {/* Blogs Section */}
      <section className="py-10 lg:py-12 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <BlogsSection />
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-10 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <FAQSection />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;