import React from 'react';
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";

interface CardData {
  title: string;
  content: string;
  image: string;
  bgColor: string;
}

const ValuesMissionVisionCards = () => {
  const cardsData: CardData[] = [
    {
      title: "Our Values",
      content: "Integrity, transparency, and excellence form the foundation of everything we do.",
      image: lifestyleInterior,
      bgColor: "bg-values-bg"
    },
    {
      title: "Our Vision", 
      content: "To be Mumbai's most trusted real estate developer, creating sustainable communities.",
      image: lifestyleInterior,
      bgColor: "bg-vision-bg"
    },
    {
      title: "Our Mission",
      content: "Building quality homes that blend contemporary design with innovation and sustainability.",
      image: lifestyleInterior,
      bgColor: "bg-mission-bg"
    }
  ];

  return (
    <div className="space-y-8">
      {cardsData.map((card, index) => (
        <div 
          key={card.title}
          className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
        >
          {/* Desktop Layout */}
          <div className="hidden md:flex">
            {/* Content Side */}
            <div className={`flex-1 ${card.bgColor} p-8 lg:p-12 flex flex-col justify-center`}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-brand-navy mb-4">
                    {card.title}
                  </h3>
                  <div className="w-16 h-1 bg-brand-blue rounded-full mb-6"></div>
                </div>
                <p className="text-brand-gray leading-relaxed text-lg">
                  {card.content}
                </p>
              </div>
            </div>
            
            {/* Image Side */}
            <div className="flex-1">
              <div className="relative h-full min-h-[300px]">
                <img 
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5"></div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Image Section */}
            <div className="relative h-48">
              <img 
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Content Section */}
            <div className={`${card.bgColor} p-6`}>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-brand-navy mb-3">
                    {card.title}
                  </h3>
                  <div className="w-12 h-1 bg-brand-blue rounded-full mb-4"></div>
                </div>
                <p className="text-brand-gray leading-relaxed">
                  {card.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ValuesMissionVisionCards;