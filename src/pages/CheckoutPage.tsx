import React from 'react';
import Layout from '@/components/layout/Layout';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { toast } from 'sonner';

const CheckoutPage = () => {

  const handlePayment = () => {
    // Payment processing logic
    // Simulate a successful payment
    setTimeout(() => {
      toast("Order placed successfully", { description: "Thank you for your purchase!" });
      // Redirect to order confirmation page or clear cart
    }, 1500);
  };

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold text-corporate-dark mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
            <CheckoutForm onSubmit={handlePayment} />
          </div>

          {/* Order Summary */}
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

