
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface InventoryItem {
  _id: string;
  productName: string;
  currentStock: number;
  lowStockThreshold: number;
  sku: string;
  category: string;
  lastUpdated: string;
}

export const useInventoryStatus = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [inventoryHistory, setInventoryHistory] = useState<Array<{
    id: string;
    productId: string;
    productName: string;
    changeType: 'add' | 'remove' | 'adjust';
    quantityChange: number;
    timestamp: string;
    previousStock: number;
    newStock: number;
    user: string;
  }>>([]);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    // Mock data for inventory status
    const mockInventoryItems: InventoryItem[] = [
      { 
        _id: '1', 
        productName: 'Small Pizza Box', 
        currentStock: 15, 
        lowStockThreshold: 10,
        sku: 'PZB-S-001',
        category: 'Pizza Boxes',
        lastUpdated: new Date().toISOString()
      },
      { 
        _id: '2', 
        productName: 'Medium Pizza Box', 
        currentStock: 5, 
        lowStockThreshold: 10,
        sku: 'PZB-M-002',
        category: 'Pizza Boxes',
        lastUpdated: new Date().toISOString()
      },
      { 
        _id: '3', 
        productName: 'Large Moving Box', 
        currentStock: 20, 
        lowStockThreshold: 10,
        sku: 'MOV-L-003',
        category: 'Moving Boxes',
        lastUpdated: new Date().toISOString()
      },
      { 
        _id: '4', 
        productName: 'Small Shipping Box', 
        currentStock: 8, 
        lowStockThreshold: 10,
        sku: 'SHP-S-004',
        category: 'Shipping Boxes',
        lastUpdated: new Date().toISOString()
      },
      { 
        _id: '5', 
        productName: 'Gift Box Set', 
        currentStock: 3, 
        lowStockThreshold: 5,
        sku: 'GFT-SET-005',
        category: 'Gift Packaging',
        lastUpdated: new Date().toISOString()
      },
      { 
        _id: '6', 
        productName: 'Kraft Paper Roll', 
        currentStock: 12, 
        lowStockThreshold: 8,
        sku: 'WRP-K-006',
        category: 'Wrapping Paper',
        lastUpdated: new Date().toISOString()
      },
      { 
        _id: '7', 
        productName: 'Bubble Wrap Roll', 
        currentStock: 2, 
        lowStockThreshold: 8,
        sku: 'PCK-BW-007',
        category: 'Packing Materials',
        lastUpdated: new Date().toISOString()
      },
      { 
        _id: '8', 
        productName: 'Carton Sealing Tape', 
        currentStock: 30, 
        lowStockThreshold: 10,
        sku: 'PCK-TP-008',
        category: 'Packing Materials',
        lastUpdated: new Date().toISOString()
      }
    ];

    // Generate some history entries
    const mockHistory = [
      {
        id: '1',
        productId: '1',
        productName: 'Small Pizza Box',
        changeType: 'add' as const,
        quantityChange: 5,
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        previousStock: 10,
        newStock: 15,
        user: 'Admin User'
      },
      {
        id: '2',
        productId: '2',
        productName: 'Medium Pizza Box',
        changeType: 'remove' as const,
        quantityChange: -2,
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        previousStock: 7,
        newStock: 5,
        user: 'Staff User'
      },
      {
        id: '3',
        productId: '4',
        productName: 'Small Shipping Box',
        changeType: 'adjust' as const,
        quantityChange: -4,
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        previousStock: 12,
        newStock: 8,
        user: 'Admin User'
      }
    ];

    // Simulate API delay
    setTimeout(() => {
      setInventoryItems(mockInventoryItems);
      setInventoryHistory(mockHistory);
      setIsLoading(false);
    }, 800);
  }, []);

  // Function to update inventory item
  const updateInventoryItem = (_id: string, newStock: number) => {
    setInventoryItems(prev => {
      const item = prev.find(i => i._id === _id);
      if (!item) return prev;
      
      const prevStock = item.currentStock;
      
      // Create history entry
      const historyEntry = {
        id: `hist_${Date.now()}`,
        productId: _id,
        productName: item.productName,
        changeType: newStock > prevStock ? 'add' as const : 'remove' as const,
        quantityChange: newStock - prevStock,
        timestamp: new Date().toISOString(),
        previousStock: prevStock,
        newStock: newStock,
        user: 'Current User'
      };
      
      setInventoryHistory(prev => [historyEntry, ...prev]);
      
      // Check if we should show low stock notification
      if (newStock <= item.lowStockThreshold && prevStock > item.lowStockThreshold) {
        toast.warning(`${item.productName} is now below the minimum stock level!`);
      }
      
      return prev.map(i => 
        i._id === _id 
          ? { ...i, currentStock: newStock, lastUpdated: new Date().toISOString() } 
          : i
      );
    });
  };

  return {
    inventoryItems,
    inventoryHistory,
    isLoading,
    error,
    updateInventoryItem
  };
};
