
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from '@/hooks/use-toast'; 
import { useCart } from '@/hooks/useCart';

interface Product {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
}

const FeaturedProducts: React.FC = () => {
  const { addItem } = useCart();

  const products: Product[] = [
    {
      id: 1,
      name: '12" Premium Pizza Box',
      slug: '12-inch-premium-pizza-box',
      imageUrl: '/IMAGES/product1.jpeg',
      price: 12.99,
    },
    {
      id: 2,
      name: 'Mailer Box - Small',
      slug: 'mailer-box-small',
      imageUrl: '/IMAGES/product2.jpeg',
      price: 7.49,
    },
    {
      id: 3,
      name: 'Custom Printed Tape',
      slug: 'custom-printed-tape',
      imageUrl: '/IMAGES/product3.jpeg',
      price: 15.00,
    },
    {
      id: 4,
      name: 'Kraft Gift Bag',
      slug: 'kraft-gift-bag',
      imageUrl: '/IMAGES/product4.jpeg',
      price: 4.99,
    },
  ];

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      quantity: 1,
    });
    toast(`Added to cart`, {
      description: `${product.name} added to your cart.`,
    });
  };

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8 text-corporate-dark">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="bg-white shadow-md rounded-md overflow-hidden">
              <Link to={`/product/${product.slug}`}>
                <CardContent className="p-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <h3 className="text-lg font-semibold text-corporate-dark truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </CardContent>
              </Link>
              <CardFooter className="p-4 flex justify-between items-center bg-gray-50">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="bg-corporate hover:bg-corporate-dark text-white rounded-md"
                >
                  Add to Cart
                  <ShoppingCart className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
