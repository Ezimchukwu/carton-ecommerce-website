
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Package } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { toast } from 'sonner';

const GiftBagsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{[key: number]: boolean}>({});

  // Mock products data specific to gift bags
  const products = [
    {
      id: 1,
      name: "Small Paper Gift Bag",
      image: "/IMAGES/product7.jpeg",
      description: "Small elegant gift bags for jewelry and small presents",
      category: "gift-bags",
      price: 699.99
    },
    {
      id: 2,
      name: "Medium Gift Bag",
      image: "/IMAGES/product9.jpeg",
      description: "Medium-sized gift bags with ribbon handles",
      category: "gift-bags",
      price: 899.99
    },
    {
      id: 3,
      name: "Large Gift Bag",
      image: "/IMAGES/product16.jpeg",
      description: "Spacious gift bags for larger presents",
      category: "gift-bags",
      price: 1199.99
    },
    {
      id: 4,
      name: "Luxury Gift Bag Set",
      image: "/IMAGES/product21.jpeg",
      description: "Premium gift bags with gold foil accents, set of 5",
      category: "gift-bags",
      price: 2499.99
    },
    {
      id: 5,
      name: "Wedding Gift Bags",
      image: "/IMAGES/product28.jpeg",
      description: "Elegant white gift bags perfect for weddings and formal events",
      category: "gift-bags",
      price: 1499.99
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
            <h1 className="text-3xl font-bold text-corporate-dark mb-2">Gift Bags</h1>
            <p className="text-gray-600">High-end quality gift bags and fancy packaging solutions.</p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search gift bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
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
    </Layout>
  );
};

export default GiftBagsPage;
