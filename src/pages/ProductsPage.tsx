
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import SearchFilterBar from '@/components/products/SearchFilterBar';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  const { addItem } = useCart();

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

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filtered = [...products];
      
      // Filter by category
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      
      // Filter by search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }
      
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 300);
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
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
              <SearchFilterBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              {/* Products Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((skeleton) => (
                    <div 
                      key={skeleton}
                      className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
                    >
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="flex justify-between items-center pt-2">
                          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isLoading={false}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
