import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-cityscape.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
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
              Find Your Dream
              <span className="block bg-gradient-to-r from-brand-light-blue to-white bg-clip-text text-transparent">
                Home Today
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Discover premium residential properties in Mumbai's most sought-after locations
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;