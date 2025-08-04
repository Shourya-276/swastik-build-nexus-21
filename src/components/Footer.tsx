import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import swastikLogo from "@/assets/swastik-logo.png";

const Footer = () => {
  const quickLinks = [
    {
      title: "1 BHK Flats",
      locations: ["Ghatkopar", "Mulund", "Chembur", "Vikhroli"]
    },
    {
      title: "2 BHK Flats", 
      locations: ["Ghatkopar", "Mulund", "Chembur", "Vikhroli"]
    },
    {
      title: "3 BHK Flats",
      locations: ["Ghatkopar", "Mulund", "Chembur", "Vikhroli"]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-brand-navy text-white">
      {/* Contact CTA Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone */}
            <div className="text-center group">
              <Button 
                variant="ghost" 
                size="lg"
                className="w-full h-auto flex-col space-y-4 p-6 bg-white/5 hover:bg-brand-blue/20 border border-white/10 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">+91-22-6589 0000</p>
                  <p className="text-white/70 mt-1">Give Us A Call</p>
                </div>
              </Button>
            </div>

            {/* Email */}
            <div className="text-center group">
              <Button 
                variant="ghost" 
                size="lg"
                className="w-full h-auto flex-col space-y-4 p-6 bg-white/5 hover:bg-brand-blue/20 border border-white/10 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">sales@swastikgroup.in</p>
                  <p className="text-white/70 mt-1">Drop Us A Line</p>
                </div>
              </Button>
            </div>

            {/* Enquiry */}
            <div className="text-center group">
              <Button 
                variant="brand" 
                size="lg"
                className="w-full h-auto flex-col space-y-4 p-6 hover:scale-105 shadow-brand"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-2xl font-bold">Enquiry Now</p>
                  <p className="text-white/90 mt-1">Click to Connect Instantly</p>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <img src={swastikLogo} alt="Swastik Group" className="h-12 w-auto mb-4 filter brightness-0 invert" />
              <h3 className="text-xl font-bold mb-2">Corporate Office</h3>
            </div>
            <div className="space-y-2 text-white/80 text-sm leading-relaxed">
              <p className="font-semibold text-white">SWASTIK BUILDERS AND DEVELOPERS LLP</p>
              <p>312, Swastik DSK Corporate Park 6A,</p>
              <p>Mingra Opp. Shreeyes Cinema,</p>
              <p>Ghatkopar West, Mumbai 400086, INDIA</p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-white/60 italic">
                Over 25 years of trust, timely delivery,<br />
                and premium real estate across<br />
                Mumbai and beyond.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          {quickLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
              <div className="space-y-2">
                {section.locations.map((location) => (
                  <a
                    key={location}
                    href={`#${location.toLowerCase()}`}
                    className="block text-white/80 hover:text-brand-light-blue transition-colors text-sm"
                  >
                    {location}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-white/80 mr-2">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-brand-blue transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right text-sm text-white/60 space-y-1">
              <p>Copyright 2025 | All Rights Reserved By Swastik Group</p>
              <p>
                Developed by Signature Advertising | 
                <a href="#privacy" className="hover:text-brand-light-blue transition-colors ml-2">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;