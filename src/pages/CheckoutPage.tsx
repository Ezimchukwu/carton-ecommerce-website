
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { toast } from 'sonner';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/AuthContext';

const CheckoutPage = () => {
  const { items, subtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if cart is empty
    if (items.length === 0) {
      toast.info("Your cart is empty", { description: "Add some items to your cart first." });
      navigate('/products');
      return;
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
      toast.error("Authentication required", { 
        description: "Please log in to continue with your purchase." 
      });
      navigate('/');
      return;
    }
  }, [items, isAuthenticated, navigate]);

  const handlePayment = () => {
    // Payment processing occurs in CheckoutForm component now
    // This just handles the post-payment navigation
    navigate('/order-confirmation');
  };

  // Don't render anything if user is not authenticated or cart is empty
  if (!isAuthenticated || items.length === 0) {
    return null;
  }

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold text-corporate-dark mb-6">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Checkout Form - Now contains payment method selection */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
            <CheckoutForm onSubmit={handlePayment} />
          </div>

          {/* Order Summary - Now has quantity controls */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <OrderSummary />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
