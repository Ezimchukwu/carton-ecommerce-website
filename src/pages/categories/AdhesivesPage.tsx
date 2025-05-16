
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { toast } from 'sonner';

const AdhesivesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{[key: number]: boolean}>({});

  // Mock products data specific to adhesives
  const products = [
    {
      id: 1,
      name: "Packing Tape",
      image: "/IMAGES/product11.jpeg",
      description: "Heavy-duty clear packing tape for sealing boxes",
      category: "adhesives",
      price: 499.99
    },
    {
      id: 2,
      name: "Double-Sided Tape",
      image: "/IMAGES/product18.jpeg",
      description: "Strong double-sided adhesive tape for mounting",
      category: "adhesives",
      price: 699.99
    },
    {
      id: 3,
      name: "Kraft Paper Tape",
      image: "/IMAGES/product25.jpeg",
      description: "Eco-friendly kraft paper tape for packaging",
      category: "adhesives",
      price: 899.99
    },
    {
      id: 4,
      name: "Packaging Glue",
      image: "/IMAGES/product30.jpeg",
      description: "Industrial-strength packaging glue for box assembly",
      category: "adhesives",
      price: 1299.99
    },
    {
      id: 5,
      name: "Tape Dispenser",
      image: "/IMAGES/product32.jpeg",
      description: "Heavy-duty tape dispenser for efficient packaging",
      category: "adhesives",
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
            <h1 className="text-3xl font-bold text-corporate-dark mb-2">Adhesives & Accessories</h1>
            <p className="text-gray-600">Complete range of glues, tapes, and packaging accessories.</p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search adhesives..."
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

export default AdhesivesPage;
