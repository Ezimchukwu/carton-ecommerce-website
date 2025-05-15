
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, ShoppingBag } from 'lucide-react';

interface SalesSummary {
  today: { count: number; total: number };
  week: { count: number; total: number };
  month: { count: number; total: number };
}

interface SalesSummaryCardsProps {
  salesSummary: SalesSummary;
}

const SalesSummaryCards: React.FC<SalesSummaryCardsProps> = ({ salesSummary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Today's Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">${salesSummary.today.total.toFixed(2)}</div>
              <div className="text-sm text-gray-500">{salesSummary.today.count} orders</div>
            </div>
            <BarChart3 className="h-8 w-8 text-primary opacity-80" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Weekly Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">${salesSummary.week.total.toFixed(2)}</div>
              <div className="text-sm text-gray-500">{salesSummary.week.count} orders</div>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500 opacity-80" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Monthly Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold">${salesSummary.month.total.toFixed(2)}</div>
              <div className="text-sm text-gray-500">{salesSummary.month.count} orders</div>
            </div>
            <ShoppingBag className="h-8 w-8 text-blue-500 opacity-80" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesSummaryCards;
