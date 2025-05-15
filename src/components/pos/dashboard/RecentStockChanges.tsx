
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StockHistoryEntry {
  id: string;
  productName: string;
  timestamp: string;
  changeType: 'add' | 'remove' | 'update';
  quantityChange: number;
  previousStock: number;
  newStock: number;
}

interface RecentStockChangesProps {
  inventoryHistory: StockHistoryEntry[];
}

const RecentStockChanges: React.FC<RecentStockChangesProps> = ({ inventoryHistory }) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Recent Stock Changes</CardTitle>
      </CardHeader>
      <CardContent>
        {inventoryHistory && inventoryHistory.length > 0 ? (
          <div className="space-y-3">
            {inventoryHistory.slice(0, 5).map((entry) => (
              <div key={entry.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{entry.productName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(entry.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    entry.changeType === 'add' ? 'text-green-600' : 
                    entry.changeType === 'remove' ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {entry.changeType === 'add' ? '+' : ''}{entry.quantityChange}
                  </p>
                  <p className="text-xs text-gray-500">
                    {entry.previousStock} → {entry.newStock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No recent stock changes</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentStockChanges;
