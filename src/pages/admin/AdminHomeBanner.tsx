import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';

const AdminHomeBanner = () => {
  const [bannerData, setBannerData] = useState({
    heading: 'Find Your Dream Home Today',
    subtext: 'Discover premium residential properties in Mumbai\'s most sought-after locations',
    backgroundImage: null,
  });

  const handleInputChange = (field, value) => {
    setBannerData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerData((prev) => ({ ...prev, backgroundImage: file }));
    }
  };

  const handleSave = async () => {
    try {
      if (!bannerData.backgroundImage) {
        toast.error('Please select an image');
        return;
      }
      if (!bannerData.heading || !bannerData.subtext) {
        toast.error('Heading and subtext are required');
        return;
      }

      const formData = new FormData();
      formData.append('heading', bannerData.heading);
      formData.append('subtext', bannerData.subtext);
      formData.append('backgroundImage', bannerData.backgroundImage);

      const response = await axios.post('http://localhost:5000/api/content/banner', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Home banner updated successfully');
      console.log('Saved banner:', response.data.banner);
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to update banner: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Main Welcome Picture & Tagline</h1>
        <p className="text-muted-foreground">
          Update the main hero section of your homepage
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Background Image</CardTitle>
            <CardDescription>
              Upload the main cityscape/buildings image for the homepage banner
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="background-image">Main Banner Image</Label>
              <Input
                id="background-image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Recommended size: 1920x1080px or larger
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Text Content</CardTitle>
            <CardDescription>
              Edit the main heading and subtext for the banner
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="heading">Main Heading</Label>
              <Input
                id="heading"
                value={bannerData.heading}
                onChange={(e) => handleInputChange('heading', e.target.value)}
                placeholder="Find Your Dream Home Today"
              />
            </div>
            <div>
              <Label htmlFor="subtext">Subtext</Label>
              <Textarea
                id="subtext"
                rows={3}
                value={bannerData.subtext}
                onChange={(e) => handleInputChange('subtext', e.target.value)}
                placeholder="Discover premium residential properties..."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              How the banner will appear on the website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white text-center min-h-64 flex items-center justify-center">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {bannerData.heading}
                </h1>
                <p className="text-lg opacity-90 max-w-2xl">
                  {bannerData.subtext}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdminHomeBanner;