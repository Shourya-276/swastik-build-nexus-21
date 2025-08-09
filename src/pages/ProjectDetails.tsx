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
import ProjectsSection from "@/components/ProjectsSection";
import ConsultantFlowingTabs from "@/components/ConsultantFlowingTabs";
import projectTower1 from "@/assets/project-tower-1.jpg";
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";
import amenityPool from "@/assets/amenity-pool.jpg";
import amenityGym from "@/assets/amenity-gym.jpg";
import socialInterior1 from "@/assets/social-interior-1.jpg";
import axios from "axios";
import { toast } from "sonner";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeAmenityTab, setActiveAmenityTab] = useState("podium");
  const [activeFloorPlanTab, setActiveFloorPlanTab] = useState("a-wing");
  const [isPaused, setIsPaused] = useState(false);
  const galleryRef = useRef(null);

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Validate ID
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
          console.warn("Invalid project ID:", id);
          toast.error("Invalid project ID");
          setError("Invalid project ID");
          setLoading(false);
          return;
        }
        console.log(`Fetching project with ID: ${parsedId}`);
        const response = await axios.get(`http://localhost:5000/api/content/projects/id/${parsedId}`);
        console.log("Fetched project:", response.data);
        setProject(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError(error.response?.data?.message || error.message);
        toast.error("Failed to fetch project details: " + (error.response?.data?.message || error.message));
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // Gallery scrolling effect
  useEffect(() => {
    if (isPaused) return;
    const container = galleryRef.current;
    if (!container) return;
    const speedPxPerTick = 1;
    const tickMs = 16;
    const intervalId = setInterval(() => {
      if (!container) return;
      container.scrollLeft += speedPxPerTick;
      const halfWidth = container.scrollWidth / 2;
      if (container.scrollLeft >= halfWidth) {
        container.scrollLeft = 0;
      }
    }, tickMs);
    return () => clearInterval(intervalId);
  }, [isPaused]);

  // Mock amenities and gallery
  const amenities = {
    podium: [
      "Premier Gymnasium",
      "Children's Play Area",
      "Day Care",
      "Indoor Games",
      "Mini Theater",
      "Reading Area",
      "Gaming Zone",
      "Elder's Lounge",
      "Kids Pool",
      "Pantry",
      "Banquet Hall",
      "Guest Rooms",
    ],
    rooftop: [
      "Swimming Pool",
      "Sky Deck",
      "Yoga Area",
      "Jogging Track",
      "Garden Area",
      "Party Lawn",
      "BBQ Area",
      "Seating Area",
    ],
  };

  const galleryImages = [lifestyleInterior, amenityPool, amenityGym, socialInterior1];
  const marqueeImages = [...galleryImages, ...galleryImages];

  // Map database configurations
  const mapConfigurations = (configs) => {
    return configs.map((type, index) => ({
      type,
      area: "N/A",
      price: "Click for price",
    }));
  };

  // Generate connectivities
  const generateConnectivities = (location) => {
    return [
      `5 mins from ${location} Railway Station`,
      "Easy access to major highways",
      `Close to ${location} commercial hubs`,
      "Quick connectivity to nearby areas",
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading project details...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          {error || "Project not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[55vh] overflow-hidden">
        <img
          src={project.image_url || projectTower1}
          alt={project.name || "Project"}
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
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={project.image_url || projectTower1}
              alt="Project Overview"
              className="w-full rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
            <div className="w-16 h-1 bg-primary mb-6" />
            <p className="text-lg font-medium mb-4">{project.description}</p>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </div>
        </section>

        {/* Nearby Connectivities */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-6">Nearby Connectivities</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-12" />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6">
                Work, play, entertainment, shopping, schooling, health care, metro, brisk connectivity, and all other
                amenities which make our lives scattered are now available near {project.name}.
              </p>
              <p className="text-lg font-medium mb-6">
                True to our times, true to commitments, nestled in nature, steeped in convenience, completely secure -{" "}
                {project.name} your dream residence in more than just one way.
              </p>
              <h3 className="text-xl font-bold mb-4">Platinum connections - Key destinations on your doorstep</h3>
              <ul className="space-y-3">
                {generateConnectivities(project.location).map((connectivity, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>{connectivity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-orange-200 to-orange-400 rounded-full flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold mb-2">Location Map</div>
                  <div className="text-lg">Interactive map coming soon</div>
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
            <button
              aria-label="Previous"
              onClick={() => galleryRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary shadow rounded-full w-9 h-9 flex items-center justify-center"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={() => galleryRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary shadow rounded-full w-9 h-9 flex items-center justify-center"
            >
              ›
            </button>
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
          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#EEF8FF]">
            <div className="container mx-auto px-4 py-10 md:py-12">
              <h2 className="text-3xl font-bold text-center mb-4">Amenities</h2>
              <div className="w-16 h-1 bg-primary mx-auto mb-6" />
              <p className="text-center text-muted-foreground mb-8">
                Resident's refined recreational and executive facilities
              </p>
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
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <img src={amenityPool} alt="Amenities" className="w-full rounded-2xl" />
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {amenities[activeAmenityTab].map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Badge variant="secondary" className="bg-primary text-white px-2 py-1 text-sm">
                        {index + 1}.
                      </Badge>
                      <span className="text-primary font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-10">
                <img src={amenityGym} alt="Amenities Layout" className="w-full h-56 md:h-72 lg:h-80 object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Floor Plans */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-3">Floor Plans and Configurations</h2>
          <div className="w-44 h-2 bg-primary mx-auto mb-8 rounded-full" />
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="rounded-3xl bg-[#F2E2D3]/60 p-4 md:p-6">
              <img src={amenityGym} alt="Floor Plan" className="w-full h-72 md:h-[420px] object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="border-b mb-6 flex gap-8">
                {[
                  { id: "a-wing", label: "A Wing" },
                  { id: "b-wing", label: "B Wing" },
                  { id: "c-wing", label: "C wing" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFloorPlanTab(tab.id)}
                    className={`pb-3 -mb-px text-base md:text-lg transition-colors ${
                      activeFloorPlanTab === tab.id
                        ? "text-brand-blue border-b-2 border-brand-blue"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                {mapConfigurations(project.configurations).map((config, index) => (
                  <Card key={index} className="border border-muted">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="bg-muted">
                          {config.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{config.area}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        {config.price}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button
                  className="px-8 py-6 rounded-full text-white bg-brand-blue shadow-brand hover:bg-brand-blue/90"
                  size="lg"
                >
                  Download Floor Plan
                </Button>
              </div>
            </div>
          </div>
          <div
            className="mt-10 md:mt-12 bg-gradient-brand p-6 md:p-8 text-white shadow-brand"
            style={{ borderRadius: "80px 16px 80px 16px" }}
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
                <a
                  href="https://maharera.mahaonline.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="block underline font-semibold text-white"
                >
                  https://maharera.mahaonline.gov.in
                </a>
                <p className="font-medium">MahaRERA No.: P51800045216</p>
                <p className="font-medium">Project Finance by: Bajaj Housing Finance Limited</p>
                <p className="text-sm opacity-90 mt-4">
                  <strong>Disclaimer:</strong> This is not a legal document and is for representation purpose only. All
                  the images and information are for reference purpose only and subject to change without prior notice. The
                  Promoter/Developer reserves the right to make any alterations, additions, or amendments as may be
                  required. T&C apply.
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
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="bg-white/70 backdrop-blur rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-brand-navy mb-4">About Developer</h2>
              <div className="w-20 h-1 bg-brand-blue rounded-full mb-6" />
              <p className="text-brand-gray leading-relaxed">
                At Swastik Group, we’re dedicated to honesty, openness, and quality work in each single thing we do. We’ve
                successfully completed various projects that blend contemporary design with luxury. We’re proud to build
                durable homes and buildings that reflects comfortable living. With a committed and talented team, we aim to
                top expectations and leave a positive mark in the communities we serve.
              </p>
            </div>
            <div className="relative overflow-hidden">
              <img
                src={project.image_url || projectTower1}
                alt="Developer Visual"
                className="w-full h-80 md:h-96 object-cover"
                style={{
                  borderTopLeftRadius: "3rem",
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "3rem",
                  borderBottomLeftRadius: "0",
                }}
              />
            </div>
          </div>
          <div className="mt-10 bg-gradient-brand p-8 lg:p-12 shadow-brand overflow-hidden" style={{ borderRadius: "20px 60px 20px 60px" }}>
            <div className="flex animate-marquee hover:pause">
              {[
                { value: "25+", label: "Years of Excellence" },
                { value: "1.5", label: "Million Sq. Ft. Developed" },
                { value: "1500+", label: "Happy Families" },
                { value: "6.5", label: "Lakh Sq. Ft. Under Construction" },
                { value: "22", label: "Successful Projects" },
                { value: "7", label: "Prime Locations" },
              ].map((stat, index) => (
                <div
                  key={`about-first-${index}`}
                  className="text-center text-white min-w-[120px] sm:min-w-[160px] lg:min-w-[200px] flex-shrink-0 mx-2 sm:mx-4 lg:mx-6"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm lg:text-base opacity-90 whitespace-normal leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
              {[
                { value: "25+", label: "Years of Excellence" },
                { value: "1.5", label: "Million Sq. Ft. Developed" },
                { value: "1500+", label: "Happy Families" },
                { value: "6.5", label: "Lakh Sq. Ft. Under Construction" },
                { value: "22", label: "Successful Projects" },
                { value: "7", label: "Prime Locations" },
              ].map((stat, index) => (
                <div
                  key={`about-second-${index}`}
                  className="text-center text-white min-w-[120px] sm:min-w-[160px] lg:min-w-[200px] flex-shrink-0 mx-2 sm:mx-4 lg:mx-6"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm lg:text-base opacity-90 whitespace-normal leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12">
            <div className="bg-white rounded-2xl">
              <ProjectsSection />
            </div>
          </div>
          <div className="mt-12">
            <BlogsSection />
          </div>
          <div className="mt-12">
            <FAQSection />
          </div>
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
