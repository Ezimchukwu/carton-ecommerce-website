
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { toast } from 'sonner';

const MailerBoxesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{[key: number]: boolean}>({});

  // Mock products data specific to mailer boxes
  const products = [
    {
      id: 1,
      name: "Small Mailer Box",
      image: "/IMAGES/product12.jpeg",
      description: "Small mailer box perfect for jewelry, accessories, or small electronics",
      category: "mailer-boxes",
      price: 1499.99
    },
    {
      id: 2,
      name: "Medium Mailer Box",
      image: "/IMAGES/product3.jpeg",
      description: "Medium-sized mailer box for clothing, books, or medium items",
      category: "mailer-boxes",
      price: 1899.99
    },
    {
      id: 3,
      name: "Large Mailer Box",
      image: "/IMAGES/product15.jpeg",
      description: "Large mailer box for multiple items or bulky products",
      category: "mailer-boxes",
      price: 2299.99
    },
    {
      id: 4,
      name: "Premium Mailer Box",
      image: "/IMAGES/product16.jpeg",
      description: "Sturdy premium mailer box with custom branding options",
      category: "mailer-boxes",
      price: 2699.99
    },
    {
      id: 5,
      name: "Eco-Friendly Mailer Box",
      image: "/IMAGES/product23.jpeg",
      description: "Environmentally friendly mailer box made from recycled materials",
      category: "mailer-boxes",
      price: 2499.99
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
            <h1 className="text-3xl font-bold text-corporate-dark mb-2">Mailer Boxes</h1>
            <p className="text-gray-600">Custom mailer boxes, gable boxes, and e-commerce packaging solutions.</p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search mailer boxes..."
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

export default MailerBoxesPage;
