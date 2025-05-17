
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import DashboardTabContent from '@/components/pos/dashboard/DashboardTabContent';
import ProductsSection from '@/components/pos/ProductsSection';
import RecentSales from '@/components/pos/RecentSales';
import PosCart from '@/components/pos/PosCart';
import PaymentProcessor from '@/components/pos/PaymentProcessor';
import { Product, CartItem } from '@/types/pos.types';

interface POSDashboardTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  salesSummary: {
    today: { count: number; total: number };
    week: { count: number; total: number };
    month: { count: number; total: number };
  };
  inventoryItems: any[];
  stockHistoryFormatted: any[];
  mockProducts: Product[];
  mockCategories: { _id: string; name: string; slug: string }[];
  salesData: any[];
  isLoading: boolean;
  cart: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  handleAddToCart: (product: any) => void;
  handleRemoveFromCart: (id: string) => void; // Updated to expect a string parameter
  handleUpdateQuantity: (id: string, quantity: number) => void; // Updated to expect a string parameter
  handleClearCart: () => void;
  handleSearch: (query: string) => void;
  handleCategoryChange: (category: string) => void;
}

const POSDashboardTabs: React.FC<POSDashboardTabsProps> = ({
  activeTab,
  setActiveTab,
  salesSummary,
  inventoryItems,
  stockHistoryFormatted,
  mockProducts,
  mockCategories,
  salesData,
  isLoading,
  cart,
  subtotal,
  tax,
  total,
  handleAddToCart,
  handleRemoveFromCart,
  handleUpdateQuantity,
  handleClearCart,
  handleSearch,
  handleCategoryChange
}) => {
  return (
    <Tabs 
      defaultValue="dashboard" 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full mt-4"
    >
      <TabsList className="mb-4 w-full justify-start bg-white border">
        <TabsTrigger value="dashboard" className="text-base">Dashboard</TabsTrigger>
        <TabsTrigger value="pos" className="text-base">Point of Sale</TabsTrigger>
        <TabsTrigger value="sales" className="text-base">Recent Sales</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard" className="space-y-4">
        <DashboardTabContent
          salesSummary={salesSummary}
          inventoryItems={inventoryItems}
          inventoryHistory={stockHistoryFormatted || []}
        />
      </TabsContent>
      
      <TabsContent value="pos" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <ProductsSection 
              products={mockProducts}
              isLoading={isLoading}
              categories={mockCategories}
              onAddToCart={handleAddToCart}
              onSearch={handleSearch}
              onCategoryChange={handleCategoryChange}
            />
          </div>
          <div>
            <div className="bg-white rounded-lg shadow-sm border h-full flex flex-col">
              <PosCart 
                items={cart}
                subtotal={subtotal}
                tax={tax}
                total={total}
                onRemoveItem={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
                onCheckout={() => console.log('Checkout')}
              />
              <div className="p-4 border-t">
                <PaymentProcessor
                  cart={cart}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                  onOrderComplete={handleClearCart}
                />
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="sales" className="space-y-4">
        <RecentSales 
          onAddToCart={handleAddToCart}
          sales={salesData}
        />
      </TabsContent>
    </Tabs>
  );
};

export default POSDashboardTabs;
