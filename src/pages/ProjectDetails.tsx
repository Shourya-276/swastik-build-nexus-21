import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EMICalculator from "@/components/EMICalculator";
import projectTower1 from "@/assets/project-tower-1.jpg";
import projectTower2 from "@/assets/project-tower-2.jpg";
import projectTower3 from "@/assets/project-tower-3.jpg";
import lifestyleInterior from "@/assets/lifestyle-interior.jpg";
import amenityPool from "@/assets/amenity-pool.jpg";
import amenityGym from "@/assets/amenity-gym.jpg";
import socialInterior1 from "@/assets/social-interior-1.jpg";

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-8 left-8 text-white">
          <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
          <p className="text-xl">📍 {project.location}</p>
        </div>
        
        {/* Search Filters */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary p-4">
          <div className="container mx-auto flex gap-4 items-center justify-center">
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

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Project Overview */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={project.image}
              alt="Project Overview"
              className="w-full rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
            <div className="w-16 h-1 bg-primary mb-6" />
            <p className="text-lg font-medium mb-4">{project.description}</p>
            <p className="text-muted-foreground leading-relaxed">
              {project.fullDescription}
            </p>
          </div>
        </section>

        {/* Nearby Connectivities */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-6">Nearby Connectivities</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-12" />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6">
                Work, play, entertainment, shopping, schooling, health care, metro, brisk
                connectivity and all other amenities which make our lives scattered are
                now available near Swastik Platinum.
              </p>
              <p className="text-lg font-medium mb-6">
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
          <h2 className="text-3xl font-bold text-center mb-6">Gallery</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-12" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 lg:row-span-2">
              <img
                src={galleryImages[0]}
                alt="Gallery"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            {galleryImages.slice(1).map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Gallery ${index + 2}`}
                  className="w-full h-48 object-cover rounded-2xl"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Amenities */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-6">Amenities</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6" />
          <p className="text-center text-muted-foreground mb-12">
            Resident's refined recreational and executive facilities
          </p>
          
          {/* Amenity Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-muted rounded-lg p-1 inline-flex">
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
              <img
                src={amenityPool}
                alt="Amenities"
                className="w-full rounded-2xl"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {amenities[activeAmenityTab as keyof typeof amenities].map((amenity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <Badge variant="secondary" className="bg-primary text-white px-2 py-1 text-sm">
                    {index + 1}.
                  </Badge>
                  <span className="text-primary font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Master Plan */}
          <div className="mt-12">
            <div className="bg-muted/30 rounded-2xl p-8">
              <div className="text-center text-muted-foreground">
                <div className="text-2xl font-bold mb-2">Master Plan Layout</div>
                <div>Detailed amenity layout coming soon</div>
              </div>
            </div>
          </div>
        </section>

        {/* Floor Plans */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-6">Floor Plans and Configurations</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-12" />
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-muted/30 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <div className="text-2xl font-bold mb-2">Floor Plan</div>
                  <div>Detailed floor plans coming soon</div>
                </div>
              </div>
            </div>
            
            <div>
              {/* Wing Tabs */}
              <div className="flex gap-2 mb-6">
                <Button
                  variant={activeFloorPlanTab === "a-wing" ? "default" : "outline"}
                  onClick={() => setActiveFloorPlanTab("a-wing")}
                  size="sm"
                >
                  A Wing
                </Button>
                <Button
                  variant={activeFloorPlanTab === "b-wing" ? "default" : "outline"}
                  onClick={() => setActiveFloorPlanTab("b-wing")}
                  size="sm"
                >
                  B Wing
                </Button>
                <Button
                  variant={activeFloorPlanTab === "c-wing" ? "default" : "outline"}
                  onClick={() => setActiveFloorPlanTab("c-wing")}
                  size="sm"
                >
                  C Wing
                </Button>
              </div>
              
              <div className="space-y-4">
                {project.configurations.map((config, index) => (
                  <Card key={index} className="border border-muted">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="bg-muted">
                          {config.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {config.area}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        {config.price}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button className="w-full mt-6" size="lg">
                Download Floor Plan
              </Button>
            </div>
          </div>
          
          {/* MAHARERA Details */}
          <div className="mt-12 bg-primary rounded-2xl p-8 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center text-black text-xs">
                    <div className="font-bold">QR Code</div>
                    <div>MahaRERA</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">MAHARERA DETAILS</h3>
                <p>https://maharera.mahaonline.gov.in</p>
                <p>MahaRERA No.: P51800045216</p>
                <p>Project Finance by: Bajaj Housing Finance Limited</p>
                <p className="text-sm opacity-90 mt-4">
                  <strong>Disclaimer:</strong> This is not a legal document and is for representation purpose only. All the images and information are for reference purpose only and subject to change without prior notice. The Promoter/Developer reserves the right to make any alterations, additions, or amendments as may be required. T&C apply.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EMI Calculator */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">EMI Calculator</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-12" />
          <EMICalculator />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetails;