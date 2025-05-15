
import React, { useState, useEffect } from 'react';
import PosHeader from '@/components/pos/PosHeader';
import PosCart from '@/components/pos/PosCart';
import ProductsSection from '@/components/pos/ProductsSection';
import PaymentProcessor from '@/components/pos/PaymentProcessor';
import InventoryStatus from '@/components/pos/InventoryStatus';
import { useCartManagement } from '@/hooks/useCartManagement';
import { useProductSearch } from '@/hooks/useProductSearch';
import { useInventoryStatus } from '@/hooks/useInventoryStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardTabContent from '@/components/pos/dashboard/DashboardTabContent';
import ErrorDisplay from '@/components/pos/dashboard/ErrorDisplay';

const POSDashboard = () => {
  // Use our custom hooks
  const { 
    cart, 
    subtotal, 
    tax, 
    total, 
    handleAddToCart, 
    handleRemoveFromCart, 
    handleUpdateQuantity, 
    handleClearCart,
    setCart
  } = useCartManagement();
  
  const {
    products,
    categories,
    isLoading: productsLoading,
    error: productsError,
    handleSearch,
    handleCategoryChange
  } = useProductSearch();

  const {
    inventoryItems,
    inventoryHistory,
    isLoading: inventoryLoading,
    error: inventoryError,
    updateInventoryItem
  } = useInventoryStatus();

  // For sales summary
  const [salesSummary, setSalesSummary] = useState({
    today: { count: 0, total: 0 },
    week: { count: 0, total: 0 },
    month: { count: 0, total: 0 },
  });

  // Mock sales data
  useEffect(() => {
    setTimeout(() => {
      setSalesSummary({
        today: { count: 12, total: 459.97 },
        week: { count: 47, total: 1862.50 },
        month: { count: 189, total: 7125.35 },
      });
    }, 1000);
  }, []);

  // Handle order completion (clear cart)
  const handleOrderComplete = () => {
    // Update inventory when order is completed
    cart.forEach(item => {
      const product = item.product;
      const inventoryItem = inventoryItems.find(invItem => 
        invItem.productId === product._id
      );
      
      if (inventoryItem) {
        const newStock = Math.max(0, inventoryItem.currentStock - item.quantity);
        updateInventoryItem(inventoryItem._id, newStock);
      }
    });
    
    // Clear cart
    setCart([]);
    
    // Update sales summary (simple mock update)
    setSalesSummary(prev => ({
      ...prev,
      today: {
        count: prev.today.count + 1,
        total: prev.today.total + total
      }
    }));
  };

  // Handle any errors
  if (productsError || inventoryError) {
    return <ErrorDisplay error={productsError || inventoryError} />;
  }

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <PosHeader onClearCart={handleClearCart} />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Products Section + Inventory Status */}
        <div className="w-2/3 flex flex-col overflow-hidden">
          <Tabs defaultValue="products" className="w-full flex flex-col h-full">
            <div className="px-4 pt-2">
              <TabsList className="mb-2">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="products" className="flex-1 overflow-hidden px-4 pb-4">
              <ProductsSection
                products={products || []}
                isLoading={productsLoading}
                categories={categories || []}
                onAddToCart={handleAddToCart}
                onSearch={handleSearch}
                onCategoryChange={handleCategoryChange}
              />
            </TabsContent>
            
            <TabsContent value="inventory" className="h-full overflow-auto px-4 pb-4">
              <InventoryStatus 
                items={inventoryItems} 
                isLoading={inventoryLoading}
                onUpdateStock={updateInventoryItem}
              />
            </TabsContent>

            <TabsContent value="dashboard" className="flex-1 overflow-auto">
              <DashboardTabContent 
                salesSummary={salesSummary}
                inventoryItems={inventoryItems}
                inventoryHistory={inventoryHistory}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right Side: Cart Section */}
        <div className="w-1/3 border-l border-gray-200 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-hidden">
              <PosCart 
                items={cart}
                subtotal={subtotal}
                tax={tax}
                total={total}
                onRemoveItem={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                onCheckout={() => {}} // We'll handle checkout in PaymentProcessor
              />
            </div>
            
            {/* Payment Processor */}
            <div className="p-4 bg-white border-t border-gray-200">
              <PaymentProcessor
                cart={cart}
                subtotal={subtotal}
                tax={tax}
                total={total}
                onOrderComplete={handleOrderComplete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSDashboard;
