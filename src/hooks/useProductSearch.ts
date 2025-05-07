
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export const useProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // Fetch products
  const { 
    data: products, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['products', searchQuery, categoryFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (categoryFilter) params.append('category', categoryFilter);
      
      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      return data.products;
    }
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
    }
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  return {
    products,
    categories,
    isLoading,
    error,
    searchQuery,
    categoryFilter,
    handleSearch,
    handleCategoryChange
  };
};
