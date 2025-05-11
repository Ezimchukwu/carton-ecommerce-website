
import React from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/pos.types';

interface RecentSalesProps {
  onAddToCart: (product: Product) => void;
}

const RecentSales: React.FC<RecentSalesProps> = ({ onAddToCart }) => {
  // Mock recently sold products
  const recentProducts: Product[] = [
    {
      _id: 'recent1',
      name: 'Small Pizza Box (Bundle)',
      price: 29.99,
      description: 'Bundle of 25 small pizza boxes',
      images: [],
      stock: 15,
      sku: 'PZB-S-B001',
      category: 'Pizza Boxes',  // Add required properties
      hasVariants: false,       // Add required properties
      active: true              // Add required properties
    },
    {
      _id: 'recent2',
      name: 'Medium Moving Box (5-Pack)',
      price: 24.99,
      description: 'Set of 5 medium moving boxes',
      images: [],
      stock: 8,
      sku: 'MOV-M-P005',
      category: 'Moving Boxes',  // Add required properties
      hasVariants: false,        // Add required properties
      active: true               // Add required properties
    },
    {
      _id: 'recent3',
      name: 'Bubble Wrap Roll',
      price: 18.99,
      description: 'Protective bubble wrap, 24" x 50\'',
      images: [],
      stock: 10,
      sku: 'PCK-BW-007',
      category: 'Packing Materials',  // Add required properties
      hasVariants: false,             // Add required properties
      active: true                    // Add required properties
    },
  ];

  return (
    <div>
      <h3 className="font-medium mb-2">Recently Sold Items</h3>
      <div className="space-y-2">
        {recentProducts.map(product => (
          <div 
            key={product._id}
            className="p-3 bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <div className="flex justify-between">
              <div>
                <h4 className="font-medium text-sm">{product.name}</h4>
                <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onAddToCart(product)}
              >
                Add
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSales;
