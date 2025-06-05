
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Eye, Save, Code } from 'lucide-react';
import { toast } from 'sonner';

const CMSPageEditor: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState('home');
  const [pageContent, setPageContent] = useState({
    title: 'Home Page',
    metaDescription: 'Welcome to our packaging solutions website',
    content: 'This is the home page content...',
    customCSS: '',
    customJS: ''
  });

  const pages = [
    { value: 'home', label: 'Home Page' },
    { value: 'about', label: 'About Page' },
    { value: 'products', label: 'Products Page' },
    { value: 'contact', label: 'Contact Page' },
  ];

  const handleSave = () => {
    toast.success('Page saved successfully');
  };

  const handlePreview = () => {
    toast.info('Opening preview...');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Page Editor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <Label htmlFor="pageSelect">Select Page:</Label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pages.map(page => (
                    <SelectItem key={page.value} value={page.value}>
                      {page.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          <Tabs defaultValue="content" className="space-y-4">
            <TabsList>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">SEO Settings</TabsTrigger>
              <TabsTrigger value="custom">Custom Code</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <div>
                <Label htmlFor="pageTitle">Page Title</Label>
                <Input
                  id="pageTitle"
                  value={pageContent.title}
                  onChange={(e) => setPageContent({ ...pageContent, title: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="pageContent">Page Content</Label>
                <Textarea
                  id="pageContent"
                  value={pageContent.content}
                  onChange={(e) => setPageContent({ ...pageContent, content: e.target.value })}
                  className="min-h-[300px]"
                  placeholder="Enter your page content here..."
                />
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4">
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={pageContent.metaDescription}
                  onChange={(e) => setPageContent({ ...pageContent, metaDescription: e.target.value })}
                  placeholder="Enter meta description for SEO..."
                />
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <div>
                <Label htmlFor="customCSS">Custom CSS</Label>
                <Textarea
                  id="customCSS"
                  value={pageContent.customCSS}
                  onChange={(e) => setPageContent({ ...pageContent, customCSS: e.target.value })}
                  className="min-h-[150px] font-mono"
                  placeholder="/* Custom CSS for this page */"
                />
              </div>
              
              <div>
                <Label htmlFor="customJS">Custom JavaScript</Label>
                <Textarea
                  id="customJS"
                  value={pageContent.customJS}
                  onChange={(e) => setPageContent({ ...pageContent, customJS: e.target.value })}
                  className="min-h-[150px] font-mono"
                  placeholder="// Custom JavaScript for this page"
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSPageEditor;
