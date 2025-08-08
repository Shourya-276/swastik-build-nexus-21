import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import axios from 'axios';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewProject, setViewProject] = useState(null);
  const [editProjectId, setEditProjectId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: [],
    configurations: [],
    customConfig: '',
    status: '',
    description: '',
    image: null,
  });

  const projectTypes = ['Residential', 'Commercial', 'Retail'];
  const configOptions = ['1BHK', '1.5BHK', '2BHK', '2.5BHK', '3BHK', '3.5BHK', '4BHK', 'Custom'];
  const statusOptions = ['Ongoing', 'Completed', 'Planning'];

  // Fetch projects on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/content/projects');
        console.log('Fetched projects:', response.data);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to fetch projects: ' + (error.response?.data?.message || error.message));
      }
    };
    fetchProjects();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500';
      case 'Ongoing':
        return 'bg-blue-500';
      case 'Planning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData((prev) => ({ ...prev, image: file }));
    } else {
      toast.error('Please upload a valid image file');
    }
  };

  const handleTypeChange = (type) => {
    setFormData((prev) => {
      const newTypes = prev.type.includes(type)
        ? prev.type.filter((t) => t !== type)
        : [...prev.type, type];
      return { ...prev, type: newTypes };
    });
  };

  const handleConfigChange = (config) => {
    setFormData((prev) => {
      const newConfigs = prev.configurations.includes(config)
        ? prev.configurations.filter((c) => c !== config)
        : [...prev.configurations, config];
      return { ...prev, configurations: newConfigs };
    });
  };

  const handleSave = async () => {
    try {
      const { name, location, type, configurations, customConfig, status, description, image } = formData;

      if (!name || !location || type.length === 0 || configurations.length === 0 || !status || !description) {
        toast.error('All fields except image are required');
        return;
      }

      const finalConfigs = configurations.includes('Custom')
        ? [...configurations.filter((c) => c !== 'Custom'), customConfig].filter(Boolean)
        : configurations;

      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('location', location);
      formDataToSend.append('type', JSON.stringify(type));
      formDataToSend.append('configurations', JSON.stringify(finalConfigs));
      formDataToSend.append('status', status);
      formDataToSend.append('description', description);
      if (image) {
        formDataToSend.append('image', image);
      }

      let response;
      if (editProjectId) {
        // Update existing project
        console.log('Updating project with ID:', editProjectId);
        response = await axios.put(`http://localhost:5000/api/content/projects/${editProjectId}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Updated project:', response.data);
        setProjects(projects.map((p) => (p.id === editProjectId ? response.data.entry : p)));
        toast.success('Project updated successfully');
      } else {
        // Create new project
        response = await axios.post('http://localhost:5000/api/content/projects', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('Created project:', response.data);
        setProjects([response.data.entry, ...projects]);
        toast.success('Project created successfully');
      }

      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save project: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleView = (project) => {
    console.log('Viewing project:', project);
    setViewProject(project);
    setIsViewModalOpen(true);
  };

  const handleEdit = (project) => {
    console.log('Editing project:', project);
    setEditProjectId(project.id);
    setFormData({
      name: project.name,
      location: project.location,
      type: project.type,
      configurations: project.configurations.filter((c) => configOptions.includes(c)),
      customConfig: project.configurations.find((c) => !configOptions.includes(c)) || '',
      status: project.status,
      description: project.description || '',
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      console.log('Deleting project with ID:', id);
      await axios.delete(`http://localhost:5000/api/content/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete project: ' + (error.response?.data?.message || error.message));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      type: [],
      configurations: [],
      customConfig: '',
      status: '',
      description: '',
      image: null,
    });
    setEditProjectId(null);
  };

  const projectStats = {
    Completed: projects.filter((p) => p.status === 'Completed').length,
    Ongoing: projects.filter((p) => p.status === 'Ongoing').length,
    Planning: projects.filter((p) => p.status === 'Planning').length,
    TotalProjects: projects.length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects Management</h1>
          <p className="text-muted-foreground">Manage your real estate projects</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription>{project.location}</CardDescription>
                </div>
                <Badge variant="secondary" className={`${getStatusColor(project.status)} text-white`}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{project.type.join(', ')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Configurations:</span>
                  <span>{project.configurations.join(', ')}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <Button variant="outline" size="sm" onClick={() => handleView(project)}>
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Statistics</CardTitle>
          <CardDescription>Overview of all projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{projectStats.Completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{projectStats.Ongoing}</div>
              <div className="text-sm text-muted-foreground">Ongoing</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{projectStats.Planning}</div>
              <div className="text-sm text-muted-foreground">Planning</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{projectStats.TotalProjects}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if (!open) resetForm(); }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editProjectId ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Property Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Swastik Heights"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Mumbai"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="e.g., Premium high-rise apartments"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Project Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="grid gap-2">
              <Label>Project Type</Label>
              <div className="flex flex-wrap gap-4">
                {projectTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={formData.type.includes(type)}
                      onCheckedChange={() => handleTypeChange(type)}
                    />
                    <Label htmlFor={`type-${type}`}>{type}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Configurations</Label>
              <div className="flex flex-wrap gap-4">
                {configOptions.map((config) => (
                  <div key={config} className="flex items-center space-x-2">
                    <Checkbox
                      id={`config-${config}`}
                      checked={formData.configurations.includes(config)}
                      onCheckedChange={() => handleConfigChange(config)}
                    />
                    <Label htmlFor={`config-${config}`}>{config}</Label>
                  </div>
                ))}
              </div>
              {formData.configurations.includes('Custom') && (
                <Input
                  className="mt-2"
                  value={formData.customConfig}
                  onChange={(e) => handleInputChange('customConfig', e.target.value)}
                  placeholder="e.g., More than 5 BHK"
                />
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editProjectId ? 'Update Project' : 'Save Project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{viewProject?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {viewProject?.image_url && (
              <img
                src={viewProject.image_url}
                alt={viewProject.name}
                className="w-full h-64 object-cover rounded-md"
              />
            )}
            <div className="grid gap-2">
              <Label>Location</Label>
              <p>{viewProject?.location}</p>
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <p>{viewProject?.description}</p>
            </div>
            <div className="grid gap-2">
              <Label>Type</Label>
              <p>{viewProject?.type.join(', ')}</p>
            </div>
            <div className="grid gap-2">
              <Label>Configurations</Label>
              <p>{viewProject?.configurations.join(', ')}</p>
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <p>{viewProject?.status}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
