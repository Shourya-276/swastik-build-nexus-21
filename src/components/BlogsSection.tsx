import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/content/blogs', {
          params: { status: 'Published' },
        });
        setBlogs(response.data.slice(0, 4));
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section id="blogs" className="py-20 bg-gradient-light">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4">Blogs</h2>
          <div className="w-20 h-1 bg-brand-blue rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto">
            Stay informed with our latest insights, market analysis, and expert advice on real estate trends
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-blue"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {blogs.length === 0 ? (
              <p className="text-center text-brand-gray">No published blogs available</p>
            ) : (
              blogs.map((blog, index) => (
                <Card
                  key={blog.id}
                  className="group overflow-hidden shadow-card hover:shadow-brand transition-all duration-500 hover:-translate-y-2 bg-white animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.image_url || '/api/placeholder/400/250'}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-xs font-medium text-brand-navy">{blog.category}</span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-brand-gray leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-brand-gray pt-2 border-t border-border">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{blog.publish_date}</span>
                        </div>
                      </div>
                      <Link to={`/blogs/${blog.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full mt-4 text-brand-blue hover:text-brand-blue hover:bg-brand-light-blue/20"
                        >
                          Read More →
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        <div className="text-center">
          <Link to="/blogs">
            <Button variant="brand" size="lg">
              View All Blogs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
