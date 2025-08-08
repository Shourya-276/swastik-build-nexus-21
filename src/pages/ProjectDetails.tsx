import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EMICalculator from "@/components/EMICalculator";
import BlogsSection from "@/components/BlogsSection";
import FAQSection from "@/components/FAQSection";
import projectTower1 from "@/assets/project-tower-1.jpg";
import projectTower2 from "@/assets/project-tower-2.jpg";
import projectTower3 from "@/assets/project-tower-3.jpg";
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";
import amenityPool from "@/assets/amenity-pool.jpg";
import amenityGym from "@/assets/amenity-gym.jpg";
import socialInterior1 from "@/assets/social-interior-1.jpg";
import ProjectsSection from "@/components/ProjectsSection";
import ConsultantFlowingTabs from "@/components/ConsultantFlowingTabs";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [activeAmenityTab, setActiveAmenityTab] = useState("podium");
  const [activeFloorPlanTab, setActiveFloorPlanTab] = useState("a-wing");

  // Mock project data - in real app, this would come from API
  const projectData = {
    "swastik-elite": {
      name: "Swastik Elite",
      location: "Ghatkopar West",
      image: projectTower1,
      description: "Be treasured with a beloved neighbourhood that ensures all good magnificent tower of 22 storys.",
      fullDescription: "The minute you step in from the colossal gates, the massive living space will pause your senses. This magnificent tower of 22 storys will ensure that you are treated to an experience that is tailored to your noble tastes. Walk from room to room amidst rich textures and gorgeous interiors. Your palatial abode has been curated with the finest amenities from the mines of excellence.",
      connectivities: [
        "2 mins from railway station / metro station",
        "2 mins from Eastern Express Highway", 
        "Easy access to JVLR & Eastern Freeway",
        "10 mins to Powai"
      ],
      configurations: [
        { type: "1 BHK", area: "418 RCA Sq. Ft", price: "Click for price" },
        { type: "2 BHK", area: "579 RCA Sq. Ft", price: "Click for price" },
        { type: "3 BHK", area: "811 RCA Sq. Ft", price: "Click for price" }
      ]
    },
    "swastik-heights": {
      name: "Swastik Heights", 
      location: "Vikhroli East",
      image: projectTower2,
      description: "Premium high-rise apartments with scenic views and world-class amenities.",
      fullDescription: "Experience luxury living at its finest with panoramic city views and meticulously designed spaces that blend comfort with elegance.",
      connectivities: [
        "3 mins from Vikhroli Railway Station",
        "Direct access to Eastern Express Highway",
        "Close to R City Mall",
        "15 mins to BKC"
      ],
      configurations: [
        { type: "2 BHK", area: "650 RCA Sq. Ft", price: "Click for price" },
        { type: "3 BHK", area: "920 RCA Sq. Ft", price: "Click for price" }
      ]
    },
    "swastik-grandeur": {
      name: "Swastik Grandeur",
      location: "Mulund West", 
      image: projectTower3,
      description: "Contemporary living spaces with world-class facilities and modern architecture.",
      fullDescription: "Discover a new dimension of luxury with spacious homes designed for the modern family, featuring premium finishes and state-of-the-art amenities.",
      connectivities: [
        "2 mins from Mulund Railway Station",
        "Easy access to LBS Marg",
        "Close to R Mall Mulund", 
        "Quick connectivity to Thane"
      ],
      configurations: [
        { type: "1 BHK", area: "485 RCA Sq. Ft", price: "Click for price" },
        { type: "2 BHK", area: "720 RCA Sq. Ft", price: "Click for price" },
        { type: "3 BHK", area: "1050 RCA Sq. Ft", price: "Click for price" }
      ]
    }
  };

  const project = projectData[projectId as keyof typeof projectData];

  if (!project) {
    return <div>Project not found</div>;
  }

  const amenities = {
    podium: [
      "Premier Gymnasium", "Children's Play Area", "Day Care", "Indoor Games",
      "Mini Theater", "Reading Area", "Gaming Zone", "Elder's Lounge",
      "Kids Pool", "Pantry", "Banquet Hall", "Guest Rooms"
    ],
    rooftop: [
      "Swimming Pool", "Sky Deck", "Yoga Area", "Jogging Track",
      "Garden Area", "Party Lawn", "BBQ Area", "Seating Area"
    ]
  };

  const galleryImages = [lifestyleInterior, amenityPool, amenityGym, socialInterior1];
  const marqueeImages = [...galleryImages, ...galleryImages];
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const container = galleryRef.current;
    if (!container) return;
    const speedPxPerTick = 1; // adjust for speed
    const tickMs = 16; // ~60fps
    const intervalId = setInterval(() => {
      if (!container) return;
      container.scrollLeft += speedPxPerTick;
      const halfWidth = container.scrollWidth / 2;
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft = 0; // seamless loop via duplicated images
      }
    }, tickMs);
    return () => clearInterval(intervalId);
  }, [isPaused]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[55vh] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.name}</h1>
          <p className="text-lg md:text-xl">📍 {project.location}</p>
        </div>
        
        {/* Search Filters */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary/90 p-3 md:p-4">
          <div className="container mx-auto flex flex-wrap gap-2 md:gap-4 items-center justify-center">
            <Button variant="outline" className="text-white border-white bg-white/10">
              Location ▼
            </Button>
            <Button variant="outline" className="text-white border-white bg-white/10">
              Property Type ▼
            </Button>
            <Button variant="outline" className="text-white border-white bg-white/10">
              Configuration ▼
            </Button>
            <Button variant="secondary" className="bg-white text-primary">
              🔍
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 sm:py-12 space-y-12">
        {/* Project Overview */}
        <section className="relative bg-[#EEF8FF]">
          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#EEF8FF]">
            <div className="container mx-auto px-4 py-10 md:py-12">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative overflow-hidden shadow-brand">
                  <img
                    src={project.image}
                    alt="Project Overview"
                    className="w-full h-72 md:h-96 object-cover"
                    style={{
                      borderTopLeftRadius: '2rem',
                      borderTopRightRadius: '0',
                      borderBottomRightRadius: '2rem',
                      borderBottomLeftRadius: '0'
                    }}
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
                  <div className="w-16 h-1 bg-primary mb-4" />
                  <p className="text-base md:text-lg font-medium mb-3">{project.description}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Connectivities */}
        <section className="relative bg-[#EEF8FF]">
          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#EEF8FF]">
            <div className="container mx-auto px-4 py-10 md:py-12">
              <h2 className="text-3xl font-bold text-center mb-4">Nearby Connectivities</h2>
              <div className="w-16 h-1 bg-primary mx-auto mb-8" />
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                  <p className="text-base md:text-lg mb-6">
                    Work, play, entertainment, shopping, schooling, health care, metro, brisk
                    connectivity and all other amenities which make our lives scattered are
                    now available near Swastik Platinum.
                  </p>
                  <p className="text-base md:text-lg font-medium mb-6">
                    True to our times, true to commitments, nestled in nature, steeped in
                    convenience, completely secure - Swastik Platinum your dream
                    residence in more than just one way.
                  </p>
                  <h3 className="text-xl font-bold mb-4">Platinum connections - Key destinations on your doorstep</h3>
                  <ul className="space-y-3">
                    {project.connectivities.map((connectivity, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>{connectivity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <div className="w-full h-72 md:h-80 bg-gradient-to-br from-orange-200 to-orange-400 rounded-2xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl font-bold mb-2">Location Map</div>
                      <div className="text-lg">Interactive map coming soon</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-4">Gallery</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-8" />

          <div className="relative max-w-6xl mx-auto">
            {/* Controls */}
            <button
              aria-label="Previous"
              onClick={() => galleryRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary shadow rounded-full w-9 h-9 flex items-center justify-center"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={() => galleryRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary shadow rounded-full w-9 h-9 flex items-center justify-center"
            >
              ›
            </button>

            {/* Track */}
            <div
              ref={galleryRef}
              className="overflow-x-auto no-scrollbar px-10"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <div className="flex gap-6 w-max">
                {marqueeImages.map((image, index) => (
                  <div key={index} className="flex-shrink-0">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-[340px] h-[220px] md:w-[400px] md:h-[250px] lg:w-[440px] lg:h-[280px] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="relative">
          {/* Full-bleed background wrapper */}
          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#EEF8FF]">
            <div className="container mx-auto px-4 py-10 md:py-12">
              <h2 className="text-3xl font-bold text-center mb-4">Amenities</h2>
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <p className="text-center text-muted-foreground mb-8">
                Resident's refined recreational and executive facilities
              </p>

              {/* Amenity Tabs */}
              <div className="flex justify-center mb-8">
                <div className="bg-white/70 rounded-lg p-1 inline-flex">
                  <Button
                    variant={activeAmenityTab === "podium" ? "default" : "ghost"}
                    onClick={() => setActiveAmenityTab("podium")}
                    className="px-8"
                  >
                    Podium
                  </Button>
                  <Button
                    variant={activeAmenityTab === "rooftop" ? "default" : "ghost"}
                    onClick={() => setActiveAmenityTab("rooftop")}
                    className="px-8"
                  >
                    Rooftop
                  </Button>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="relative overflow-hidden">
                  <img
                    src={amenityPool}
                    alt="Amenities"
                    className="w-full h-72 md:h-96 object-cover"
                    style={{
                      borderTopLeftRadius: '2rem',
                      borderTopRightRadius: '0',
                      borderBottomRightRadius: '2rem',
                      borderBottomLeftRadius: '0'
                    }}
                  />
                </div>

                <ol className="grid grid-cols-1 gap-4 list-decimal list-inside">
                  {amenities[activeAmenityTab as keyof typeof amenities].map((amenity, index) => (
                    <li key={index} className="text-brand-blue font-medium">
                      <span className="text-foreground ml-2">{amenity}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Wide illustrative image below amenities */}
              <div className="mt-10">
                <img
                  src={amenityGym}
                  alt="Amenities Layout"
                  className="w-full h-56 md:h-72 lg:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Floor Plans */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-3">Floor Plans and Configurations</h2>
          <div className="w-44 h-2 bg-primary mx-auto mb-8 rounded-full" />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: Big plan image in a soft card */}
            <div className="rounded-3xl bg-[#F2E2D3]/60 p-4 md:p-6">
              <img
                src={amenityGym}
                alt="Floor Plan"
                className="w-full h-72 md:h-[420px] object-contain"
              />
            </div>

            {/* Right: Tabs + configuration list */}
            <div className="flex flex-col">
              {/* Wing Tabs styled as text with underline */}
              <div className="border-b mb-6 flex gap-8">
                {[
                  { id: 'a-wing', label: 'A Wing' },
                  { id: 'b-wing', label: 'B Wing' },
                  { id: 'c-wing', label: 'C wing' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFloorPlanTab(tab.id as 'a-wing' | 'b-wing' | 'c-wing')}
                    className={`pb-3 -mb-px text-base md:text-lg transition-colors ${
                      activeFloorPlanTab === tab.id
                        ? 'text-brand-blue border-b-2 border-brand-blue'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {project.configurations.map((config, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 items-center rounded-xl border border-border bg-white px-4 py-3 shadow-sm hover:shadow-md transition"
                  >
                    <div className="text-sm md:text-base font-medium justify-self-start">{config.type}</div>
                    <div className="text-sm text-muted-foreground text-center justify-self-center">{config.area}</div>
                    <Button variant="ghost" className="text-brand-blue hover:text-brand-blue justify-self-end">
                      {config.price}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button className="px-8 py-6 rounded-full text-white bg-brand-blue shadow-brand hover:bg-brand-blue/90" size="lg">
                  Download Floor Plan
                </Button>
              </div>
            </div>
          </div>

          {/* MAHARERA Details */}
          <div
            className="mt-10 md:mt-12 bg-gradient-brand p-6 md:p-8 text-white shadow-brand"
            style={{
              borderRadius: '80px 16px 80px 16px',
            }}
          >
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 items-center">
              <div className="flex md:justify-start justify-center">
                <div className="inline-flex flex-col items-center">
                  <div className="bg-white rounded-xl p-2 shadow-md">
                    <img
                      src="/lovable-uploads/919fa5be-99f1-4413-a367-99083213a54f.png"
                      alt="MahaRERA QR code"
                      className="w-28 h-28 md:w-36 md:h-36 object-contain"
                    />
                  </div>
                  <p className="mt-2 text-xs text-white/90">Maharera QR code</p>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-wide">MAHARERA DETAILS</h3>
                <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noreferrer" className="block underline font-semibold text-white">
                  https://maharera.mahaonline.gov.in
                </a>
                <p className="font-medium">MahaRERA No.: P51800045216</p>
                <p className="font-medium">Project Finance by: Bajaj Housing Finance Limited</p>
                <p className="text-sm opacity-90 mt-4">
                  <strong>Disclaimer:</strong> This is not a legal document and is for representation purpose only. All the images and information are for reference purpose only and subject to change without prior notice. The Promoter/Developer reserves the right to make any alterations, additions, or amendments as may be required. T&C apply.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EMI Calculator */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8 md:mb-12">EMI Calculator</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-8 md:mb-12" />
          <EMICalculator hideHeading />
        </section>
      </div>

      {/* About Developer + Stats + Projects */}
      <section className="py-12 lg:py-16 bg-[#EEF8FF]">
        <div className="container mx-auto px-4 lg:px-8">
          {/* About Developer block */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="bg-white/70 backdrop-blur rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">About Developer</h2>
              <div className="w-20 h-1 bg-brand-blue rounded-full mb-6" />
              <p className="text-brand-gray leading-relaxed">
                At Swastik Group, we’re dedicated to honesty, openness, and quality work in each
                single thing we do. We’ve successfully completed various projects that blend contemporary
                design with luxury. We’re proud to build durable homes and buildings that reflects comfortable
                living. With a committed and talented team, we aim to top expectations and leave a positive
                mark in the communities we serve.
              </p>
            </div>
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt="Developer Visual"
                className="w-full h-80 md:h-96 object-cover"
                style={{
                  borderTopLeftRadius: '3rem',
                  borderTopRightRadius: '0',
                  borderBottomRightRadius: '3rem',
                  borderBottomLeftRadius: '0'
                }}
              />
            </div>
          </div>

          {/* Stats band (reused style) */}
          <div className="mt-10 bg-gradient-brand p-8 lg:p-12 shadow-brand overflow-hidden" style={{ borderRadius: '20px 60px 20px 60px' }}>
            <div className="flex animate-marquee hover:pause">
              {[
                { value: "25+", label: "Years of Excellence" },
                { value: "1.5", label: "Million Sq. Ft. Developed" },
                { value: "1500+", label: "Happy Families" },
                { value: "6.5", label: "Lakh Sq. Ft. Under Construction" },
                { value: "22", label: "Successful Projects" },
                { value: "7", label: "Prime Locations" }
              ].map((stat, index) => (
                <div key={`about-first-${index}`} className="text-center text-white min-w-[120px] sm:min-w-[160px] lg:min-w-[200px] flex-shrink-0 mx-2 sm:mx-4 lg:mx-6">
                  <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm lg:text-base opacity-90 whitespace-normal leading-tight">{stat.label}</div>
                </div>
              ))}
              {[
                { value: "25+", label: "Years of Excellence" },
                { value: "1.5", label: "Million Sq. Ft. Developed" },
                { value: "1500+", label: "Happy Families" },
                { value: "6.5", label: "Lakh Sq. Ft. Under Construction" },
                { value: "22", label: "Successful Projects" },
                { value: "7", label: "Prime Locations" }
              ].map((stat, index) => (
                <div key={`about-second-${index}`} className="text-center text-white min-w-[120px] sm:min-w-[160px] lg:min-w-[200px] flex-shrink-0 mx-2 sm:mx-4 lg:mx-6">
                  <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm lg:text-base opacity-90 whitespace-normal leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects copy */}
          <div className="mt-12">
            <div className="bg-white rounded-2xl">
              <ProjectsSection />
            </div>
          </div>

          {/* Blogs section (copied from home) */}
          <div className="mt-12">
            <BlogsSection />
          </div>

          {/* FAQ section (copied from home) */}
          <div className="mt-12">
            <FAQSection />
          </div>
          
          {/* Consultant Flowing Tabs */}
          <div className="mt-12">
            <ConsultantFlowingTabs />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetails;