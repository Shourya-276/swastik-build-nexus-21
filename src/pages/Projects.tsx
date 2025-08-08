import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import projectTower1 from '@/assets/project-tower-1.jpg';
import projectTower2 from '@/assets/project-tower-2.jpg';
import projectTower3 from '@/assets/project-tower-3.jpg';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('completed');

  const projects = {
    completed: [
      {
        id: 1,
        name: 'Swastik Pearl',
        subtitle: 'Residential',
        location: 'Ghatkopar West',
        price: 'Starting at ₹70 Lakhs*',
        image: projectTower1,
        configuration: '1,2,3 BHK',
        description: 'Experience luxury living with modern amenities and premium finishes.',
        tag: 'Enquiry Now'
      },
      {
        id: 2,
        name: 'Swastik Elegance',
        subtitle: 'Residential',
        location: 'Vikhroli East',
        price: 'Starting at ₹90 Lakhs*',
        image: projectTower2,
        configuration: '2,3,4 BHK',
        description: 'Premium high-rise apartments with scenic views and world-class facilities.',
        tag: 'Enquiry Now'
      },
      {
        id: 3,
        name: 'Swastik Onyx',
        subtitle: 'Residential',
        location: 'Mulund West',
        price: 'Starting at ₹85 Lakhs*',
        image: projectTower3,
        configuration: '1,2,3 BHK',
        description: 'Contemporary living spaces with sustainable design and smart features.',
        tag: 'Enquiry Now'
      },
      {
        id: 4,
        name: 'Swastik Pearl',
        subtitle: 'Residential',
        location: 'Ghatkopar West',
        price: 'Starting at ₹70 Lakhs*',
        image: projectTower1,
        configuration: '1,2,3 BHK',
        description: 'Experience luxury living with modern amenities and premium finishes.',
        tag: 'Enquiry Now'
      },
      {
        id: 5,
        name: 'Swastik Elegance',
        subtitle: 'Residential',
        location: 'Vikhroli East',
        price: 'Starting at ₹90 Lakhs*',
        image: projectTower2,
        configuration: '2,3,4 BHK',
        description: 'Premium high-rise apartments with scenic views and world-class facilities.',
        tag: 'Enquiry Now'
      },
      {
        id: 6,
        name: 'Swastik Onyx',
        subtitle: 'Residential',
        location: 'Mulund West',
        price: 'Starting at ₹85 Lakhs*',
        image: projectTower3,
        configuration: '1,2,3 BHK',
        description: 'Contemporary living spaces with sustainable design and smart features.',
        tag: 'Enquiry Now'
      },
      {
        id: 7,
        name: 'Swastik Onyx',
        subtitle: 'Residential',
        location: 'Mulund West',
        price: 'Starting at ₹85 Lakhs*',
        image: projectTower3,
        configuration: '1,2,3 BHK',
        description: 'Contemporary living spaces with sustainable design and smart features.',
        tag: 'Enquiry Now'
      }
    ],
    ongoing: [
      {
        id: 8,
        name: 'Swastik Crown',
        subtitle: 'Residential',
        location: 'Chembur East',
        price: 'Starting at ₹95 Lakhs*',
        image: projectTower1,
        configuration: '2,3,4 BHK',
        description: 'Ultra-modern residential tower under construction with premium amenities.',
        tag: 'Enquiry Now'
      },
      {
        id: 9,
        name: 'Swastik Palace',
        subtitle: 'Residential',
        location: 'Ghatkopar East',
        price: 'Starting at ₹80 Lakhs*',
        image: projectTower2,
        configuration: '1,2,3 BHK',
        description: 'Luxurious apartments with premium amenities and modern design.',
        tag: 'Enquiry Now'
      }
    ]
  };

  const faqs = [
    "What makes Swastik Group's value-based real estate a brilliant?",
    "What type of residential projects does Swastik Group offer in Mumbai?",
    "Why did we most choose Shoonya property companies in Mumbai?",
    "How does Swastik Group ensure quality and sustainability in its real estate projects?",
    "How can I learn more development opportunities and projects in Swastik Group in Mumbai?"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Top Navigation Bar - Ribbon Style */}
      <div className="w-full bg-gradient-brand py-3 md:py-4">
        {/* Mobile: Horizontal scrollable */}
        <div className="block md:hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-4 px-4 min-w-max">
              <button className="flex items-center gap-2 text-white font-medium px-4 py-2 focus:outline-none whitespace-nowrap flex-shrink-0">
                Location <span className="ml-1">&#9662;</span>
              </button>
              <button className="flex items-center gap-2 text-white font-medium px-4 py-2 focus:outline-none whitespace-nowrap flex-shrink-0">
                Property Type <span className="ml-1">&#9662;</span>
              </button>
              <button className="flex items-center gap-2 text-white font-medium px-4 py-2 focus:outline-none whitespace-nowrap flex-shrink-0">
                Configuration <span className="ml-1">&#9662;</span>
              </button>
              <button className="flex items-center justify-center text-white px-4 py-2 focus:outline-none flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop: Original layout */}
        <div className="hidden md:flex items-center justify-center gap-8 px-4">
          <button className="flex items-center gap-2 text-white font-medium px-4 py-2 focus:outline-none">
            Location <span className="ml-1">&#9662;</span>
          </button>
          <button className="flex items-center gap-2 text-white font-medium px-4 py-2 focus:outline-none">
            Property Type <span className="ml-1">&#9662;</span>
          </button>
          <button className="flex items-center gap-2 text-white font-medium px-4 py-2 focus:outline-none">
            Configuration <span className="ml-1">&#9662;</span>
          </button>
          <button className="flex items-center justify-center text-white px-4 py-2 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats Section removed for Projects page */}

      <main className="container mx-auto px-4 py-10 lg:py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold text-brand-navy mb-6">
            Our Projects
          </h1>
          <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-6"></div>
          
          {/* Tab Navigation */}
          <div className="flex justify-center space-x-2 bg-muted rounded-lg p-2 inline-flex mb-8">
            <Button
              variant={activeTab === 'completed' ? 'brand' : 'ghost'}
              size="lg"
              onClick={() => setActiveTab('completed')}
              className={`px-8 ${activeTab === 'completed' ? '' : 'text-brand-gray'}`}
            >
              Completed
            </Button>
            <Button
              variant={activeTab === 'ongoing' ? 'brand' : 'ghost'}
              size="lg"
              onClick={() => setActiveTab('ongoing')}
              className={`px-8 ${activeTab === 'ongoing' ? '' : 'text-brand-gray'}`}
            >
              Ongoing
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {projects[activeTab as keyof typeof projects].map((project) => (
            <Card key={project.id} className="overflow-hidden shadow-brand hover:shadow-brand/80 transition-shadow duration-300 relative group border-0 bg-white/80 backdrop-blur-sm">              
              {/* Project Image with custom border radius */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{
                    borderTopLeftRadius: '2rem',
                    borderTopRightRadius: '0',
                    borderBottomLeftRadius: '0',
                    borderBottomRightRadius: '0'
                  }}
                />
                <div className="absolute top-4 left-4 bg-gradient-brand text-white px-3 py-1 rounded-full text-xs font-medium">
                  {project.tag}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center text-white text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                </div>
              </div>
 
              <CardContent className="p-0">
                <div className="bg-[#EEF8FF] p-5">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-brand-navy">{project.name}</h3>
                      <p className="text-sm text-brand-gray">{project.subtitle}</p>
                      <div className="text-brand-blue font-bold text-lg mt-2">
                        {project.price}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-brand-gray text-base">Configuration:</span>
                        <span className="font-bold text-brand-navy text-lg">{project.configuration}</span>
                      </div>
                    </div>
                    <p className="text-brand-gray text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-muted/50 rounded-2xl p-8 lg:p-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-center text-brand-navy mb-8">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-8"></div>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 lg:p-6 shadow-sm border border-border/50">
                <div className="flex justify-between items-center">
                  <p className="text-brand-navy font-medium text-sm lg:text-base">{faq}</p>
                  <Button variant="ghost" size="sm" className="text-brand-blue">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;