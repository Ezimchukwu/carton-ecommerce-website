
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, FileText } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { toast } from 'sonner';

const WrappingPapersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{[key: number]: boolean}>({});

  // Mock products data specific to wrapping papers
  const products = [
    {
      id: 1,
      name: "Kraft Wrapping Paper Roll",
      image: "/IMAGES/product6.jpeg",
      description: "Natural kraft paper roll, perfect for eco-friendly packaging",
      category: "wrapping-papers",
      price: 1299.99
    },
    {
      id: 2,
      name: "White Wrapping Paper Roll",
      image: "/IMAGES/product10.jpeg",
      description: "Clean white wrapping paper for professional packaging",
      category: "wrapping-papers",
      price: 1399.99
    },
    {
      id: 3,
      name: "Decorative Wrapping Paper",
      image: "/IMAGES/product17.jpeg",
      description: "Stylish patterns for gift wrapping and special occasions",
      category: "wrapping-papers",
      price: 1699.99
    },
    {
      id: 4,
      name: "Tissue Paper Set",
      image: "/IMAGES/product19.jpeg",
      description: "Assorted tissue paper for gift bags and delicate items",
      category: "wrapping-papers",
      price: 999.99
    },
    {
      id: 5,
      name: "Food Grade Wrapping Paper",
      image: "/IMAGES/product22.jpeg",
      description: "Food-safe wrapping paper for direct food contact",
      category: "wrapping-papers",
      price: 1599.99
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
            <h1 className="text-3xl font-bold text-corporate-dark mb-2">Wrapping Papers</h1>
            <p className="text-gray-600">High-quality wrapping papers for gifts, food packaging, and general use.</p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search wrapping papers..."
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

export default WrappingPapersPage;
