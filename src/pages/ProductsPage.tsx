import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({});
  const { addItem } = useCart();
  const navigate = useNavigate();

  // Helper function to check if wholesale number exists
  const existingWholesaleNumbers = [1, 2, 3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  // Product data with all available images and prices
  const products = [
    // Product series 1-34
    ...[...Array(34)].map((_, index) => {
      const productNumber = index + 1;
      const imagePath = productNumber === 9 
        ? '/IMAGES/product9.jpeg'
        : `/IMAGES/product${productNumber}.jpeg`;
      
      return {
        id: productNumber,
        name: `Product ${productNumber}`,
        image: imagePath,
        description: "Quality carton packaging solution",
        category: "General",
        price: 1000 + (productNumber * 100) // Example price calculation
      };
    }),
    // Wholesale series (only existing numbers)
    ...existingWholesaleNumbers.map((num, index) => ({
      id: 35 + index,
      name: `Wholesale ${num}`,
      image: `/IMAGES/Wholsale ${num}.jpeg`,
      description: "Bulk packaging solution",
      category: "Wholesale",
      price: 2500 + (num * 200) // Higher price for wholesale items
    })),
    // Additional products with their prices
    {
      id: 51,
      name: "Premium Storage Box",
      image: "/IMAGES/Wholsale 5.jpeg",
      description: "Premium quality storage solution",
      category: "Storage",
      price: 3500
    },
    {
      id: 52,
      name: "Industrial Shipping Box",
      image: "/IMAGES/Wholsale 6.jpeg",
      description: "Heavy-duty shipping container",
      category: "Industrial",
      price: 4000
    },
    {
      id: 53,
      name: "Retail Display Box",
      image: "/IMAGES/Wholsale 8.jpeg",
      description: "Attractive retail display solution",
      category: "Retail",
      price: 2000
    },
    {
      id: 54,
      name: "Custom Gift Box",
      image: "/IMAGES/Wholsale 9.jpeg",
      description: "Elegant custom gift packaging",
      category: "Specialty",
      price: 3000
    },
    {
      id: 55,
      name: "Eco-Friendly Box",
      image: "/IMAGES/Wholsale 10.jpeg",
      description: "Sustainable packaging solution",
      category: "Eco-Friendly",
      price: 2500
    },
    {
      id: 56,
      name: "Deluxe Packaging",
      image: "/IMAGES/Wholsale 11.jpeg",
      description: "Premium deluxe packaging option",
      category: "Premium",
      price: 5000
    }
  ].filter(product => {
    try {
      const img = new Image();
      img.src = product.image;
      return true;
    } catch {
      return false;
    }
  });

  const handleAddToCart = async (product: any) => {
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

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="py-8">
        <div className="container">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-corporate-dark mb-3">
              Our Products
            </h1>
            <p className="text-lg text-gray-600">
              Discover our wide range of carton packaging solutions for every need
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={20} />
              Filter
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="text-sm font-semibold mb-1 truncate">{product.name}</h3>
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-corporate">{product.category}</span>
                      <span className="font-semibold text-sm">₦{product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs flex-1"
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        className="text-xs flex-1"
                        onClick={() => handleAddToCart(product)}
                        disabled={loadingStates[product.id]}
                      >
                        {loadingStates[product.id] ? (
                          'Adding...'
                        ) : (
                          <>
                            <ShoppingCart size={14} className="mr-1" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage; 