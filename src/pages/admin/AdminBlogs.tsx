import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Calendar, Loader2, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import axios from 'axios';

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    status: 'Draft',
    publish_date: '',
    image: null,
  });
  const [error, setError] = useState(null);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/content/blogs');
        setBlogs(response.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'image' && formData[key]) {
        data.append('image', formData[key]);
      } else if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      if (isEditing) {
        // Update existing blog
        const response = await axios.put(`http://localhost:5000/api/content/blogs/${currentBlogId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setBlogs((prev) => prev.map((blog) => (blog.id === currentBlogId ? response.data.entry : blog)));
      } else {
        // Create new blog
        const response = await axios.post('http://localhost:5000/api/content/blogs', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setBlogs((prev) => [response.data.entry, ...prev]);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (err) {
      console.error('Error saving blog:', err);
      setError('Failed to save blog');
    }
  };

  // Handle edit button click
  const handleEdit = (blog) => {
    setIsEditing(true);
    setCurrentBlogId(blog.id);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      status: blog.status,
      publish_date: blog.publish_date,
      image: null,
    });
    setIsDialogOpen(true);
  };

  // Handle view button click
  const handleView = (blog) => {
    setSelectedBlog(blog);
    setIsViewDialogOpen(true);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`http://localhost:5000/api/content/blogs/${id}`);
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      } catch (err) {
        console.error('Error deleting blog:', err);
        setError('Failed to delete blog');
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      status: 'Draft',
      publish_date: '',
      image: null,
    });
    setIsEditing(false);
    setCurrentBlogId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-green-500';
      case 'Draft':
        return 'bg-yellow-500';
      case 'Archived':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Create and manage blog posts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              New Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" name="content" value={formData.content} onChange={handleInputChange} rows={6} required />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input id="author" name="author" value={formData.author} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={formData.category} onChange={handleInputChange} required placeholder="Enter category (e.g., Real Estate Tips)" />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select name="status" value={formData.status} onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="publish_date">Publish Date</Label>
                <Input id="publish_date" name="publish_date" type="date" value={formData.publish_date} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input id="image" name="image" type="file" accept="image/*" onChange={handleFileChange} />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">{isEditing ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* View Blog Modal */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedBlog?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedBlog?.image_url && (
              <img
                src={selectedBlog.image_url}
                alt={selectedBlog.title}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <div>
              <Label>Excerpt</Label>
              <p className="text-muted-foreground">{selectedBlog?.excerpt}</p>
            </div>
            <div>
              <Label>Content</Label>
              <p className="text-muted-foreground">{selectedBlog?.content}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Author</Label>
                <p className="text-muted-foreground">{selectedBlog?.author}</p>
              </div>
              <div>
                <Label>Category</Label>
                <p className="text-muted-foreground">{selectedBlog?.category}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Status</Label>
                <Badge className={`${getStatusColor(selectedBlog?.status)} text-white`}>
                  {selectedBlog?.status}
                </Badge>
              </div>
              <div>
                <Label>Publish Date</Label>
                <p className="text-muted-foreground">{selectedBlog?.publish_date}</p>
              </div>
            </div>
            <div>
              <Label>Views</Label>
              <p className="text-muted-foreground">{selectedBlog?.views}</p>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.length === 0 ? (
            <p className="text-center text-muted-foreground">No blogs found</p>
          ) : (
            blogs.map((blog) => (
              <Card key={blog.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1 flex items-start gap-4">
                      {blog.image_url && (
                        <img
                          src={blog.image_url}
                          alt={blog.title}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      )}
                      <div>
                        <CardTitle className="text-lg">{blog.title}</CardTitle>
                        <CardDescription className="mt-1">{blog.excerpt}</CardDescription>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {blog.publish_date}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {blog.author}
                          </span>
                          <span>{blog.views} views</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(blog.status)} text-white`}>{blog.status}</Badge>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={() => handleView(blog)}>
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(blog)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(blog.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Blog Statistics</CardTitle>
          <CardDescription>Content performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{blogs.filter((b) => b.status === 'Published').length}</div>
              <div className="text-sm text-muted-foreground">Published</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{blogs.filter((b) => b.status === 'Draft').length}</div>
              <div className="text-sm text-muted-foreground">Drafts</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{blogs.reduce((sum, b) => sum + b.views, 0)}</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {blogs.filter((b) => new Date(b.publish_date).getMonth() === new Date().getMonth()).length}
              </div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogs;
