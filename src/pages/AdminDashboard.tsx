
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardOverview from '@/components/admin/DashboardOverview';
import ProductManagement from '@/components/admin/ProductManagement';
import InventoryManagement from '@/components/admin/InventoryManagement';
import OrderManagement from '@/components/admin/OrderManagement';
import BlogManagement from '@/components/admin/BlogManagement';
import CustomerManagement from '@/components/admin/CustomerManagement';
import FrontendControl from '@/components/admin/FrontendControl';
import POSManagement from '@/components/admin/POSManagement';
import ActivityLogs from '@/components/admin/ActivityLogs';
import { toast } from 'sonner';

const AdminDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user is admin
  const { data: adminStatus, isLoading } = useQuery({
    queryKey: ['admin-status', user?.id],
    queryFn: async () => {
      if (!user) return { isAdmin: false };
      
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', String(user.id))
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin status:', error);
        return { isAdmin: false };
      }

      return { isAdmin: !!data };
    },
    enabled: !!user && isAuthenticated
  });

  if (!isAuthenticated) {
    toast.error('Please log in to access the admin dashboard');
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corporate"></div>
        </div>
      </Layout>
    );
  }

  if (!adminStatus?.isAdmin) {
    toast.error('Access denied. Admin privileges required.');
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-corporate-dark">Admin Dashboard</h1>
          <div className="text-sm text-gray-500">
            Welcome back, {user?.firstName} {user?.lastName}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:grid-cols-9 h-auto p-1">
            <TabsTrigger value="overview" className="text-xs p-2">Overview</TabsTrigger>
            <TabsTrigger value="products" className="text-xs p-2">Products</TabsTrigger>
            <TabsTrigger value="inventory" className="text-xs p-2">Inventory</TabsTrigger>
            <TabsTrigger value="orders" className="text-xs p-2">Orders</TabsTrigger>
            <TabsTrigger value="pos" className="text-xs p-2">POS</TabsTrigger>
            <TabsTrigger value="blog" className="text-xs p-2">Blog</TabsTrigger>
            <TabsTrigger value="customers" className="text-xs p-2">Customers</TabsTrigger>
            <TabsTrigger value="frontend" className="text-xs p-2">Frontend</TabsTrigger>
            <TabsTrigger value="logs" className="text-xs p-2">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryManagement />
          </TabsContent>

          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="pos">
            <POSManagement />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerManagement />
          </TabsContent>

          <TabsContent value="frontend">
            <FrontendControl />
          </TabsContent>

          <TabsContent value="logs">
            <ActivityLogs />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
