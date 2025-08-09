
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
    <div className="space-y-4 sm:space-y-6">
      {cardsData.map((card, index) => (
        <div key={index} className="w-full">
          <div className="hidden md:flex">
            <div className={`flex-1 ${card.bgColor} p-6 lg:p-12 flex flex-col justify-center`}>
              <div className="space-y-4 lg:space-y-6">
                <div>
                  <h3 className="text-xl lg:text-3xl font-bold text-brand-navy mb-3 lg:mb-4">
                    {card.title}
                  </h3>
                  <div className="w-12 lg:w-16 h-1 bg-brand-blue rounded-full mb-4 lg:mb-6"></div>
                </div>
                <p className="text-brand-gray leading-relaxed text-base lg:text-lg">
                  {card.content}
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative h-full min-h-[250px] lg:min-h-[300px]">
                <img 
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5"></div>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <div className="relative h-40">
              <img 
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className={`${card.bgColor} p-4`}>
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-brand-navy mb-2">
                    {card.title}
                  </h3>
                  <div className="w-10 h-1 bg-brand-blue rounded-full mb-3"></div>
                </div>
                <p className="text-brand-gray leading-relaxed text-sm">
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
