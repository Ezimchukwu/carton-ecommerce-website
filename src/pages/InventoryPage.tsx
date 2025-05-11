
import React from 'react';
import Layout from '@/components/layout/Layout';
import InventoryStatus from '@/components/pos/InventoryStatus';
import { useInventoryStatus } from '@/hooks/useInventoryStatus';

const InventoryPage: React.FC = () => {
  const {
    inventoryItems,
    isLoading,
    error,
    updateInventoryItem
  } = useInventoryStatus();

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold mb-6">Loading Inventory...</h1>
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
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <InventoryStatus 
            items={inventoryItems} 
            isLoading={isLoading}
            onUpdateStock={updateInventoryItem}
          />
        </div>
      </div>
    </Layout>
  );
};

export default InventoryPage;
