
import { useState } from 'react';
import { toast } from 'sonner';
import { CartItem, Product } from '@/types/pos.types';

export const useCartManagement = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.product._id === product._id && 
        (!item.variant || !product.hasVariants)
      );
      
      if (existingItem) {
        return prevCart.map(item => 
          item.product._id === product._id && (!item.variant || !product.hasVariants)
            ? { ...item, quantity: item.quantity + quantity, subtotal: item.price * (item.quantity + quantity) }
            : item
        );
      } else {
        return [...prevCart, {
          product,
          quantity,
          price: product.price,
          subtotal: product.price * quantity
        }];
      }
    });
    
    toast.success(`${product.name} added to cart`);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(prevCart => prevCart.filter((_, idx) => idx !== index));
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => prevCart.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          quantity: newQuantity,
          subtotal: item.price * newQuantity
        };
      }
      return item;
    }));
  };

  const handleClearCart = () => {
    setCart([]);
    toast.info('Cart cleared');
  };

  // Calculate cart summary
  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = subtotal * 0.05; // 5% tax example
  const total = subtotal + tax;

  return {
    cart,
    subtotal,
    tax,
    total,
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleClearCart,
    setCart
  };
};
