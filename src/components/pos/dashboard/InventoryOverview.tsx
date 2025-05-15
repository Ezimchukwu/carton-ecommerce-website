
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

interface InventoryItem {
  _id: string;
  productId: string;
  productName: string;
  currentStock: number;
  lowStockThreshold: number;
}

interface InventoryOverviewProps {
  inventoryItems: InventoryItem[];
}

const InventoryOverview: React.FC<InventoryOverviewProps> = ({ inventoryItems }) => {
  const lowStockCount = inventoryItems.filter(item => 
    item.currentStock <= item.lowStockThreshold
  ).length;

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Inventory Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Total Products:</span>
            <span className="font-semibold">{inventoryItems.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Low Stock Items:</span>
            <span className={`font-semibold ${lowStockCount > 0 ? 'text-amber-600' : 'text-green-600'}`}>
              {lowStockCount}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Out of Stock Items:</span>
            <span className="font-semibold text-red-600">
              {inventoryItems.filter(item => item.currentStock === 0).length}
            </span>
          </div>
        </div>
        
        {lowStockCount > 0 && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm">
            <div className="flex items-center text-amber-600 font-medium mb-2">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Low Stock Alerts
            </div>
            <ul className="space-y-1 pl-5 list-disc">
              {inventoryItems
                .filter(item => item.currentStock <= item.lowStockThreshold)
                .slice(0, 5)
                .map(item => (
                  <li key={item._id} className="text-sm">
                    {item.productName} ({item.currentStock} left)
                  </li>
                ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InventoryOverview;
