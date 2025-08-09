import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import axios from 'axios';

const AdminHomePage = () => {
  const [homePageData, setHomePageData] = useState({
    whoWeAre: {
      content: `At Swastik Group, we're dedicated to honesty, openness, and quality work in each stage we do. We've successfully completed various projects that blend contemporary design with luxury. We're proud to build durable homes and buildings that are built to last expectations and leave a positive mark in the construction landscape.

Our commitment to excellence and innovation drives us to create spaces that not only meet but exceed expectations, establishing lasting relationships built on trust and quality craftsmanship.`,
      image: null as File | null
    },
    valuesVisionMission: {
      values: "Integrity, transparency, and excellence form the foundation of everything we do.",
      vision: "To be Mumbai's most trusted real estate developer, creating sustainable communities.",
      mission: "Building quality homes that blend contemporary design with innovation and sustainability.",
      image: null as File | null
    },
    ourPresence: {
      locations: ["Chembur", "Ghatkopar", "Vikhroli", "Mulund", "Powai", "Andheri"]
    }
  });

  const handleInputChange = (section: string, field: string, value: string) => {
    setHomePageData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleImageUpload = (section: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHomePageData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          image: file
        }
      }));
    }
  };

  const handleLocationChange = (index: number, value: string) => {
    setHomePageData(prev => ({
      ...prev,
      ourPresence: {
        locations: prev.ourPresence.locations.map((location, i) =>
          i === index ? value : location
        )
      }
    }));
  };

  const addLocation = () => {
    setHomePageData(prev => ({
      ...prev,
      ourPresence: {
        locations: [...prev.ourPresence.locations, "New Location"]
      }
    }));
  };

  const removeLocation = (index: number) => {
    setHomePageData(prev => ({
      ...prev,
      ourPresence: {
        locations: prev.ourPresence.locations.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSave = async (section: string) => {
    try {
      if (section === 'whoWeAre') {
        if (!homePageData.whoWeAre.image) {
          toast.error('Please select an image for Who We Are');
          return;
        }
        if (!homePageData.whoWeAre.content) {
          toast.error('Content is required for Who We Are');
          return;
        }
        const formData = new FormData();
        formData.append('content', homePageData.whoWeAre.content);
        formData.append('image', homePageData.whoWeAre.image);
        const response = await axios.post('http://localhost:5000/api/content/who-we-are', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Who We Are updated successfully');
        console.log('Saved who_we_are:', response.data.entry);
      } else if (section === 'valuesVisionMission') {
        if (!homePageData.valuesVisionMission.image) {
          toast.error('Please select an image for Values, Vision, Mission');
          return;
        }
        if (!homePageData.valuesVisionMission.values || !homePageData.valuesVisionMission.vision || !homePageData.valuesVisionMission.mission) {
          toast.error('All fields are required for Values, Vision, Mission');
          return;
        }
        const formData = new FormData();
        formData.append('values', homePageData.valuesVisionMission.values);
        formData.append('vision', homePageData.valuesVisionMission.vision);
        formData.append('mission', homePageData.valuesVisionMission.mission);
        formData.append('image', homePageData.valuesVisionMission.image);
        const response = await axios.post('http://localhost:5000/api/content/values-vision-mission', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Values, Vision, Mission updated successfully');
        console.log('Saved values_vision_mission:', response.data.entry);
      } else if (section === 'ourPresence') {
        if (!homePageData.ourPresence.locations.length) {
          toast.error('At least one location is required');
          return;
        }
        const response = await axios.post('http://localhost:5000/api/content/our-presence', {
          locations: homePageData.ourPresence.locations
        });
        toast.success('Our Presence updated successfully');
        console.log('Saved our_presence:', response.data.entry);
      }
    } catch (error) {
      console.error(`Save error for ${section}:`, error);
      toast.error(`Failed to update ${section}: ` + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Home Page Management</h1>
        <p className="text-muted-foreground">
          Update all sections displayed on the home page
        </p>
      </div>

      <Tabs defaultValue="who-we-are" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="who-we-are">Who We Are</TabsTrigger>
          <TabsTrigger value="values-vision">Values & Vision</TabsTrigger>
          <TabsTrigger value="our-presence">Our Presence</TabsTrigger>
        </TabsList>

        <TabsContent value="who-we-are" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Section Image</CardTitle>
                <CardDescription>
                  Upload the image for the "Who We Are" section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="who-we-are-image">Section Image</Label>
                  <Input
                    id="who-we-are-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload('whoWeAre', e)}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  Edit the text content for this section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="who-we-are-content">Section Content</Label>
                  <Textarea
                    id="who-we-are-content"
                    rows={10}
                    value={homePageData.whoWeAre.content}
                    onChange={(e) => handleInputChange('whoWeAre', 'content', e.target.value)}
                    placeholder="Enter the content about your company..."
                  />
                </div>
                <Button onClick={() => handleSave('whoWeAre')} size="lg">
                  Save Who We Are
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="values-vision" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Section Image</CardTitle>
                <CardDescription>
                  Upload the image for the Values, Vision & Mission section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="values-vision-image">Section Image</Label>
                  <Input
                    id="values-vision-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload('valuesVisionMission', e)}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  Edit the values, vision, and mission content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="values">Our Values</Label>
                  <Textarea
                    id="values"
                    rows={3}
                    value={homePageData.valuesVisionMission.values}
                    onChange={(e) => handleInputChange('valuesVisionMission', 'values', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="vision">Our Vision</Label>
                  <Textarea
                    id="vision"
                    rows={3}
                    value={homePageData.valuesVisionMission.vision}
                    onChange={(e) => handleInputChange('valuesVisionMission', 'vision', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="mission">Our Mission</Label>
                  <Textarea
                    id="mission"
                    rows={3}
                    value={homePageData.valuesVisionMission.mission}
                    onChange={(e) => handleInputChange('valuesVisionMission', 'mission', e.target.value)}
                  />
                </div>
                <Button onClick={() => handleSave('valuesVisionMission')} size="lg">
                  Save Values, Vision, Mission
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="our-presence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Presence Locations</CardTitle>
              <CardDescription>
                Manage the list of locations where your company has presence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {homePageData.ourPresence.locations.map((location, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={location}
                    onChange={(e) => handleLocationChange(index, e.target.value)}
                    placeholder="Location name"
                  />
                  <Button
                    variant="outline"
                    onClick={() => removeLocation(index)}
                    disabled={homePageData.ourPresence.locations.length <= 1}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addLocation}>
                Add Location
              </Button>
              <Button onClick={() => handleSave('ourPresence')} size="lg">
                Save Our Presence
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminHomePage;