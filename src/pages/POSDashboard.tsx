
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import PosHeader from '@/components/pos/PosHeader';
import PosCart from '@/components/pos/PosCart';
import ProductsSection from '@/components/pos/ProductsSection';
import PaymentProcessor from '@/components/pos/PaymentProcessor';
import InventoryStatus from '@/components/pos/InventoryStatus';
import { useCartManagement } from '@/hooks/useCartManagement';
import { useProductSearch } from '@/hooks/useProductSearch';
import { useInventoryStatus } from '@/hooks/useInventoryStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    isLoading: inventoryLoading,
    error: inventoryError
  } = useInventoryStatus();

  // Handle order completion (clear cart)
  const handleOrderComplete = () => {
    setCart([]);
  };

  // Handle any errors
  if (productsError) {
    return <div className="text-center p-8">Error loading products: {productsError.toString()}</div>;
  }

  return (
    <Layout>
      <div className="flex flex-col h-screen max-h-screen overflow-hidden">
        <PosHeader onClearCart={handleClearCart} />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Left Side: Products Section + Inventory Status */}
          <div className="w-2/3 flex flex-col overflow-hidden">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="ml-4 mt-2">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="inventory">Inventory Status</TabsTrigger>
              </TabsList>
              
              <TabsContent value="products" className="flex-1 overflow-hidden">
                <ProductsSection
                  products={products || []}
                  isLoading={productsLoading}
                  categories={categories || []}
                  onAddToCart={handleAddToCart}
                  onSearch={handleSearch}
                  onCategoryChange={handleCategoryChange}
                />
              </TabsContent>
              
              <TabsContent value="inventory" className="p-4">
                <InventoryStatus 
                  items={inventoryItems} 
                  isLoading={inventoryLoading} 
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
    </Layout>
  );
};

export default POSDashboard;
