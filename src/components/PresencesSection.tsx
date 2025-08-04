import { MapPin } from "lucide-react";

const PresencesSection = () => {
  const locations = [
    { name: "Chembur", active: true },
    { name: "Ghatkopar", active: true },
    { name: "Vikhroli", active: true },
    { name: "Mulund", active: true },
  ];

  return (
    <section id="presences" className="py-20 bg-gradient-light">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Map Illustration */}
          <div className="relative animate-fade-in">
            <div className="bg-white rounded-2xl p-8 shadow-card">
              {/* Simplified Mumbai Map */}
              <div className="relative h-96 bg-gradient-to-br from-brand-light-blue/30 to-brand-blue/20 rounded-xl overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    {/* Mumbai outline */}
                    <path 
                      d="M100 80 L120 60 L140 70 L160 50 L180 60 L200 40 L220 50 L240 45 L260 60 L280 70 L300 90 L320 110 L340 140 L350 170 L360 200 L365 230 L360 260 L350 290 L330 320 L300 340 L270 350 L240 355 L210 350 L180 340 L150 330 L120 310 L100 280 L90 250 L85 220 L90 190 L95 160 L100 130 L100 100 Z"
                      fill="currentColor"
                      className="text-brand-blue/40"
                    />
                  </svg>
                </div>
                
                {/* Location markers */}
                <div className="absolute top-1/4 left-1/3 animate-pulse">
                  <div className="w-4 h-4 bg-brand-blue rounded-full shadow-brand">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-brand-navy whitespace-nowrap">
                      Mulund
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 left-1/4 animate-pulse" style={{ animationDelay: '0.5s' }}>
                  <div className="w-4 h-4 bg-brand-blue rounded-full shadow-brand">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-brand-navy whitespace-nowrap">
                      Vikhroli
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-1/3 left-1/3 animate-pulse" style={{ animationDelay: '1s' }}>
                  <div className="w-4 h-4 bg-brand-blue rounded-full shadow-brand">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-brand-navy whitespace-nowrap">
                      Ghatkopar
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-1/4 left-1/2 animate-pulse" style={{ animationDelay: '1.5s' }}>
                  <div className="w-4 h-4 bg-brand-blue rounded-full shadow-brand">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-brand-navy whitespace-nowrap">
                      Chembur
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">
                Our Presences
              </h2>
              <div className="w-20 h-1 bg-brand-blue rounded-full mb-6"></div>
              
              <p className="text-lg text-brand-gray leading-relaxed mb-8">
                This interactive map highlights Swastik Group's strategic development in 
                Mumbai's eastern suburbs—specifically from <strong>Chembur to Mulund</strong>. 
                Each marked location shows the company's footprint and offices 
                across these vibrant, growing communities.
              </p>
            </div>

            <div className="space-y-4">
              {locations.map((location, index) => (
                <div 
                  key={location.name}
                  className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-card hover:shadow-brand transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-brand-blue rounded-full flex items-center justify-center shadow-brand">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-brand-navy">
                      {location.name}
                    </h3>
                    <p className="text-sm text-brand-gray">
                      Premium residential developments
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresencesSection;