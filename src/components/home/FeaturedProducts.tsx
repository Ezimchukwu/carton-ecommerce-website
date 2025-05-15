import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';

interface ProductProps {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const ProductCard: React.FC<ProductProps> = ({ 
  id, 
  name, 
  slug, 
  image, 
  price, 
  originalPrice, 
  category,
  isNew,
  isBestseller
}) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation from Link
    setIsAddingToCart(true);
    
    try {
      // Add item to cart using context
      addItem({
        id,
        name,
        price,
        image,
        quantity: 1
      });

      toast.success("Added to cart!", {
        description: `${name} has been added to your cart.`
      });

      // Wait for the toast to be visible before navigating
      setTimeout(() => {
        setIsAddingToCart(false);
        navigate('/checkout');
      }, 1500);
    } catch (error) {
      toast.error("Error", {
        description: "Failed to add item to cart"
      });
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-contain object-center p-4 bg-gray-50 group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-corporate text-white">New</Badge>
          )}
          {isBestseller && (
            <Badge className="bg-amber-500 text-white">Bestseller</Badge>
          )}
          {originalPrice && (
            <Badge className="bg-red-500 text-white">
              {Math.round((1 - price/originalPrice) * 100)}% Off
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/category/${category}`} className="text-xs text-gray-500 hover:text-corporate">
          {category}
        </Link>
        <Link to={`/product/${slug}`}>
          <h3 className="text-lg font-medium text-corporate-dark mt-1 hover:text-corporate transition-colors">
            {name}
          </h3>
        </Link>
        
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold">₦{price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">₦{originalPrice.toFixed(2)}</span>
          )}
        </div>
        
        <div className="mt-3 flex gap-2">
          <Button 
            className="flex-1 bg-corporate hover:bg-corporate-dark text-white"
            size="sm"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCart size={16} className="mr-1" />
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "12\" Premium Pizza Box",
      slug: "12-inch-premium-pizza-box",
      image: "/IMAGES/product1.jpeg",
      price: 12.99,
      originalPrice: 15.99,
      category: "pizza-boxes",
      isNew: false,
      isBestseller: true
    },
    {
      id: 2,
      name: "Kraft Mailer Box - Medium",
      slug: "kraft-mailer-box-medium",
      image: "/IMAGES/product2.jpeg",
      price: 8.99,
      category: "specialty-boxes",
      isNew: true,
      isBestseller: false
    },
    {
      id: 3,
      name: "Premium Gift Bag Set (5 pcs)",
      slug: "premium-gift-bag-set",
      image: "/IMAGES/product3.jpeg",
      price: 19.99,
      originalPrice: 24.99,
      category: "gift-packaging",
      isNew: false,
      isBestseller: true
    },
    {
      id: 4,
      name: "Burger Box - Kraft (50 pcs)",
      slug: "burger-box-kraft",
      image: "/IMAGES/product4.jpeg",
      price: 29.99,
      category: "food-packaging",
      isNew: false,
      isBestseller: false
    },
  ];

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="section-title mb-0">Popular Products</h2>
          <Link 
            to="/products" 
            className="text-corporate hover:text-corporate-dark flex items-center transition-colors"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug}
              image={product.image}
              price={product.price}
              originalPrice={product.originalPrice}
              category={product.category}
              isNew={product.isNew}
              isBestseller={product.isBestseller}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
