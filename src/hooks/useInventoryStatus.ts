
import { useState, useEffect } from 'react';

interface InventoryItem {
  _id: string;
  productName: string;
  currentStock: number;
  lowStockThreshold: number;
}

export const useInventoryStatus = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Mock data for inventory status since we're removing the backend
    const mockInventoryItems: InventoryItem[] = [
      { _id: '1', productName: 'Product 1', currentStock: 15, lowStockThreshold: 10 },
      { _id: '2', productName: 'Product 2', currentStock: 5, lowStockThreshold: 10 },
      { _id: '3', productName: 'Product 3', currentStock: 20, lowStockThreshold: 10 },
      { _id: '4', productName: 'Product 4', currentStock: 8, lowStockThreshold: 10 }
    ];

    setInventoryItems(mockInventoryItems);
  }, []);

  return {
    inventoryItems,
    isLoading,
    error
  };
};
