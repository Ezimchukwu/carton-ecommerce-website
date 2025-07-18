
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
    <Card key={product.id} className="overflow-hidden group h-full flex flex-col">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = '/IMAGES/product1.jpeg'; // Fallback image
          }}
        />
      </div>
      <CardContent className="p-2 sm:p-3 flex-1 flex flex-col">
        <h3 className="text-xs sm:text-sm font-semibold mb-1 truncate">{product.name}</h3>
        <p className="text-gray-600 text-xs mb-2 line-clamp-2 flex-1">{product.description}</p>
        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex justify-between items-center">
            <span className="text-xs text-corporate">{product.category.replace('-', ' ')}</span>
            <span className="font-semibold text-sm">₦{product.price.toLocaleString()}</span>
          </div>
          <div className="flex gap-1 sm:gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs flex-1 h-8"
                >
                  <Eye size={12} className="mr-1" />
                  <span className="hidden xs:inline">View</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-lg sm:text-xl">{product.name}</DialogTitle>
                  <DialogDescription className="capitalize">{product.category.replace('-', ' ')}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="aspect-square overflow-hidden rounded-md">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/IMAGES/product1.jpeg';
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                      <p className="text-gray-700 mb-4 text-sm sm:text-base">{product.description}</p>
                      <p className="text-lg font-semibold text-corporate mb-2">
                        ₦{product.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 mb-4 capitalize">
                        Category: {product.category.replace('-', ' ')}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Button
                        className="w-full"
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
              className="text-xs flex-1 h-8"
              onClick={() => onAddToCart(product)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="text-xs">Adding...</span>
              ) : (
                <>
                  <ShoppingCart size={12} className="mr-1" />
                  <span className="hidden xs:inline">Add</span>
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
