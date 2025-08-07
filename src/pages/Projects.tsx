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
      
      {/* Top Navigation Bar */}
      <div className="bg-brand-blue text-white py-3">
        <div className="container mx-auto px-4 flex items-center space-x-6 text-sm">
          <button className="flex items-center space-x-1 hover:text-brand-light">
            <span>Location</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="flex items-center space-x-1 hover:text-brand-light">
            <span>Property Type</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="flex items-center space-x-1 hover:text-brand-light">
            <span>Configuration</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="ml-auto">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-brand-navy mb-6">
            Our Projects
          </h1>
          
          {/* Tab Navigation */}
          <div className="flex justify-center space-x-2 bg-gray-100 rounded-lg p-2 inline-flex mb-8">
            <Button
              variant={activeTab === 'completed' ? 'default' : 'ghost'}
              size="lg"
              onClick={() => setActiveTab('completed')}
              className={`px-8 ${activeTab === 'completed' ? 'bg-brand-blue text-white' : 'text-gray-600'}`}
            >
              Completed
            </Button>
            <Button
              variant={activeTab === 'ongoing' ? 'default' : 'ghost'}
              size="lg"
              onClick={() => setActiveTab('ongoing')}
              className={`px-8 ${activeTab === 'ongoing' ? 'bg-brand-blue text-white' : 'text-gray-600'}`}
            >
              Ongoing
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects[activeTab as keyof typeof projects].map((project) => (
            <Card key={project.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group border-0">              
              {/* Project Image with custom border radius */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  style={{
                    borderTopLeftRadius: '2rem',
                    borderTopRightRadius: '0',
                    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0% 100%)'
                  }}
                />
                <div className="absolute top-4 left-4 bg-brand-blue text-white px-3 py-1 rounded-full text-xs font-medium">
                  {project.tag}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center text-white text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-brand-navy">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.subtitle}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Configuration:</span>
                      <span className="font-medium">{project.configuration}</span>
                    </div>
                    <div className="text-brand-blue font-bold text-lg">
                      {project.price}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed">
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center text-brand-navy mb-8">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-8"></div>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                <div className="flex justify-between items-center">
                  <p className="text-brand-navy font-medium">{faq}</p>
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