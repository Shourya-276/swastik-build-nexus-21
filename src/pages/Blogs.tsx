import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';

const Blogs = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/content/blogs', {
          params: { status: 'Published' },
        });
        setBlogs(response.data);
        if (id) {
          const blogResponse = await axios.get(`http://localhost:5000/api/content/blogs/id/${id}`);
          setSelectedBlog(blogResponse.data);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [id]);

  const otherBlogs = selectedBlog ? blogs.filter((blog) => blog.id !== selectedBlog.id) : blogs;

  return (
    <div className="min-h-screen bg-gradient-light">
      <Header />
      <div className="pt-20">
        <section className="py-12 bg-gradient-to-r from-brand-light-blue to-brand-blue">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center text-white">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Blogs and Articles</h1>
              <div className="w-20 h-1 bg-white rounded-full mx-auto mb-6"></div>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Stay informed with our latest insights, market analysis, and expert advice on real estate trends
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-blue"></div>
              </div>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : !selectedBlog ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.length === 0 ? (
                  <p className="text-center text-brand-gray">No published blogs available</p>
                ) : (
                  blogs.map((blog, index) => (
                    <Card
                      key={blog.id}
                      className="group cursor-pointer overflow-hidden shadow-card hover:shadow-brand transition-all duration-500 hover:-translate-y-2 bg-white animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => setSelectedBlog(blog)}
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
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                  <div className="bg-white rounded-lg shadow-card overflow-hidden animate-scale-in">
                    <img
                      src={selectedBlog.image_url || '/api/placeholder/800/400'}
                      alt={selectedBlog.title}
                      className="w-full h-64 lg:h-96 object-cover"
                    />
                    <div className="p-8">
                      <div className="mb-6">
                        <div className="flex items-center justify-between text-sm text-brand-gray mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{selectedBlog.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{selectedBlog.publish_date}</span>
                            </div>
                          </div>
                          <span className="bg-brand-light-blue/20 text-brand-blue px-3 py-1 rounded-full text-xs font-medium">
                            {selectedBlog.category}
                          </span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-bold text-brand-navy mb-6">
                          {selectedBlog.title}
                        </h1>
                      </div>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-brand-gray leading-relaxed text-lg">
                          {selectedBlog.content}
                        </p>
                      </div>
                      <div className="mt-8 pt-8 border-t border-border">
                        <Button
                          variant="outline"
                          onClick={() => setSelectedBlog(null)}
                          className="flex items-center space-x-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to All Blogs</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/3">
                  <div className="sticky top-24">
                    <h3 className="text-xl font-bold text-brand-navy mb-6">Related Articles</h3>
                    <div className="space-y-4">
                      {otherBlogs.map((blog) => (
                        <Card
                          key={blog.id}
                          className="cursor-pointer hover:shadow-md transition-all duration-300 bg-white"
                          onClick={() => setSelectedBlog(blog)}
                        >
                          <CardContent className="p-4">
                            <div className="flex space-x-3">
                              <img
                                src={blog.image_url || '/api/placeholder/100/100'}
                                alt={blog.title}
                                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-brand-navy line-clamp-2 mb-1">
                                  {blog.title}
                                </h4>
                                <p className="text-xs text-brand-gray line-clamp-2 mb-2">
                                  {blog.excerpt}
                                </p>
                                <div className="text-xs text-brand-gray">
                                  {blog.publish_date}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
