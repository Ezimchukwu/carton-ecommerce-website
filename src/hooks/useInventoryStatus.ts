
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface InventoryItem {
  _id: string;
  productName: string;
  currentStock: number;
  lowStockThreshold: number;
}

export const useInventoryStatus = () => {
  const {
    data: inventoryItems,
    isLoading,
    error
  } = useQuery({
    queryKey: ['inventory-status'],
    queryFn: async () => {
      const response = await fetch('/api/inventory/status');
      if (!response.ok) {
        throw new Error('Failed to fetch inventory status');
      }
      
      const data = await response.json();
      return data.items.map((item: any) => ({
        _id: item._id,
        productName: typeof item.product === 'string' ? item.product : item.product.name,
        currentStock: item.quantity,
        lowStockThreshold: item.lowStockThreshold || 10
      }));
    }
  });

  return {
    inventoryItems: inventoryItems || [],
    isLoading,
    error
  };
};
