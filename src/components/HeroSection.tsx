import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import axios from 'axios';

const HeroSection = () => {
  const [bannerData, setBannerData] = useState({
    heading: 'Find Your Dream Home Today',
    subtext: 'Discover premium residential properties in Mumbai\'s most sought-after locations',
    background_image: null,
  });

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/content/banner');
        setBannerData(response.data);
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };
    fetchBanner();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerData.background_image || '/default-hero-image.jpg'})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />
      </div>

      {/* Fixed Enquiry Button */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <Button
          variant="enquiry"
          size="lg"
          className="rounded-l-full rounded-r-none py-6 px-8 writing-mode-vertical-rl text-orientation-mixed shadow-brand"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Enquiry Now
        </Button>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Text */}
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {bannerData.heading.split(' ').slice(0, -1).join(' ')}
              <span className="block bg-gradient-to-r from-brand-light-blue to-white bg-clip-text text-transparent">
                {bannerData.heading.split(' ').slice(-1)}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              {bannerData.subtext}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;