import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axios from 'axios';

const AboutUsSection = () => {
  const [whoWeAre, setWhoWeAre] = useState({
    content: `At Swastik Group, we're dedicated to honesty, openness, and quality work in each stage we do. We've successfully completed various projects that blend contemporary design with luxury. We're proud to build durable homes and buildings that are built to last expectations and leave a positive mark in the construction landscape.

Our commitment to excellence and innovation drives us to create spaces that not only meet but exceed expectations, establishing lasting relationships built on trust and quality craftsmanship.`,
    image_url: '/assets/about-interior.jpg'
  });

  const [valuesVisionMission, setValuesVisionMission] = useState({
    values: "Integrity, transparency, and excellence form the foundation of everything we do.",
    vision: "To be Mumbai's most trusted real estate developer, creating sustainable communities.",
    mission: "Building quality homes that blend contemporary design with innovation and sustainability.",
    image_url: '/assets/lifestyle-interior.jpg'
  });

  const [ourPresence, setOurPresence] = useState({
    locations: ["Chembur", "Ghatkopar", "Vikhroli", "Mulund", "Powai", "Andheri"]
  });

  const stats = [
    { value: "25+", label: "Years of Excellence" },
    { value: "1.5", label: "Million Sq. Ft. Developed" },
    { value: "1500+", label: "Happy Families" },
    { value: "6.5", label: "Lakh Sq. Ft. Under Construction" },
    { value: "22", label: "Successful Projects" },
    { value: "7", label: "Upcoming Projects" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Who We Are
        const whoWeAreResponse = await axios.get('http://localhost:5000/api/content/who-we-are');
        console.log('Fetched who_we_are:', whoWeAreResponse.data);
        setWhoWeAre(whoWeAreResponse.data);

        // Fetch Values, Vision, Mission
        const vvmResponse = await axios.get('http://localhost:5000/api/content/values-vision-mission');
        console.log('Fetched values_vision_mission:', vvmResponse.data);
        setValuesVisionMission(vvmResponse.data);

        // Fetch Our Presence
        const presenceResponse = await axios.get('http://localhost:5000/api/content/our-presence');
        console.log('Fetched our_presence:', presenceResponse.data);
        setOurPresence(presenceResponse.data);
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

  return (
    <section id="about" className="py-20 bg-gradient-light">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Who we are section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
                Who we are?
              </h2>
              <div className="w-20 h-1 bg-brand-blue rounded-full mb-6"></div>
            </div>
            
            <div className="space-y-4 text-lg text-brand-gray leading-relaxed">
              {whoWeAre.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <Link to="/about-us">
              <Button variant="brand" size="lg" className="mt-6">
                Know More
              </Button>
            </Link>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="relative overflow-hidden custom-image-radius shadow-2xl">
              <img 
                src={whoWeAre.image_url} 
                alt="Modern interior architecture"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500 custom-image-radius"
              />
            </div>
          </div>
        </div>

        {/* Values, Vision, Mission section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div className="order-2 lg:order-1 relative animate-slide-up">
            <div className="relative overflow-hidden custom-image-radius shadow-2xl">
              <img 
                src={valuesVisionMission.image_url} 
                alt="Modern lifestyle interior"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500 custom-image-radius"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-brand transition-all duration-300">
                <h3 className="text-xl font-bold text-brand-navy mb-3">Our Values</h3>
                <p className="text-brand-gray">{valuesVisionMission.values}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-brand transition-all duration-300">
                <h3 className="text-xl font-bold text-brand-navy mb-3">Our Vision</h3>
                <p className="text-brand-gray">{valuesVisionMission.vision}</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-brand transition-all duration-300">
                <h3 className="text-xl font-bold text-brand-navy mb-3">Our Mission</h3>
                <p className="text-brand-gray">{valuesVisionMission.mission}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Presence section */}
        <div className="bg-gradient-brand rounded-2xl p-8 lg:p-12 shadow-brand animate-fade-in mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 text-center">Our Presence</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ourPresence.locations.map((location, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-lg font-semibold">{location}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="bg-gradient-brand rounded-2xl p-8 lg:p-12 shadow-brand animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm lg:text-base opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;