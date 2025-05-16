
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Box } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { toast } from 'sonner';

const CargoBoxesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{[key: number]: boolean}>({});

  // Mock products data specific to cargo boxes
  const products = [
    {
      id: 1,
      name: "Small Cargo Box",
      image: "/IMAGES/product5.jpeg",
      description: "Small cargo box for light shipments and products",
      category: "cargo-boxes",
      price: 2499.99
    },
    {
      id: 2,
      name: "Medium Cargo Box",
      image: "/IMAGES/product20.jpeg",
      description: "Medium-sized cargo box for general shipping needs",
      category: "cargo-boxes",
      price: 3499.99
    },
    {
      id: 3,
      name: "Large Cargo Box",
      image: "/IMAGES/product24.jpeg",
      description: "Heavy-duty large cargo box for bulk shipments",
      category: "cargo-boxes",
      price: 4499.99
    },
    {
      id: 4,
      name: "Extra Large Cargo Box",
      image: "/IMAGES/product29.jpeg",
      description: "Industrial-grade cargo box for oversized items",
      category: "cargo-boxes",
      price: 5999.99
    },
    {
      id: 5,
      name: "Reinforced Cargo Box",
      image: "/IMAGES/product31.jpeg",
      description: "Extra reinforced cargo box for fragile or heavy items",
      category: "cargo-boxes",
      price: 6499.99
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
            <h1 className="text-3xl font-bold text-corporate-dark mb-2">Cargo Boxes</h1>
            <p className="text-gray-600">Heavy-duty cargo boxes for shipping, transportation, and storage.</p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search cargo boxes..."
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

export default CargoBoxesPage;
