import { useState, useEffect } from 'react';
import { Product } from '@/types/pos.types';

// Mock products data with complete Product type
const mockProducts: Product[] = [
  { _id: '1', name: 'Product 1', price: 10.99, description: 'Description 1', images: [], stock: 20, sku: 'SKU001', category: 'category-1', hasVariants: false, active: true },
  { _id: '2', name: 'Product 2', price: 15.99, description: 'Description 2', images: [], stock: 15, sku: 'SKU002', category: 'category-2', hasVariants: false, active: true },
  { _id: '3', name: 'Product 3', price: 5.99, description: 'Description 3', images: [], stock: 5, sku: 'SKU003', category: 'category-3', hasVariants: false, active: true },
  { _id: '4', name: 'Product 4', price: 20.99, description: 'Description 4', images: [], stock: 0, sku: 'SKU004', category: 'category-1', hasVariants: false, active: true },
  { _id: '5', name: 'Product 5', price: 8.99, description: 'Description 5', images: [], stock: 25, sku: 'SKU005', category: 'category-2', hasVariants: false, active: true }
];

// Mock categories data
const mockCategories = [
  { _id: '1', name: 'Category 1', slug: 'category-1' },
  { _id: '2', name: 'Category 2', slug: 'category-2' },
  { _id: '3', name: 'Category 3', slug: 'category-3' }
];

export const useProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [products, setProducts] = useState(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Filter products based on search query and category
    let filteredProducts = [...mockProducts];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query)
      );
    }
    
    if (categoryFilter) {
      // Mock category filtering - in a real app this would use actual category IDs
      // Here we're just filtering every other product when a category is selected
      filteredProducts = filteredProducts.filter((product, index) => 
        categoryFilter === '1' ? index % 2 === 0 : index % 2 === 1
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
