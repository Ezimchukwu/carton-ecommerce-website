
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
    }
  }, [items, navigate]);

  const handlePayment = () => {
    // Payment processing occurs in CheckoutForm component now
    // This just handles the post-payment navigation
    navigate('/order-confirmation');
  };

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold text-corporate-dark mb-6">Checkout</h1>
        
        {!isAuthenticated && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800">
              <span className="font-medium">Already have an account?</span>{' '}
              <button 
                className="text-corporate underline font-medium"
                onClick={() => {
                  // This would typically toggle an auth modal
                  toast.info("Please use the login button in the header");
                }}
              >
                Login
              </button>{' '}
              to access your saved addresses and faster checkout.
            </p>
          </div>
        )}
        
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
