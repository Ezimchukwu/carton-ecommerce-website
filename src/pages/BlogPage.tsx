import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Share2, MessageCircle, BookmarkPlus, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import from shared data file
import { blogPosts } from '@/data/blogPosts';

const BlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [featuredPost] = useState(blogPosts[0]); // First post as featured

  // Get unique categories
  const categories = ["all", ...Array.from(new Set(blogPosts.map(post => post.category.toLowerCase())))];

  // Filter posts when search term or category changes
  useEffect(() => {
    const filtered = blogPosts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
      const matchesCategory = selectedCategory === "all" || 
        post.category.toLowerCase() === selectedCategory;
        
      return matchesSearch && matchesCategory;
    });
    
    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <Layout>
      <div className="py-8">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-corporate-dark mb-6">
              Packaging Insights & Expertise
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the latest trends, expert tips, and innovations in packaging solutions to help your business thrive.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 hidden md:inline"><Filter size={18} className="inline mr-1" /> Filter:</span>
                <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className="capitalize whitespace-nowrap"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Stats */}
          {searchTerm && (
            <div className="mb-8">
              <p className="text-gray-600">
                Found {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} 
                {selectedCategory !== 'all' ? ` in ${selectedCategory}` : ''}
                {searchTerm ? ` for "${searchTerm}"` : ''}
              </p>
            </div>
          )}

          {/* Featured Post (only show if not filtering) */}
          {!searchTerm && selectedCategory === "all" && (
            <div className="mb-12">
              <Link to={`/blog/${featuredPost.id}`} className="block">
                <Card className="overflow-hidden transform transition-all hover:shadow-xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="aspect-[16/9] md:aspect-auto relative">
                      <img
                        src={featuredPost.image}
                        alt="Featured Post"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-corporate text-white px-3 py-1 rounded-full text-sm">
                        Featured
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-sm text-corporate mb-4">
                        <span className="font-medium">{featuredPost.category}</span>
                        <span>•</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <h2 className="text-3xl font-bold mb-4 text-corporate-dark">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <MessageCircle size={18} className="text-gray-400" />
                            <span className="text-sm text-gray-500">24 comments</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Share2 size={18} className="text-gray-400" />
                            <span className="text-sm text-gray-500">Share</span>
                          </div>
                        </div>
                        <Button>Read More</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts
              .filter(post => !searchTerm && selectedCategory === "all" ? post.id !== featuredPost.id : true)
              .map((post) => (
                <Link to={`/blog/${post.id}`} key={post.id}>
                  <Card className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-corporate">
                        {post.category}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-corporate-dark line-clamp-2 group-hover:text-corporate transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <MessageCircle size={18} className="text-gray-400" />
                          <Share2 size={18} className="text-gray-400" />
                          <BookmarkPlus size={18} className="text-gray-400" />
                        </div>
                        <span className="text-sm font-medium text-corporate">Read more →</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>

          {/* No Results Message */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">No matching posts found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button onClick={() => {setSearchTerm(''); setSelectedCategory('all');}}>
                Reset Filters
              </Button>
            </div>
          )}

          {/* Newsletter Section with Wholesale image background */}
          <div 
            className="mt-16 rounded-2xl p-12 text-center text-white relative overflow-hidden"
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/IMAGES/Wholsale 1.jpeg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Stay Ahead in Packaging Innovation</h3>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for exclusive insights, industry trends, and expert tips delivered directly to your inbox.
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button variant="secondary" className="bg-white text-corporate hover:bg-white/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">Popular Topics</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map(tag => (
                <Button 
                  key={tag} 
                  variant="outline" 
                  className="rounded-full"
                  onClick={() => setSearchTerm(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;