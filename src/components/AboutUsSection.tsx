import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import aboutInterior from "@/assets/about-interior.jpg";
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";

const AboutUsSection = () => {
  const stats = [
    { value: "25+", label: "Years of Excellence" },
    { value: "1.5", label: "Million Sq. Ft. Developed" },
    { value: "1500+", label: "Happy Families" },
    { value: "6.5", label: "Lakh Sq. Ft. Under Construction" },
    { value: "22", label: "Successful Projects" },
    { value: "7", label: "Prime Locations" },
  ];

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
              <p>
                At Swastik Group, we're dedicated to honesty, openness, and 
                quality work in each stage we do. We've successfully 
                completed various projects that blend contemporary design with 
                luxury. We're proud to build durable homes and buildings that 
                are built to last expectations and leave a positive mark in the 
                construction landscape.
              </p>
              
              <p>
                Our commitment to excellence and innovation drives us to create 
                spaces that not only meet but exceed expectations, establishing 
                lasting relationships built on trust and quality craftsmanship.
              </p>
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
                src={aboutInterior} 
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
                src={lifestyleInterior} 
                alt="Modern lifestyle interior"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500 custom-image-radius"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-brand transition-all duration-300">
                <h3 className="text-xl font-bold text-brand-navy mb-3">Our Values</h3>
                <p className="text-brand-gray">
                  Integrity, transparency, and excellence form the foundation of everything we do.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-brand transition-all duration-300">
                <h3 className="text-xl font-bold text-brand-navy mb-3">Our Vision</h3>
                <p className="text-brand-gray">
                  To be Mumbai's most trusted real estate developer, creating sustainable communities.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-card hover:shadow-brand transition-all duration-300">
                <h3 className="text-xl font-bold text-brand-navy mb-3">Our Mission</h3>
                <p className="text-brand-gray">
                  Building quality homes that blend contemporary design with innovation and sustainability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="bg-gradient-brand rounded-2xl p-8 lg:p-12 shadow-brand animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
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
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;