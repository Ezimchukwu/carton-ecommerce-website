
import React, { useState } from 'react';
import { useInventoryStatus } from '@/hooks/useInventoryStatus';
import PosHeader from '@/components/pos/PosHeader';
import AdminAuthentication from '@/components/pos/dashboard/AdminAuthentication';
import POSDashboardTabs from '@/components/pos/dashboard/POSDashboardTabs';
import { useMockProducts } from '@/hooks/useMockProducts';
import { useSalesData } from '@/hooks/useSalesData';
import { useCartManagement } from '@/hooks/useCartManagement';
import ErrorDisplay from '@/components/pos/dashboard/ErrorDisplay';

const POSDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { inventoryItems, inventoryHistory, isLoading, error } = useInventoryStatus();
  const { cart, subtotal, tax, total, handleAddToCart, handleRemoveFromCart, handleUpdateQuantity, handleClearCart } = useCartManagement();
  const { mockProducts, mockCategories } = useMockProducts();
  const { salesData, salesSummary } = useSalesData();

  // Search and category functions
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Actual implementation would filter products
  };

  const handleCategoryChange = (category: string) => {
    console.log('Category selected:', category);
    // Actual implementation would filter by category
  };

  // If there's an error loading inventory data
  if (error) {
    return (
      <div className="container mx-auto p-8">
        <ErrorDisplay
          title="Error Loading Dashboard"
          message={error instanceof Error ? error.message : 'An unknown error occurred'}
        />
      </div>
    );
  }

  // Convert inventory history to the expected format
  const stockHistoryFormatted = inventoryHistory?.map(item => ({
    id: item.id,
    productName: item.productName,
    timestamp: item.timestamp,
    // Ensure changeType is correctly typed as a union literal type
    changeType: item.changeType === 'add' ? 'add' as const :
               item.changeType === 'remove' ? 'remove' as const : 'update' as const,
    quantityChange: item.quantityChange,
    previousStock: item.previousStock,
    newStock: item.newStock
  }));

  return (
    <AdminAuthentication>
      <div className="container mx-auto p-4 h-full bg-gray-50 min-h-screen">
        <PosHeader title="PAPER PACKAGING COMPANY - Admin Dashboard" onClearCart={handleClearCart} />
        
        <POSDashboardTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          salesSummary={salesSummary}
          inventoryItems={inventoryItems}
          stockHistoryFormatted={stockHistoryFormatted || []}
          mockProducts={mockProducts}
          mockCategories={mockCategories}
          salesData={salesData}
          isLoading={isLoading}
          cart={cart}
          subtotal={subtotal}
          tax={tax}
          total={total}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
          handleUpdateQuantity={handleUpdateQuantity}
          handleClearCart={handleClearCart}
          handleSearch={handleSearch}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
    </AdminAuthentication>
  );
};

export default POSDashboard;
