
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Product } from '@/types/pos.types';

interface RecentSalesProps {
  onAddToCart: (product: Product) => void;
}

const RecentSales: React.FC<RecentSalesProps> = ({ onAddToCart }) => {
  // Fetch recent sales data
  const { data: recentProducts, isLoading } = useQuery({
    queryKey: ['recent-products'],
    queryFn: async () => {
      const response = await fetch('/api/pos/recent-products');
      if (!response.ok) {
        throw new Error('Failed to fetch recent products');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recently Sold</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading recent sales...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Sold</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentProducts && recentProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {recentProducts.slice(0, 6).map((product: Product) => (
                <div 
                  key={product._id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                >
                  <div className="truncate flex-1">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => onAddToCart(product)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-2">No recent sales</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSales;
