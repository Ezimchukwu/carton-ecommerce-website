
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { toast } from 'sonner';

const PizzaBoxesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{[key: number]: boolean}>({});

  // Mock products data specific to pizza boxes
  const products = [
    {
      id: 1,
      name: "6\" Pizza Box",
      image: "/IMAGES/Pizza Box 1.jpeg",
      description: "Small pizza box for personal size pizzas",
      category: "pizza-boxes",
      price: 999.99
    },
    {
      id: 2,
      name: "8\" Pizza Box",
      image: "/IMAGES/product8.jpeg",
      description: "Medium pizza box suitable for small pizzas",
      category: "pizza-boxes",
      price: 1299.99
    },
    {
      id: 3,
      name: "10\" Pizza Box",
      image: "/IMAGES/product2.jpeg",
      description: "Standard size pizza box for medium pizzas",
      category: "pizza-boxes",
      price: 1499.99
    },
    {
      id: 4,
      name: "12\" Pizza Box",
      image: "/IMAGES/product14.jpeg",
      description: "Large pizza box for family size pizzas",
      category: "pizza-boxes",
      price: 1799.99
    },
    {
      id: 5,
      name: "14\" Pizza Box",
      image: "/IMAGES/product26.jpeg",
      description: "Extra large pizza box for party size pizzas",
      category: "pizza-boxes",
      price: 1999.99
    },
    {
      id: 6,
      name: "16\" Pizza Box",
      image: "/IMAGES/product27.jpeg",
      description: "Jumbo pizza box for extra large pizzas",
      category: "pizza-boxes",
      price: 2299.99
    }
  ];

  const handleAddToCart = (product: any) => {
    const newLoadingStates = { ...loadingStates, [product.id]: true };
    setLoadingStates(newLoadingStates);
    
    // Simulate adding to cart
    setTimeout(() => {
      setLoadingStates({ ...newLoadingStates, [product.id]: false });
      toast("Added to cart", {
        description: `${product.name} has been added to your cart`
      });
    }, 600);
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-corporate-dark mb-2">Pizza Boxes</h1>
            <p className="text-gray-600">High-quality pizza boxes available in various sizes from 6" to 16".</p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search pizza boxes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-8">
            <ProductCard key={products[0].id} product={products[0]} isLoading={loadingStates[products[0].id] || false} onAddToCart={handleAddToCart} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
              {products.slice(1).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isLoading={loadingStates[product.id] || false}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PizzaBoxesPage;
