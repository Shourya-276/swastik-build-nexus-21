import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import socialInterior1 from "@/assets/social-interior-1.jpg";
import amenityPool from "@/assets/amenity-pool.jpg";
import amenityGym from "@/assets/amenity-gym.jpg";
import projectTower1 from "@/assets/project-tower-1.jpg";
import projectTower2 from "@/assets/project-tower-2.jpg";
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";

const SocialMediaSection = () => {
  const [socialImages, setSocialImages] = useState([
    { src: socialInterior1, alt: 'Modern living room interior' },
    { src: amenityPool, alt: 'Luxury swimming pool' },
    { src: projectTower1, alt: 'Modern residential tower' },
    { src: amenityGym, alt: 'State-of-the-art gym' },
    { src: projectTower2, alt: 'Contemporary building exterior' },
    { src: lifestyleInterior, alt: 'Elegant home interior' }
  ]);

  useEffect(() => {
    const fetchSocialMediaPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/content/social-media-posts');
        console.log('Fetched social_media_posts:', response.data);
        const data = response.data;
        const images = [
          { src: data.image_1_url, alt: data.image_1_alt },
          { src: data.image_2_url, alt: data.image_2_alt },
          { src: data.image_3_url, alt: data.image_3_alt },
          { src: data.image_4_url, alt: data.image_4_alt },
          { src: data.image_5_url, alt: data.image_5_alt },
          { src: data.image_6_url, alt: data.image_6_alt }
        ].filter(img => img.src); // Filter out undefined images
        if (images.length > 0) {
          setSocialImages(images);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          console.warn('No social media posts found, using defaults');
        } else {
          console.error('Error fetching social media posts:', error.message, error.response?.data);
        }
      }
    };
    fetchSocialMediaPosts();
  }, []);

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <section id="social-media" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
            Social Media Post
          </h2>
          <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-8"></div>
          
          {/* Social Icons */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <Button
                key={social.label}
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-brand-light-blue/20 hover:bg-brand-blue hover:text-white transition-all duration-300 hover:scale-110"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <social.icon className="w-6 h-6" />
              </Button>
            ))}
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-4 gap-4 animate-slide-up max-w-6xl mx-auto">
          {socialImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden custom-image-radius group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-brand ${
                index === 0 || index === 5 ? 'col-span-2 row-span-2' : 'col-span-1'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full ${index === 0 || index === 5 ? 'h-80 md:h-96' : 'h-38 md:h-46'} object-cover group-hover:scale-110 transition-transform duration-500 custom-image-radius`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <p className={`font-medium ${index === 0 || index === 5 ? 'text-sm' : 'text-xs'}`}>
                  {image.alt}
                </p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className={`bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ${index === 0 || index === 5 ? 'w-8 h-8' : 'w-6 h-6'}`}>
                  <Instagram className={`${index === 0 || index === 5 ? 'w-4 h-4' : 'w-3 h-3'} text-white`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-brand-gray mb-4">
            Follow us on social media for the latest updates and behind-the-scenes content
          </p>
          <Button variant="brand" size="lg">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;