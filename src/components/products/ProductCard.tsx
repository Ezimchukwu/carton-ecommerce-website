
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  isLoading: boolean;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isLoading, onAddToCart }) => {
  const [imageOpen, setImageOpen] = useState(false);

  return (
    <Card key={product.id} className="overflow-hidden group h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Enhanced fallback with multiple attempts
            const target = e.currentTarget;
            if (!target.dataset.retry) {
              target.dataset.retry = "1";
              target.src = `/IMAGES/product1.jpeg`;
            } else if (target.dataset.retry === "1") {
              target.dataset.retry = "2";
              target.src = `https://via.placeholder.com/300x300/f3f4f6/6b7280?text=Carton+Box`;
            }
          }}
        />
      </div>
      <CardContent className="p-2 xs:p-3 sm:p-4 flex-1 flex flex-col">
        <h3 className="text-xs xs:text-sm sm:text-base font-semibold mb-1 sm:mb-2 line-clamp-2 min-h-[2.5rem] xs:min-h-[3rem]">{product.name}</h3>
        <p className="text-gray-600 text-xs xs:text-sm mb-2 sm:mb-3 line-clamp-2 flex-1">{product.description}</p>
        <div className="flex flex-col gap-2 sm:gap-3 mt-auto">
          <div className="flex justify-between items-center">
            <span className="text-xs xs:text-sm text-corporate capitalize">{product.category.replace('-', ' ')}</span>
            <span className="font-semibold text-sm xs:text-base text-corporate">₦{product.price.toLocaleString()}</span>
          </div>
          <div className="flex gap-1 xs:gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs xs:text-sm flex-1 h-8 xs:h-9 sm:h-10 min-h-[44px] xs:min-h-[36px]"
                >
                  <Eye size={12} className="mr-1 xs:mr-2" />
                  <span className="hidden xs:inline">View</span>
                  <span className="xs:hidden">👁</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                <DialogHeader>
                  <DialogTitle className="text-base sm:text-lg md:text-xl">{product.name}</DialogTitle>
                  <DialogDescription className="capitalize text-sm">{product.category.replace('-', ' ')}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.retry) {
                          target.dataset.retry = "1";
                          target.src = `/IMAGES/product1.jpeg`;
                        } else if (target.dataset.retry === "1") {
                          target.dataset.retry = "2";
                          target.src = `https://via.placeholder.com/400x400/f3f4f6/6b7280?text=Carton+Box`;
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">{product.name}</h3>
                      <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">{product.description}</p>
                      <p className="text-lg sm:text-xl font-semibold text-corporate mb-2 sm:mb-3">
                        ₦{product.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 mb-4 sm:mb-6 capitalize">
                        Category: {product.category.replace('-', ' ')}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Button
                        className="w-full min-h-[44px] text-sm sm:text-base"
                        onClick={() => {
                          onAddToCart(product);
                        }}
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              size="sm"
              className="text-xs xs:text-sm flex-1 h-8 xs:h-9 sm:h-10 min-h-[44px] xs:min-h-[36px]"
              onClick={() => onAddToCart(product)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="text-xs">Adding...</span>
              ) : (
                <>
                  <ShoppingCart size={12} className="mr-1 xs:mr-2" />
                  <span className="hidden xs:inline">Add</span>
                  <span className="xs:hidden">🛒</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
