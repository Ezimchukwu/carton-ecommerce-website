
import React from 'react';
import Layout from '@/components/layout/Layout';
import PosHeader from '@/components/pos/PosHeader';
import PosCart from '@/components/pos/PosCart';
import ProductsSection from '@/components/pos/ProductsSection';
import PaymentProcessor from '@/components/pos/PaymentProcessor';
import { useCartManagement } from '@/hooks/useCartManagement';
import { useProductSearch } from '@/hooks/useProductSearch';

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
    isLoading,
    error,
    handleSearch,
    handleCategoryChange
  } = useProductSearch();

  // Handle order completion (clear cart)
  const handleOrderComplete = () => {
    setCart([]);
  };

  if (error) {
    return <div className="text-center p-8">Error loading products: {error.toString()}</div>;
  }

  return (
    <Layout>
      <div className="flex flex-col h-screen max-h-screen overflow-hidden">
        <PosHeader onClearCart={handleClearCart} />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Products Section */}
          <ProductsSection
            products={products || []}
            isLoading={isLoading}
            categories={categories || []}
            onAddToCart={handleAddToCart}
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
          />
          
          {/* Cart Section */}
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
              
              {/* Replace the button in PosCart with our PaymentProcessor */}
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
