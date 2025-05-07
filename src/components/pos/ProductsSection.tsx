
import React from 'react';
import ProductSearch from '@/components/pos/ProductSearch';
import ProductGrid from '@/components/pos/ProductGrid';
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
    <div className="w-2/3 flex flex-col overflow-hidden">
      <ProductSearch 
        onSearch={onSearch} 
        onCategoryChange={onCategoryChange}
        categories={categories || []}
      />
      <ProductGrid 
        products={products || []} 
        isLoading={isLoading} 
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

export default ProductsSection;
