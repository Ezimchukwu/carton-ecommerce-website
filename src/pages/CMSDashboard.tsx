
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Monitor, 
  Palette, 
  FileText, 
  Image, 
  Layout as LayoutIcon,
  Settings
} from 'lucide-react';
import CMSNavigation from '@/components/cms/CMSNavigation';
import CMSPageEditor from '@/components/cms/CMSPageEditor';
import CMSThemeCustomizer from '@/components/cms/CMSThemeCustomizer';
import CMSContentBlocks from '@/components/cms/CMSContentBlocks';
import CMSMediaLibrary from '@/components/cms/CMSMediaLibrary';
import CMSSettings from '@/components/cms/CMSSettings';

const CMSDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please log in to access the CMS');
      navigate('/');
      return;
    }
    
    checkAdminStatus();
  }, [isAuthenticated, user]);

  const checkAdminStatus = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', String(user.id))
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin status:', error);
        toast.error('Error verifying CMS access');
        navigate('/');
        return;
      }

      if (!data) {
        toast.error('Access denied. CMS privileges required.');
        navigate('/');
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error verifying CMS access');
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="flex items-center justify-center">
            <div className="text-lg">Loading CMS...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-corporate-dark mb-2">Content Management System</h1>
          <p className="text-gray-600">Manage your entire website interface and content</p>
        </div>

        {/* CMS Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pages</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Active pages
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Components</CardTitle>
              <LayoutIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">
                UI components
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Media Files</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">
                Images & assets
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Theme</CardTitle>
              <Palette className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">
                Custom theme
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CMS Management Tabs */}
        <Tabs defaultValue="navigation" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="pages">Page Editor</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="blocks">Content Blocks</TabsTrigger>
            <TabsTrigger value="media">Media Library</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="navigation">
            <CMSNavigation />
          </TabsContent>

          <TabsContent value="pages">
            <CMSPageEditor />
          </TabsContent>

          <TabsContent value="theme">
            <CMSThemeCustomizer />
          </TabsContent>

          <TabsContent value="blocks">
            <CMSContentBlocks />
          </TabsContent>

          <TabsContent value="media">
            <CMSMediaLibrary />
          </TabsContent>

          <TabsContent value="settings">
            <CMSSettings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CMSDashboard;
