
import { useState } from 'react';

// Define types for the sales data
interface SalesItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface SalesData {
  id: string;
  timestamp: string;
  items: SalesItem[];
  total: number;
  paymentMethod: string;
  status: string;
}

export const useSalesData = () => {
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

  return { salesData, salesSummary };
};
