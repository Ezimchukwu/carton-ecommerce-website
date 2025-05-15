import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  Minus, 
  Plus, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  RotateCcw, 
  Shield, 
  Info, 
  ChevronRight,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from '@/components/ui/use-toast';
import { useCart } from '@/context/CartContext';

interface ProductDetailProps {
  product?: {
    id: number;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    description: string;
    features: string[];
    specifications: { [key: string]: string };
    images: string[];
    category: string;
    categoryName: string;
    stock: number;
    isNew?: boolean;
    isBestseller?: boolean;
    customizable: boolean;
    minQuantity: number;
    maxQuantity: number;
    estimatedDelivery: string;
    rating: {
      average: number;
      count: number;
    };
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product: propProduct }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  // In a real application, this would fetch the product data from an API
  // For this demo, we'll use either the prop or a mock product
  const product = propProduct || {
    id: 1,
    name: "12\" Premium Pizza Box",
    slug: "12-inch-premium-pizza-box",
    price: 12.99,
    originalPrice: 15.99,
    description: "Our premium pizza boxes are designed to keep your pizzas hot and fresh during delivery. Made from high-quality kraft material, these boxes offer excellent durability and insulation properties. The 12\" size is perfect for medium pizzas, ensuring they arrive to your customers in perfect condition.",
    features: [
      "Food-safe kraft material",
      "Excellent heat retention",
      "Grease-resistant design",
      "Sturdy construction prevents crushing",
      "Environmentally friendly and recyclable",
      "Customizable with your branding"
    ],
    specifications: {
      "Dimensions": "12\" x 12\" x 2\"",
      "Material": "B-flute corrugated kraft",
      "Weight": "150 GSM",
      "Package Quantity": "50 boxes per bundle",
      "Storage": "Store in cool, dry place",
      "Recyclable": "Yes",
      "Assembly": "Quick-fold design, no adhesive needed"
    },
    images: [
      "/IMAGES/product1.jpeg",
      "/IMAGES/product2.jpeg",
      "/IMAGES/product3.jpeg"
    ],
    category: "pizza-boxes",
    categoryName: "Pizza Boxes",
    stock: 500,
    isNew: false,
    isBestseller: true,
    customizable: true,
    minQuantity: 10,
    maxQuantity: 1000,
    estimatedDelivery: "3-5 business days",
    rating: {
      average: 4.8,
      count: 124
    }
  };

  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(product.minQuantity);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleIncreaseQuantity = () => {
    if (quantity < product.maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > product.minQuantity) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      // Add item to cart using context
      addItem({
        id: Number(product.id),
        name: product.name,
        price: product.price,
        image: product.images[mainImage] || '/placeholder.svg',
        quantity: quantity
      });

      toast.success("Added to Cart!", {
        description: `${quantity} x ${product.name} added to your cart.`
      });

      // Wait for the toast to be visible before navigating
      setTimeout(() => {
        setIsAddingToCart(false);
        navigate('/checkout');
      }, 1500);
    } catch (error) {
      toast.error("Error", {
        description: "Failed to add item to cart. Please try again."
      });
      setIsAddingToCart(false);
    }
  };

  const handleAddToWishlist = () => {
    toast.success("Added to wishlist!", {
      description: `${product.name} has been added to your wishlist.`
    });
  };

  return (
    <div className="py-8">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center text-sm">
          <Link to="/" className="text-gray-500 hover:text-corporate">
            Home
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <Link to="/products" className="text-gray-500 hover:text-corporate">
            Products
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <Link to={`/category/${product.category}`} className="text-gray-500 hover:text-corporate">
            {product.categoryName}
          </Link>
          <ChevronRight size={16} className="mx-2 text-gray-400" />
          <span className="text-gray-700 font-medium">{product.name}</span>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 aspect-square">
              <img 
                src={product.images[mainImage]} 
                alt={product.name} 
                className="w-full h-full object-contain p-8"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-4">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setMainImage(index)}
                    className={`bg-white rounded-md overflow-hidden border-2 ${
                      index === mainImage ? 'border-corporate' : 'border-transparent'
                    } w-20 h-20 flex items-center justify-center transition-all`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`} 
                      className="max-w-full max-h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <div className="flex items-center mb-2">
              <Badge className={product.isBestseller ? 'bg-amber-500' : 'bg-corporate'}>
                {product.isBestseller ? 'Bestseller' : product.isNew ? 'New' : 'Popular'}
              </Badge>
              <span className="ml-3 text-sm text-gray-500">SKU: P{product.id.toString().padStart(4, '0')}</span>
            </div>
            
            <h1 className="text-3xl font-semibold text-corporate-dark mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="mr-2 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating.average) 
                        ? 'text-amber-400' 
                        : i < product.rating.average 
                        ? 'text-amber-400/50' 
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating.average.toFixed(1)} ({product.rating.count} reviews)
              </span>
            </div>
            
            <div className="mb-6 flex items-baseline">
              <span className="text-2xl font-bold text-corporate">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= product.minQuantity}
                  className="h-10 w-10"
                >
                  <Minus size={16} />
                </Button>
                <div className="w-16 mx-2">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.min(Math.max(parseInt(e.target.value) || product.minQuantity, product.minQuantity), product.maxQuantity))}
                    className="w-full text-center h-10 rounded-md border border-input bg-background"
                    min={product.minQuantity}
                    max={product.maxQuantity}
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleIncreaseQuantity}
                  disabled={quantity >= product.maxQuantity}
                  className="h-10 w-10"
                >
                  <Plus size={16} />
                </Button>
                
                <div className="ml-4 text-sm text-gray-500">
                  <span>{product.stock} in stock</span>
                  <div className="text-xs">Min: {product.minQuantity} | Max: {product.maxQuantity}</div>
                </div>
              </div>
            </div>
            
            {product.customizable && (
              <div className="mb-6 p-4 bg-kraft-light/60 rounded-lg">
                <h3 className="font-semibold flex items-center text-corporate-dark">
                  <FileText size={18} className="mr-2" /> Customization Available
                </h3>
                <p className="text-sm text-gray-700 mt-1">
                  This product can be customized with your logo or design. 
                  <Link to="/custom-printing" className="text-corporate font-medium ml-1">
                    Learn more about custom printing options.
                  </Link>
                </p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button 
                onClick={handleAddToCart} 
                className="bg-corporate hover:bg-corporate-dark text-white flex-1"
                disabled={isAddingToCart}
              >
                <ShoppingCart size={18} className="mr-2" />
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </Button>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <Share2 size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share Product</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {/* Product Highlights */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-sm">
                <Truck size={16} className="mr-2 text-corporate" />
                <span>Estimated delivery: {product.estimatedDelivery}</span>
              </div>
              <div className="flex items-center text-sm">
                <RotateCcw size={16} className="mr-2 text-corporate" />
                <span>Free returns within 30 days</span>
              </div>
              <div className="flex items-center text-sm">
                <Shield size={16} className="mr-2 text-corporate" />
                <span>Quality Guarantee</span>
              </div>
              <div className="flex items-center text-sm">
                <Info size={16} className="mr-2 text-corporate" />
                <span>Bulk discounts available</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="mb-6 border-b w-full justify-start rounded-none bg-transparent">
              <TabsTrigger 
                value="details"
                className="data-[state=active]:border-corporate data-[state=active]:text-corporate border-b-2 border-transparent rounded-none"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="specifications"
                className="data-[state=active]:border-corporate data-[state=active]:text-corporate border-b-2 border-transparent rounded-none"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="data-[state=active]:border-corporate data-[state=active]:text-corporate border-b-2 border-transparent rounded-none"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-corporate-dark">Product Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-kraft-dark"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="pt-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-corporate-dark">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div key={index} className="flex">
                      <div className="font-medium text-corporate-dark w-40">{key}</div>
                      <div className="text-gray-700">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-corporate-dark">Customer Reviews</h3>
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <div className="text-4xl font-bold text-corporate-dark">{product.rating.average.toFixed(1)}</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating.average) 
                              ? 'text-amber-400' 
                              : i < product.rating.average 
                              ? 'text-amber-400/50' 
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">Based on {product.rating.count} reviews</div>
                  </div>
                  <div className="flex-1">
                    {/* Rating distribution bars would go here in a real implementation */}
                    <div className="text-sm text-gray-500">
                      Rating details not available in this demo
                    </div>
                  </div>
                </div>
                
                {/* Sample reviews would go here in a real implementation */}
                <p className="text-gray-700">
                  Customer reviews are not available in this demo. In a real implementation, 
                  this section would display actual customer reviews and ratings.
                </p>
                
                <div className="mt-6">
                  <Button className="bg-corporate hover:bg-corporate-dark text-white">
                    Write a Review
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
