
import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
}

interface ProductGridProps {
  products: Product[];
  loadingStates: { [key: number]: boolean };
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loadingStates, onAddToCart }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          isLoading={loadingStates[product.id] || false}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
