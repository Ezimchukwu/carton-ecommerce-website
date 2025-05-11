
import { useState, useEffect } from 'react';
import { Product } from '@/types/pos.types';

// Mock products data with complete Product type
const mockProducts: Product[] = [
  { _id: '1', name: 'Small Pizza Box', price: 10.99, description: 'Standard small pizza box for 8-10" pizzas', images: ['product1.jpeg'], stock: 20, sku: 'PZB-S-001', category: 'Pizza Boxes', hasVariants: false, active: true },
  { _id: '2', name: 'Medium Pizza Box', price: 15.99, description: 'Medium pizza box for 12-14" pizzas', images: ['product2.jpeg'], stock: 15, sku: 'PZB-M-002', category: 'Pizza Boxes', hasVariants: false, active: true },
  { _id: '3', name: 'Large Moving Box', price: 5.99, description: 'Heavy-duty moving box for household items', images: ['product3.jpeg'], stock: 5, sku: 'MOV-L-003', category: 'Moving Boxes', hasVariants: false, active: true },
  { _id: '4', name: 'Small Shipping Box', price: 20.99, description: 'Compact shipping box for small items', images: ['product4.jpeg'], stock: 0, sku: 'SHP-S-004', category: 'Shipping Boxes', hasVariants: false, active: true },
  { _id: '5', name: 'Gift Box Set', price: 8.99, description: 'Set of 3 decorative gift boxes', images: ['product5.jpeg'], stock: 25, sku: 'GFT-SET-005', category: 'Gift Packaging', hasVariants: false, active: true },
  { _id: '6', name: 'Kraft Paper Roll', price: 12.99, description: 'Eco-friendly kraft paper roll, 30" wide', images: ['product6.jpeg'], stock: 12, sku: 'WRP-K-006', category: 'Wrapping Paper', hasVariants: false, active: true },
  { _id: '7', name: 'Bubble Wrap Roll', price: 18.99, description: 'Protective bubble wrap, 24" x 50\'', images: ['product7.jpeg'], stock: 8, sku: 'PCK-BW-007', category: 'Packing Materials', hasVariants: false, active: true },
  { _id: '8', name: 'Carton Sealing Tape', price: 4.99, description: 'Clear packaging tape, set of 3 rolls', images: ['product8.jpeg'], stock: 30, sku: 'PCK-TP-008', category: 'Packing Materials', hasVariants: false, active: true }
];

// Mock categories data
const mockCategories = [
  { _id: '1', name: 'Pizza Boxes', slug: 'pizza-boxes' },
  { _id: '2', name: 'Moving Boxes', slug: 'moving-boxes' },
  { _id: '3', name: 'Shipping Boxes', slug: 'shipping-boxes' },
  { _id: '4', name: 'Gift Packaging', slug: 'gift-packaging' },
  { _id: '5', name: 'Wrapping Paper', slug: 'wrapping-paper' },
  { _id: '6', name: 'Packing Materials', slug: 'packing-materials' }
];

export const useProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Filter products based on search query and category
    let filteredProducts = [...mockProducts];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        (product.sku?.toLowerCase() || '').includes(query)
      );
    }
    
    if (categoryFilter) {
      // Fixed category filter comparison
      filteredProducts = filteredProducts.filter(product => 
        typeof product.category === 'string' 
          ? product.category === categoryFilter
          : product.category._id === categoryFilter
      );
    }
    
    setProducts(filteredProducts);
  }, [searchQuery, categoryFilter]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  return {
    products,
    categories: mockCategories,
    isLoading,
    error,
    searchQuery,
    categoryFilter,
    handleSearch,
    handleCategoryChange
  };
};
