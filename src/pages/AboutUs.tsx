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
      id: 'mission',
      content: (
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </h2>
                <div className="w-16 h-1 bg-brand-blue mb-6"></div>
              </div>
              
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Our mission is to offer the best and quick real estate solutions that improve people's lives.
                </p>
                <p>
                  By staying true to our values of honesty, transparency, and commitment, we work hard to raise the standards in our industry and build strong, long-lasting relationships with our clients and partners.
                </p>
              </div>
            </div>
            
            <div className="order-first lg:order-last">
              <div className="relative">
                <img 
                  src={aboutInterior} 
                  alt="Our Mission" 
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'vision',
      content: (
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <img 
                src={lifestyleInterior} 
                alt="Our Vision" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Our Vision
                </h2>
                <div className="w-16 h-1 bg-brand-blue mb-6"></div>
              </div>
              
              <div className="text-gray-600 leading-relaxed space-y-4">
                <p>
                  Our vision is to enhance overall infrastructure, making life better and progress faster through innovative real estate projects. Our aim is to make it affordable for people to locate and purchase homes and office spaces.
                </p>
                <p>
                  We are committed to improving the quality and design of our properties. We want to build a better future for everyone through innovation, prioritizing sustainability, and Engaging with the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'values',
      content: (
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Our Values
                </h2>
                <div className="w-16 h-1 bg-brand-blue mb-6"></div>
              </div>
              
              <div className="text-gray-600 leading-relaxed space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• Transparency:</h3>
                  <p>We believe in open communication so that our customers informed about everything we do.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• Commitment:</h3>
                  <p>We always make sure to stick to deadlines and deliver the best and quality projects on time and within budget.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">• Excellence:</h3>
                  <p>From designing, building, serving customers, or managing projects we always aim for the best in everything we do.</p>
                </div>
              </div>
            </div>
            
            <div className="order-first lg:order-last">
              <div className="relative">
                <img 
                  src={aboutInterior} 
                  alt="Our Values" 
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
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
      </section>

      {/* Statistics Section */}
      <section className="py-12">
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
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <img 
                src={aboutUs.image_url} 
                alt="About Us" 
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
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
      </section>

      {/* Stacked Cards Section - Mission, Vision, Values */}
      <section className="py-24 lg:py-32">
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
      <BlogsSection />

      {/* FAQs Section */}
      <FAQSection />

      <Footer />
    </div>
  );
};

export default AboutUs;