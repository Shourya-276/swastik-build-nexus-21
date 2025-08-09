import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import projectTower1 from "@/assets/project-tower-1.jpg";

const ProjectsSection = () => {
  const [activeTab, setActiveTab] = useState("completed");
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Fetch projects on mount
  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      if (isLoading) return; // Prevent multiple simultaneous calls
      setIsLoading(true);
      try {
        console.log("Fetching projects...");
        const response = await axios.get("http://localhost:5000/api/content/projects");
        console.log("Fetched projects:", response.data);
        if (isMounted) {
          if (response.data.length === 0) {
            console.warn("No projects found");
            toast.info("No projects available at the moment.");
          }
          // Validate project IDs
          const validProjects = response.data.filter(
            (project) => project.id != null && project.id.toString().length > 0
          );
          if (validProjects.length < response.data.length) {
            console.warn("Some projects have invalid IDs:", response.data);
            toast.error("Some projects could not be displayed due to missing or invalid IDs.");
          }
          setProjects(validProjects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        if (isMounted) {
          toast.error("Failed to fetch projects: " + (error.response?.data?.message || error.message));
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewDetails = (projectId) => {
    if (!projectId || projectId.toString() === "") {
      console.warn("Invalid project ID:", projectId);
      toast.error("Cannot view project details: Invalid project identifier");
      return;
    }
    const projectIdStr = projectId.toString();
    console.log("Navigating to project with ID:", projectIdStr);
    navigate(`/project/${projectIdStr}`);
  };

  const filteredProjects = projects.filter((project) => project.status.toLowerCase() === activeTab);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">Our Projects</h2>
          <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-8"></div>
        </div>

        {/* Tab Navigation */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center space-x-2 bg-brand-light-gray rounded-lg p-2 inline-flex">
            <Button
              variant={activeTab === "completed" ? "brand" : "ghost"}
              size="lg"
              onClick={() => setActiveTab("completed")}
              className="px-8"
            >
              Completed
            </Button>
            <Button
              variant={activeTab === "ongoing" ? "brand" : "ghost"}
              size="lg"
              onClick={() => setActiveTab("ongoing")}
              className="px-8"
            >
              Ongoing
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <div className="text-center">Loading projects...</div>}

        {/* Empty State */}
        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center text-brand-gray">No {activeTab} projects found.</div>
        )}

        {/* Projects Grid/Scroll */}
        {!isLoading && filteredProjects.length > 0 && (
          <div
            className={
              isMobile
                ? "flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory projects-scroll animate-slide-up"
                : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-slide-up"
            }
          >
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className={`group overflow-hidden shadow-card hover:shadow-brand transition-all duration-500 hover:-translate-y-2 ${
                  isMobile ? "flex-shrink-0 w-80 snap-center" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* New Release Tag for first project */}
                {index === 0 && (
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg group-hover:animate-bounce">
                    NEW RELEASE
                  </div>
                )}

                <div className="relative overflow-hidden custom-image-radius">
                  <img
                    src={project.image_url || projectTower1}
                    alt={project.name}
                    className={`w-full h-64 object-cover transition-transform duration-500 ${
                      index === 0 ? "group-hover:scale-125" : "group-hover:scale-110"
                    } custom-image-radius`}
                    style={{
                      borderTopLeftRadius: "2rem",
                      borderTopRightRadius: "0",
                      borderBottomRightRadius: "2rem",
                      borderBottomLeftRadius: "0",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <p className="text-sm opacity-90">{project.location}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-brand-gray text-sm leading-relaxed">{project.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-medium text-brand-blue">📍 {project.location}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-brand-blue hover:text-brand-blue"
                        onClick={() => handleViewDetails(project.id)}
                        disabled={!project.id}
                      >
                        View Details →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
