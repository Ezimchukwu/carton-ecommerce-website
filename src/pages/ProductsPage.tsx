
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

// Import our new components
import ProductsHeader from '@/components/products/ProductsHeader';
import SearchFilterBar from '@/components/products/SearchFilterBar';
import ProductGrid from '@/components/products/ProductGrid';
import { getProducts, Product } from '@/components/products/ProductData';

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  const products = getProducts();

  const handleAddToCart = async (product: Product) => {
    setLoadingStates(prev => ({ ...prev, [product.id]: true }));
    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
      toast.success('Product added to cart!');
      navigate('/checkout');
    } catch (error) {
      toast.error('Failed to add product to cart');
    } finally {
      setLoadingStates(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="py-8">
        <div className="container">
          <ProductsHeader />
          <SearchFilterBar 
            searchQuery={searchQuery} 
            onSearchChange={handleSearchChange} 
          />
          <ProductGrid 
            products={filteredProducts} 
            loadingStates={loadingStates}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
