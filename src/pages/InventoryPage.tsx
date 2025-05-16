
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import InventoryStatus from '@/components/pos/InventoryStatus';
import { useInventoryStatus } from '@/hooks/useInventoryStatus';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import PosHeader from '@/components/pos/PosHeader';

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
  
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  // Check authentication on mount
  useEffect(() => {
    setAuthenticated(isAdminAuthenticated());
  }, []);

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
    return <Navigate to="/" replace />;
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
    <Layout>
      <PosHeader title="PAPER PACKAGING COMPANY - Inventory Management" />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
        <Card className="bg-white rounded-lg shadow p-6">
          <InventoryStatus 
            items={inventoryItems} 
            isLoading={isLoading}
            onUpdateStock={updateInventoryItem}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default InventoryPage;
