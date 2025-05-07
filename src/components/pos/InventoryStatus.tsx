
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface InventoryItemStatus {
  _id: string;
  productName: string;
  currentStock: number;
  lowStockThreshold: number;
}

interface InventoryStatusProps {
  items: InventoryItemStatus[];
  isLoading: boolean;
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({ items, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Inventory Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading inventory status...</p>
        </CardContent>
      </Card>
    );
  }

  // Sort items: low stock first, then alphabetically
  const sortedItems = [...items].sort((a, b) => {
    // Check if a is low stock but b is not
    if (a.currentStock <= a.lowStockThreshold && b.currentStock > b.lowStockThreshold) {
      return -1;
    }
    // Check if b is low stock but a is not
    if (b.currentStock <= b.lowStockThreshold && a.currentStock > a.lowStockThreshold) {
      return 1;
    }
    // If both are in the same stock status, sort alphabetically
    return a.productName.localeCompare(b.productName);
  });

  const lowStockCount = items.filter(item => item.currentStock <= item.lowStockThreshold).length;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>Inventory Status</span>
          {lowStockCount > 0 && (
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {lowStockCount} Low Stock
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-64 overflow-y-auto">
          {sortedItems.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No inventory data available</p>
          ) : (
            <ul className="space-y-2">
              {sortedItems.map(item => {
                const isLowStock = item.currentStock <= item.lowStockThreshold;
                
                return (
                  <li 
                    key={item._id} 
                    className={`flex justify-between items-center p-2 rounded ${
                      isLowStock ? 'bg-amber-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex-1">
                      <p className="font-medium truncate">{item.productName}</p>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600">Stock: {item.currentStock}</span>
                      </div>
                    </div>
                    
                    {isLowStock ? (
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    ) : (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryStatus;
