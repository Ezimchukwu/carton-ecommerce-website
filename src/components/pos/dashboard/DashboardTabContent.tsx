
import React from 'react';
import SalesSummaryCards from './SalesSummaryCards';
import InventoryOverview from './InventoryOverview';
import RecentStockChanges from './RecentStockChanges';

interface SalesSummary {
  today: { count: number; total: number };
  week: { count: number; total: number };
  month: { count: number; total: number };
}

interface InventoryItem {
  _id: string;
  productId: string;
  productName: string;
  currentStock: number;
  lowStockThreshold: number;
}

interface StockHistoryEntry {
  id: string;
  productName: string;
  timestamp: string;
  changeType: 'add' | 'remove' | 'update';
  quantityChange: number;
  previousStock: number;
  newStock: number;
}

interface DashboardTabContentProps {
  salesSummary: SalesSummary;
  inventoryItems: InventoryItem[];
  inventoryHistory: StockHistoryEntry[];
}

const DashboardTabContent: React.FC<DashboardTabContentProps> = ({
  salesSummary,
  inventoryItems,
  inventoryHistory
}) => {
  return (
    <div className="flex-1 overflow-auto px-4 pb-4">
      <SalesSummaryCards salesSummary={salesSummary} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InventoryOverview inventoryItems={inventoryItems} />
        <RecentStockChanges inventoryHistory={inventoryHistory} />
      </div>
    </div>
  );
};

export default DashboardTabContent;
