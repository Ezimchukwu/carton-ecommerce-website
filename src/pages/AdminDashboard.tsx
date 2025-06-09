
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
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
import AdminAuthGuard from '@/components/admin/AdminAuthGuard';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AdminAuthGuard>
      <Layout>
        <div className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-corporate-dark">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Admin Access
              </span>
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
    </AdminAuthGuard>
  );
};

export default AdminDashboard;
