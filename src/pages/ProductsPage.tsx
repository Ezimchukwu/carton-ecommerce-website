
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import SearchFilterBar from '@/components/products/SearchFilterBar';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();

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

  // Updated products data with actual carton images
  const products = [
    {
      id: 1,
      name: "Small Pizza Box",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product1.jpeg",
      description: "High-quality small pizza box perfect for personal pizzas",
      category: "pizza-boxes",
      price: 850.00
    },
    {
      id: 2,
      name: "Medium Pizza Box",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product2.jpeg",
      description: "Durable medium pizza box for standard pizzas",
      category: "pizza-boxes",
      price: 1200.00
    },
    {
      id: 3,
      name: "Large Pizza Box",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product3.jpeg",
      description: "Extra large pizza box for family-sized pizzas",
      category: "pizza-boxes",
      price: 1500.00
    },
    {
      id: 4,
      name: "Premium Mailer Box",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product4.jpeg",
      description: "Premium quality mailer box for e-commerce shipping",
      category: "mailer-boxes",
      price: 950.00
    },
    {
      id: 5,
      name: "Standard Mailer Box",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product5.jpeg",
      description: "Cost-effective mailer box for regular shipping needs",
      category: "mailer-boxes",
      price: 750.00
    },
    {
      id: 6,
      name: "Heavy Duty Cargo Box",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product6.jpeg",
      description: "Industrial strength cargo box for heavy items",
      category: "cargo-boxes",
      price: 2200.00
    },
    {
      id: 7,
      name: "Medium Cargo Box",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product7.jpeg",
      description: "Versatile cargo box for general shipping",
      category: "cargo-boxes",
      price: 1800.00
    },
    {
      id: 8,
      name: "Premium Wrapping Paper",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product8.jpeg",
      description: "High-quality wrapping paper for gift packaging",
      category: "wrapping-papers",
      price: 450.00
    },
    {
      id: 9,
      name: "Kraft Wrapping Paper",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product9.jpeg",
      description: "Eco-friendly kraft paper for sustainable packaging",
      category: "wrapping-papers",
      price: 380.00
    },
    {
      id: 10,
      name: "Luxury Gift Bag",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product10.jpeg",
      description: "Elegant gift bag for special occasions",
      category: "gift-bags",
      price: 650.00
    },
    {
      id: 11,
      name: "Paper Gift Bag Set",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product11.jpeg",
      description: "Set of decorative paper gift bags",
      category: "gift-bags",
      price: 580.00
    },
    {
      id: 12,
      name: "Packaging Tape Roll",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product12.jpeg",
      description: "Strong adhesive tape for secure packaging",
      category: "adhesives",
      price: 320.00
    },
    {
      id: 13,
      name: "Double-Sided Tape",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product13.jpeg",
      description: "High-quality double-sided mounting tape",
      category: "adhesives",
      price: 420.00
    },
    {
      id: 14,
      name: "Wholesale Pizza Box Bundle",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/Wholsale 1.jpeg",
      description: "Bulk pizza boxes for restaurants and catering",
      category: "pizza-boxes",
      price: 3500.00
    },
    {
      id: 15,
      name: "Wholesale Mailer Bundle",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/Wholsale 2.jpeg",
      description: "Bulk mailer boxes for e-commerce businesses",
      category: "mailer-boxes",
      price: 2800.00
    },
    {
      id: 16,
      name: "Industrial Cargo Bundle",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/Wholsale 3.jpeg",
      description: "Heavy-duty cargo boxes in bulk quantities",
      category: "cargo-boxes",
      price: 4200.00
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
    if (!isAuthenticated) {
      toast.error("Please log in to add items to cart", {
        description: "You need to be logged in to purchase products."
      });
      return;
    }

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
      <div className="py-4 sm:py-8">
        <div className="container px-4 sm:px-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-corporate-dark mb-2">Our Products</h1>
            <p className="text-sm sm:text-base text-gray-600">Find the perfect packaging solutions for your business needs.</p>
            {!isAuthenticated && (
              <div className="mt-4 p-3 sm:p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm sm:text-base text-amber-800">
                  <span className="font-medium">Please log in to purchase products.</span> You need to be registered and logged in to add items to your cart and complete purchases.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Categories Sidebar */}
            <aside className="w-full lg:w-64 space-y-4">
              <div className="bg-white rounded-lg shadow p-3 sm:p-4">
                <h2 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Categories</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id, category.path)}
                      className={`w-full text-left px-3 sm:px-4 py-2 rounded-md transition-colors text-sm sm:text-base ${
                        selectedCategory === category.id
                          ? 'bg-corporate text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      <span className="hidden sm:inline lg:inline">{category.name}</span>
                      <span className="sm:hidden lg:hidden text-xs">{category.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="flex-1">
              {/* Search Bar */}
              <div className="mb-6">
                <SearchFilterBar 
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>

              {/* Products Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((skeleton) => (
                    <div 
                      key={skeleton}
                      className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
                    >
                      <div className="h-40 sm:h-48 bg-gray-200"></div>
                      <div className="p-3 sm:p-4 space-y-3">
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
                <div className="text-center py-8 sm:py-12">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
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
