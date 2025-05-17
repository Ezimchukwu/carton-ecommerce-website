
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import InventoryStatus from '@/components/pos/InventoryStatus';
import { useInventoryStatus } from '@/hooks/useInventoryStatus';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import PosHeader from '@/components/pos/PosHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const isAdminAuthenticated = () => {
  return localStorage.getItem('isAdminAuthenticated') === 'true';
};

const InventoryPage: React.FC = () => {
  const {
    inventoryItems,
    isLoading,
    error,
    updateInventoryItem
  } = useInventoryStatus();
  
  const [activeTab, setActiveTab] = useState('current');
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  // Check authentication on mount
  useEffect(() => {
    setAuthenticated(isAdminAuthenticated());
  }, []);

  // Filter items based on stock level
  const lowStockItems = inventoryItems.filter(item => 
    item.currentStock <= item.lowStockThreshold && item.currentStock > 0
  );
  
  const outOfStockItems = inventoryItems.filter(item => 
    item.currentStock === 0
  );

  // If authentication state is still loading
  if (authenticated === null) {
    return (
      <Layout>
        <div className="container mx-auto p-8 flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corporate"></div>
        </div>
      </Layout>
    );
  }

  // If not authenticated, redirect to home
  if (authenticated === false) {
    toast.error("Admin access required. Please log in.");
    return <Navigate to="/admin/login" replace />;
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold mb-6">Loading Inventory...</h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-corporate"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Inventory</h1>
          <p>{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
        </div>
      </Layout>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <PosHeader title="PAPER PACKAGING COMPANY - Inventory Management" />
      <div className="container mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Add New Product
          </Button>
        </div>
        
        <Card className="bg-white rounded-lg shadow">
          <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 border-b rounded-t-lg">
              <TabsTrigger value="current" className="rounded-none">
                All Items ({inventoryItems.length})
              </TabsTrigger>
              <TabsTrigger value="lowstock" className="rounded-none">
                Low Stock ({lowStockItems.length})
              </TabsTrigger>
              <TabsTrigger value="outofstock" className="rounded-none">
                Out of Stock ({outOfStockItems.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="p-0">
              <InventoryStatus 
                items={inventoryItems} 
                isLoading={isLoading}
                onUpdateStock={updateInventoryItem}
              />
            </TabsContent>
            
            <TabsContent value="lowstock" className="p-0">
              <InventoryStatus 
                items={lowStockItems} 
                isLoading={isLoading}
                onUpdateStock={updateInventoryItem}
                emptyMessage="No low stock items found."
              />
            </TabsContent>
            
            <TabsContent value="outofstock" className="p-0">
              <InventoryStatus 
                items={outOfStockItems} 
                isLoading={isLoading}
                onUpdateStock={updateInventoryItem}
                emptyMessage="No out of stock items found."
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default InventoryPage;
