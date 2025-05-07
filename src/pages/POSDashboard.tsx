import React, { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import PosHeader from '@/components/pos/PosHeader';
import ProductSearch from '@/components/pos/ProductSearch';
import ProductGrid from '@/components/pos/ProductGrid';
import PosCart from '@/components/pos/PosCart';
import PaymentModal from '@/components/pos/PaymentModal';
import { useReactToPrint } from 'react-to-print';
import PosReceipt from '@/components/pos/PosReceipt';
import { CartItem, Product, PaymentDetails, POSOrder } from '@/types/pos.types';

const POSDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<POSOrder | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  
  // Fetch products
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', searchQuery, categoryFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (categoryFilter) params.append('category', categoryFilter);
      
      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      return data.products;
    }
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
    }
  });

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.product._id === product._id && 
        (!item.variant || !product.hasVariants)
      );
      
      if (existingItem) {
        return prevCart.map(item => 
          item.product._id === product._id && (!item.variant || !product.hasVariants)
            ? { ...item, quantity: item.quantity + quantity }
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    
    setShowPayment(true);
  };

  const handlePayment = async (paymentDetails: PaymentDetails) => {
    try {
      // Calculate order totals
      const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
      const tax = subtotal * 0.05; // 5% tax example
      const totalAmount = subtotal + tax;
      
      const orderData = {
        items: cart.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
          variant: item.variant,
          subtotal: item.subtotal
        })),
        customer: paymentDetails.customer,
        subtotal,
        tax,
        discount: paymentDetails.discount || 0,
        discountCode: paymentDetails.discountCode,
        totalAmount,
        paymentMethod: paymentDetails.paymentMethod,
        notes: paymentDetails.notes
      };
      
      const response = await fetch('/api/pos/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }
      
      const order = await response.json();
      setCurrentOrder(order);
      
      toast.success('Order completed successfully');
      
      // Print receipt after successful payment
      setTimeout(() => {
        handlePrintReceipt();
        // Clear cart after successful order
        setCart([]);
        setShowPayment(false);
      }, 500);
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred during checkout');
    }
  };
  
  // Fixed: Using documentTitle, onAfterPrint, and onPrintError properties
  // Correctly using the ref with the documentElement getter function
  const handlePrintReceipt = useReactToPrint({
    documentTitle: `POS-Receipt-${currentOrder?.orderNumber || 'draft'}`,
    onAfterPrint: () => {
      toast.success('Receipt printed successfully');
    },
    onPrintError: () => {
      toast.error('Failed to print receipt');
    },
    // Replace 'content' property with the properly typed 'documentElement' getter function
    documentElement: () => receiptRef.current,
  });

  const handleClearCart = () => {
    setCart([]);
    toast.info('Cart cleared');
  };

  // Calculate cart summary
  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = subtotal * 0.05; // 5% tax example
  const total = subtotal + tax;

  if (error) {
    return <div className="text-center p-8">Error loading products: {error.toString()}</div>;
  }

  return (
    <Layout>
      <div className="flex flex-col h-screen max-h-screen overflow-hidden">
        <PosHeader 
          onClearCart={handleClearCart}
        />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Products Section */}
          <div className="w-2/3 flex flex-col overflow-hidden">
            <ProductSearch 
              onSearch={handleSearch} 
              onCategoryChange={handleCategoryChange}
              categories={categories || []}
            />
            <ProductGrid 
              products={products || []} 
              isLoading={isLoading} 
              onAddToCart={handleAddToCart}
            />
          </div>
          
          {/* Cart Section */}
          <div className="w-1/3 border-l border-gray-200 overflow-hidden">
            <PosCart 
              items={cart}
              subtotal={subtotal}
              tax={tax}
              total={total}
              onRemoveItem={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
        
        {/* Payment Modal */}
        {showPayment && (
          <PaymentModal
            total={total}
            subtotal={subtotal}
            tax={tax}
            onConfirm={handlePayment}
            onCancel={() => setShowPayment(false)}
          />
        )}
        
        {/* Hidden Receipt for Printing */}
        <div className="hidden">
          <PosReceipt 
            ref={receiptRef}
            order={currentOrder}
            cart={cart}
            subtotal={subtotal}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </Layout>
  );
};

export default POSDashboard;
