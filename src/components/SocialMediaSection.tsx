import { Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import socialInterior1 from "@/assets/social-interior-1.jpg";
import amenityPool from "@/assets/amenity-pool.jpg";
import amenityGym from "@/assets/amenity-gym.jpg";
import projectTower1 from "@/assets/project-tower-1.jpg";
import projectTower2 from "@/assets/project-tower-2.jpg";
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";

const SocialMediaSection = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const socialImages = [
    { src: socialInterior1, alt: "Modern living room interior" },
    { src: amenityPool, alt: "Luxury swimming pool" },
    { src: projectTower1, alt: "Modern residential tower" },
    { src: amenityGym, alt: "State-of-the-art gym" },
    { src: projectTower2, alt: "Contemporary building exterior" },
    { src: lifestyleInterior, alt: "Elegant home interior" },
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
          {/* First large image */}
          <div className="col-span-2 row-span-2 relative overflow-hidden custom-image-radius group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-brand">
            <img
              src={socialImages[0].src}
              alt={socialImages[0].alt}
              className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-500 custom-image-radius"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <p className="text-sm font-medium">{socialImages[0].alt}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Instagram className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Small vertical images - right side */}
          <div className="col-span-1 relative overflow-hidden custom-image-radius group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-brand">
            <img
              src={socialImages[1].src}
              alt={socialImages[1].alt}
              className="w-full h-38 md:h-46 object-cover group-hover:scale-110 transition-transform duration-500 custom-image-radius"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <p className="text-xs font-medium">{socialImages[1].alt}</p>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Instagram className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <div className="col-span-1 relative overflow-hidden custom-image-radius group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-brand">
            <img
              src={socialImages[2].src}
              alt={socialImages[2].alt}
              className="w-full h-38 md:h-46 object-cover group-hover:scale-110 transition-transform duration-500 custom-image-radius"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <p className="text-xs font-medium">{socialImages[2].alt}</p>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Instagram className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <div className="col-span-1 relative overflow-hidden custom-image-radius group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-brand">
            <img
              src={socialImages[3].src}
              alt={socialImages[3].alt}
              className="w-full h-38 md:h-46 object-cover group-hover:scale-110 transition-transform duration-500 custom-image-radius"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <p className="text-xs font-medium">{socialImages[3].alt}</p>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Instagram className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <div className="col-span-1 relative overflow-hidden custom-image-radius group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-brand">
            <img
              src={socialImages[4].src}
              alt={socialImages[4].alt}
              className="w-full h-38 md:h-46 object-cover group-hover:scale-110 transition-transform duration-500 custom-image-radius"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <p className="text-xs font-medium">{socialImages[4].alt}</p>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Instagram className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Second large image */}
          <div className="col-span-2 row-span-2 relative overflow-hidden custom-image-radius group cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-brand">
            <img
              src={socialImages[5].src}
              alt={socialImages[5].alt}
              className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-500 custom-image-radius"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <p className="text-sm font-medium">{socialImages[5].alt}</p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Instagram className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
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