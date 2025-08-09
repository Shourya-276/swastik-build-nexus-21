import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import axios from 'axios';

const AdminFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFaqId, setCurrentFaqId] = useState(null);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
    last_updated: '',
  });
  const [error, setError] = useState(null);

  // Fetch FAQs from backend
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/content/faqs');
        setFaqs(response.data);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError('Failed to load FAQs');
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(faqs.map((faq) => faq.category))];

  // Filter FAQs by selected category
  const filteredFaqs = selectedCategory === 'All' ? faqs : faqs.filter((faq) => faq.category === selectedCategory);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData };

    try {
      if (isEditing) {
        // Update existing FAQ
        const response = await axios.put(`http://localhost:5000/api/content/faqs/${currentFaqId}`, data);
        setFaqs((prev) => prev.map((faq) => (faq.id === currentFaqId ? response.data.entry : faq)));
      } else {
        // Create new FAQ
        const response = await axios.post('http://localhost:5000/api/content/faqs', data);
        setFaqs((prev) => [response.data.entry, ...prev]);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (err) {
      console.error('Error saving FAQ:', err);
      setError('Failed to save FAQ');
    }
  };

  // Handle edit button click
  const handleEdit = (faq) => {
    setIsEditing(true);
    setCurrentFaqId(faq.id);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      last_updated: faq.last_updated,
    });
    setIsDialogOpen(true);
  };

  // Handle view button click
  const handleView = (faq) => {
    setSelectedFaq(faq);
    setIsViewDialogOpen(true);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/content/faqs/${id}`);
        setFaqs((prev) => prev.filter((faq) => faq.id !== id));
      } catch (err) {
        console.error('Error deleting FAQ:', err);
        setError('Failed to delete FAQ');
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      category: '',
      last_updated: '',
    });
    setIsEditing(false);
    setCurrentFaqId(null);
  };

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">FAQs Management</h1>
          <p className="text-muted-foreground">Manage frequently asked questions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              Add New FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit FAQ' : 'Create New FAQ'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="question">Question</Label>
                <Input id="question" name="question" value={formData.question} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="answer">Answer</Label>
                <Textarea id="answer" name="answer" value={formData.answer} onChange={handleInputChange} rows={6} required />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" value={formData.category} onChange={handleInputChange} required placeholder="Enter category (e.g., Booking)" />
              </div>
              <div>
                <Label htmlFor="last_updated">Last Updated</Label>
                <Input id="last_updated" name="last_updated" type="date" value={formData.last_updated} onChange={handleInputChange} required />
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

      {/* View FAQ Modal */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedFaq?.question}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Answer</Label>
              <p className="text-muted-foreground">{selectedFaq?.answer}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <p className="text-muted-foreground">{selectedFaq?.category}</p>
              </div>
              <div>
                <Label>Last Updated</Label>
                <p className="text-muted-foreground">{selectedFaq?.last_updated}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Filter FAQs by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <p className="text-center text-muted-foreground">No FAQs found</p>
          ) : (
            filteredFaqs.map((faq) => (
              <Card key={faq.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFaq(faq.id)}
                          className="p-0 h-auto"
                        >
                          {expandedFaq === faq.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                        <CardTitle className="text-lg">{faq.question}</CardTitle>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                          {faq.category}
                        </span>
                        <span>Last updated: {faq.last_updated}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleView(faq)}>
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(faq)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(faq.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {expandedFaq === faq.id && (
                  <CardContent>
                    <div className="p-4 bg-muted/30 rounded-md">
                      <p className="text-sm">{faq.answer}</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>FAQ Statistics</CardTitle>
          <CardDescription>Content overview and analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{faqs.length}</div>
              <div className="text-sm text-muted-foreground">Total FAQs</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {faqs.filter((faq) => new Date(faq.last_updated).getMonth() === new Date().getMonth()).length}
              </div>
              <div className="text-sm text-muted-foreground">Updated This Month</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFAQs;