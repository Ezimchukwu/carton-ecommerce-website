import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, MessageCircle, Share2, BookmarkPlus, ThumbsUp, Facebook, Twitter, Linkedin } from 'lucide-react';

// Import the blogPosts data and types from the shared location
import { blogPosts, BlogPost } from '@/data/blogPosts';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);

  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-6">Post not found</h1>
          <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
        </div>
      </Layout>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${post.title}`, '_blank');
        break;
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the comment to your backend
    console.log('Comment submitted:', comment);
    setComment('');
  };

  const getRelatedPosts = (currentPost: BlogPost) => {
    return blogPosts
      .filter(p => p.id !== currentPost.id) // Exclude current post
      .filter(p => 
        p.category === currentPost.category || // Same category
        p.tags.some(tag => currentPost.tags.includes(tag)) // Shared tags
      )
      .slice(0, 3); // Get top 3 related posts
  };

  return (
    <Layout>
      <div className="py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-8" 
            onClick={() => navigate('/blog')}
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Blog
          </Button>

          <article className="prose max-w-none">
            <div className="mb-8">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="bg-corporate/10 text-corporate px-3 py-1 rounded-full">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="text-4xl font-bold text-corporate-dark mb-6">{post.title}</h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                  <div>
                    <div className="font-semibold">{post.author}</div>
                    <div className="text-sm text-gray-500">Author</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowShareMenu(!showShareMenu)}
                  >
                    <Share2 size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <BookmarkPlus size={20} />
                  </Button>
                </div>
              </div>
            </div>

            {showShareMenu && (
              <Card className="p-4 mb-8">
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleShare('facebook')}
                  >
                    <Facebook className="mr-2" size={18} />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleShare('twitter')}
                  >
                    <Twitter className="mr-2" size={18} />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleShare('linkedin')}
                  >
                    <Linkedin className="mr-2" size={18} />
                    LinkedIn
                  </Button>
                </div>
              </Card>
            )}

            <div className="aspect-[21/9] mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div 
              className="prose prose-lg max-w-none prose-headings:text-corporate-dark prose-a:text-corporate"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <ThumbsUp size={18} />
                <span>Helpful</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 size={18} />
                <span>Share</span>
              </Button>
            </div>
          </article>

          {/* Comments Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Comments</h2>
            
            {/* Comment Form */}
            <Card className="p-6 mb-8">
              <form onSubmit={handleComment}>
                <Textarea
                  placeholder="Share your thoughts..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mb-4"
                  rows={4}
                />
                <Button type="submit">Post Comment</Button>
              </form>
            </Card>

            {/* Sample Comments */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-semibold">John Doe</div>
                        <div className="text-sm text-gray-500">2 days ago</div>
                      </div>
                      <Button variant="ghost" size="sm">Reply</Button>
                    </div>
                    <p className="text-gray-600">
                      This article was very helpful! I learned a lot about packaging solutions.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getRelatedPosts(post).map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => navigate(`/blog/${relatedPost.id}`)}
                >
                  <div className="aspect-[16/9]">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <span className="text-corporate">{relatedPost.category}</span>
                      <span>•</span>
                      <span className="text-gray-500">{relatedPost.readTime}</span>
                    </div>
                    <h3 className="font-bold mb-2 line-clamp-2 hover:text-corporate transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">{relatedPost.date}</span>
                      <span className="text-sm font-medium text-corporate">Read more →</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPostPage; 