
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useInventoryStatus } from '@/hooks/useInventoryStatus';
import DashboardTabContent from '@/components/pos/dashboard/DashboardTabContent';
import ProductsSection from '@/components/pos/ProductsSection';
import RecentSales from '@/components/pos/RecentSales';
import PosCart from '@/components/pos/PosCart';
import PosHeader from '@/components/pos/PosHeader';
import ErrorDisplay from '@/components/pos/dashboard/ErrorDisplay';

// Define types for the sales data
interface SalesData {
  id: string;
  timestamp: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  paymentMethod: string;
  status: string;
}

const POSDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { inventoryItems, inventoryHistory, isLoading, error } = useInventoryStatus();

  // Mock sales data for demonstration
  const [salesData] = useState<SalesData[]>([
    {
      id: 'sale-1',
      timestamp: new Date().toISOString(),
      items: [
        { id: 'item-1', name: 'Small Pizza Box', price: 1.99, quantity: 5 },
        { id: 'item-2', name: 'Medium Pizza Box', price: 2.49, quantity: 3 }
      ],
      total: 17.42,
      paymentMethod: 'cash',
      status: 'completed'
    },
    {
      id: 'sale-2',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      items: [
        { id: 'item-3', name: 'Large Moving Box', price: 3.99, quantity: 2 },
        { id: 'item-4', name: 'Bubble Wrap Roll', price: 4.99, quantity: 1 }
      ],
      total: 12.97,
      paymentMethod: 'card',
      status: 'completed'
    },
    {
      id: 'sale-3',
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      items: [
        { id: 'item-5', name: 'Gift Box Set', price: 9.99, quantity: 1 }
      ],
      total: 9.99,
      paymentMethod: 'card',
      status: 'completed'
    }
  ]);

  // Calculate sales summaries
  const salesSummary = {
    today: {
      count: salesData.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        const today = new Date();
        return saleDate.toDateString() === today.toDateString();
      }).length,
      total: salesData
        .filter(sale => {
          const saleDate = new Date(sale.timestamp);
          const today = new Date();
          return saleDate.toDateString() === today.toDateString();
        })
        .reduce((sum, sale) => sum + sale.total, 0)
    },
    week: {
      count: salesData.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return saleDate >= weekAgo;
      }).length,
      total: salesData
        .filter(sale => {
          const saleDate = new Date(sale.timestamp);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return saleDate >= weekAgo;
        })
        .reduce((sum, sale) => sum + sale.total, 0)
    },
    month: {
      count: salesData.length,
      total: salesData.reduce((sum, sale) => sum + sale.total, 0)
    }
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

  // Define stock history in proper format expected by the component
  const stockHistoryFormatted = inventoryHistory?.map(item => ({
    id: item.id,
    productName: item.productName,
    timestamp: item.timestamp,
    changeType: item.changeType === 'adjust' ? 'update' : item.changeType,
    quantityChange: item.quantityChange,
    previousStock: item.previousStock,
    newStock: item.newStock
  }));

  return (
    <div className="container mx-auto p-4 h-full">
      <PosHeader title="POS Dashboard" />
      
      <Tabs 
        defaultValue="dashboard" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full mt-4"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="pos">Point of Sale</TabsTrigger>
          <TabsTrigger value="sales">Recent Sales</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-4">
          <DashboardTabContent
            salesSummary={salesSummary}
            inventoryItems={inventoryItems}
            inventoryHistory={stockHistoryFormatted}
          />
        </TabsContent>
        
        <TabsContent value="pos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <ProductsSection />
            </div>
            <div>
              <PosCart />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-4">
          <RecentSales sales={salesData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default POSDashboard;
