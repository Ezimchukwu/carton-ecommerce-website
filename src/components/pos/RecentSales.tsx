
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Product } from '@/types/pos.types';
import { useState, useEffect } from 'react';

interface RecentSalesProps {
  onAddToCart: (product: Product) => void;
}

const RecentSales: React.FC<RecentSalesProps> = ({ onAddToCart }) => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mock data for recent sales
    const mockRecentProducts: Product[] = [
      { 
        _id: '1', 
        name: 'Product 1', 
        price: 10.99, 
        description: 'Description 1', 
        images: [], 
        stock: 20, 
        sku: 'SKU001',
        category: 'category-1',
        hasVariants: false,
        active: true
      },
      { 
        _id: '2', 
        name: 'Product 2', 
        price: 15.99, 
        description: 'Description 2', 
        images: [], 
        stock: 15, 
        sku: 'SKU002',
        category: 'category-2',
        hasVariants: false,
        active: true
      },
      { 
        _id: '3', 
        name: 'Product 3', 
        price: 5.99, 
        description: 'Description 3', 
        images: [], 
        stock: 5, 
        sku: 'SKU003',
        category: 'category-1',
        hasVariants: false,
        active: true
      }
    ];

    setRecentProducts(mockRecentProducts);
    setIsLoading(false);
  }, []);

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
