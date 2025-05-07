
import React from 'react';
import ProductSearch from '@/components/pos/ProductSearch';
import ProductGrid from '@/components/pos/ProductGrid';
import RecentSales from '@/components/pos/RecentSales';
import { Product } from '@/types/pos.types';

interface ProductsSectionProps {
  products: Product[];
  isLoading: boolean;
  categories: Array<{ _id: string; name: string; slug: string }>;
  onAddToCart: (product: Product) => void;
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  isLoading,
  categories,
  onAddToCart,
  onSearch,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-col overflow-hidden h-full">
      <ProductSearch 
        onSearch={onSearch} 
        onCategoryChange={onCategoryChange}
        categories={categories || []}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main product grid */}
        <div className="flex-1 overflow-hidden">
          <ProductGrid 
            products={products || []} 
            isLoading={isLoading} 
            onAddToCart={onAddToCart}
          />
        </div>
        
        {/* Side panel with recent sales */}
        <div className="w-64 border-l border-gray-200 p-4 overflow-y-auto">
          <RecentSales onAddToCart={onAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
