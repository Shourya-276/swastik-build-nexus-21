import { useEffect, useRef, useState } from "react";

const ConsultantFlowingTabs = () => {
  const consultants = [
    {
      title: "MEP Consultant",
      name: "Mr. Rupesh Gujrathi"
    },
    {
      title: "PMC",
      name: "Epsilon Project Management"
    },
    {
      title: "Vastu Consultant",
      name: "Kamlesh Vastu Engineer"
    },
    {
      title: "Legal Consultant",
      name: "Lexicon Law Partners"
    },
    {
      title: "Design Architect",
      name: "Karch Architects"
    },
    {
      title: "Liasoning Architect",
      name: "Sai Sampada DBS"
    },
    {
      title: "Landscaping & Interior Design",
      name: "Madane Design Workshop"
    },
    {
      title: "ROC Consultant",
      name: "System Structural Consultant Pvt Ltd"
    }
  ];

  // Duplicate consultants for seamless loop
  const duplicatedConsultants = [...consultants, ...consultants];
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const container = scrollRef.current;
    if (!container) return;
    
    const scrollSpeed = 1; // pixels per frame
    const animationFrame = () => {
      if (!container) return;
      
      container.scrollLeft += scrollSpeed;
      
      // Reset to beginning when we've scrolled through the first set
      const maxScroll = container.scrollWidth / 2;
      if (container.scrollLeft >= maxScroll) {
        container.scrollLeft = 0;
      }
      
      if (!isPaused) {
        requestAnimationFrame(animationFrame);
      }
    };
    
    const animation = requestAnimationFrame(animationFrame);
    
    return () => cancelAnimationFrame(animation);
  }, [isPaused]);

  return (
    <section className="py-8 bg-[#EEF8FF] overflow-hidden">
      <div 
        ref={scrollRef}
        className="flex gap-0 overflow-x-hidden scrollbar-hide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        style={{ 
          scrollBehavior: 'auto',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
      >
        {duplicatedConsultants.map((consultant, index) => (
          <div
            key={index}
            className="flex-shrink-0 border-r border-primary/20 px-6 md:px-8 lg:px-12 py-4 min-w-[280px] md:min-w-[320px] lg:min-w-[380px] text-center"
          >
            <div className="text-sm md:text-base text-brand-gray font-medium mb-2">
              {consultant.title}
            </div>
            <div className="text-base md:text-lg text-brand-navy font-bold">
              {consultant.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConsultantFlowingTabs;