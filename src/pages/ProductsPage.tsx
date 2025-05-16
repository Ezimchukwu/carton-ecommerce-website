
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📦', path: '/products' },
    { id: 'pizza-boxes', name: 'Pizza Boxes', icon: '🍕', path: '/categories/pizza-boxes' },
    { id: 'mailer-boxes', name: 'Mailer Boxes', icon: '🥡', path: '/categories/mailer-boxes' },
    { id: 'cargo-boxes', name: 'Cargo Boxes', icon: '📦', path: '/categories/cargo-boxes' },
    { id: 'wrapping-papers', name: 'Wrapping Papers', icon: '📜', path: '/categories/wrapping-papers' },
    { id: 'gift-bags', name: 'Gift Bags', icon: '🎁', path: '/categories/gift-bags' },
    { id: 'adhesives', name: 'Adhesives', icon: '🔗', path: '/categories/adhesives' }
  ];

  // Function to handle category selection and navigation
  const handleCategorySelect = (categoryId: string, path: string) => {
    setSelectedCategory(categoryId);
    navigate(path);
  };

  // Mock products data - replace with actual data from your backend
  const products = [
    {
      id: 1,
      name: "12\" Pizza Box",
      image: "/IMAGES/Pizza Box 1.jpeg",
      description: "High-quality pizza box for medium-sized pizzas",
      category: "pizza-boxes",
      price: 1999.99
    },
    {
      id: 2,
      name: "Large Pizza Box",
      image: "/IMAGES/Pizza Box 2.jpeg",
      description: "Sturdy pizza box for large pizzas",
      category: "pizza-boxes",
      price: 2499.99
    },
    {
      id: 3,
      name: "Premium Mailer Box",
      image: "/IMAGES/Mailer Box 1.jpeg",
      description: "Premium quality mailer box for e-commerce",
      category: "food-packs",
      price: 1499.99
    },
    {
      id: 4,
      name: "Standard Mailer Box",
      image: "/IMAGES/Mailer Box 2.jpeg",
      description: "Standard mailer box for shipping",
      category: "food-packs",
      price: 999.99
    },
    {
      id: 5,
      name: "Heavy Duty Cargo Box",
      image: "/IMAGES/Cargo Box 1.jpeg",
      description: "Heavy-duty cargo box for shipping",
      category: "cargo-boxes",
      price: 3499.99
    },
    {
      id: 6,
      name: "Premium Wrapping Paper",
      image: "/IMAGES/Wrapping Paper 1.jpeg",
      description: "High-quality wrapping paper for gifts",
      category: "wrapping-papers",
      price: 799.99
    },
    {
      id: 7,
      name: "Luxury Gift Bag",
      image: "/IMAGES/Gift Bag 1.jpeg",
      description: "Luxury gift bag for special occasions",
      category: "gift-bags",
      price: 599.99
    },
    {
      id: 8,
      name: "Premium Packaging Tape",
      image: "/IMAGES/Adhesive 1.jpeg",
      description: "Strong adhesive tape for secure packaging",
      category: "adhesives",
      price: 499.99
    }
  ];

  const handleAddToCart = (product: any) => {
    // Implement add to cart functionality
    console.log('Adding to cart:', product);
  };

  return (
    <Layout>
      <div className="py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-corporate-dark mb-2">Our Products</h1>
            <p className="text-gray-600">Find the perfect packaging solutions for your business needs.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Categories Sidebar */}
            <aside className="w-full md:w-64 space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="font-semibold mb-4">Categories</h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id, category.path)}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-corporate text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="flex-1">
              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isLoading={isLoading}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
