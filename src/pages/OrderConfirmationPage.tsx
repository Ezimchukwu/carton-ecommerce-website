import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Truck, Mail, FileText } from 'lucide-react';

const OrderConfirmationPage = () => {
  // In a real app, this would come from your order management system
  const orderNumber = `ORD${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  
  return (
    <Layout>
      <div className="py-16">
        <div className="container max-w-2xl text-center">
          <div className="mb-8">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-corporate-dark mb-2">Thank You for Your Order!</h1>
            <p className="text-xl text-gray-600">Your order has been successfully placed.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FileText className="text-corporate" size={20} />
              <span className="text-lg font-medium">Order Number: {orderNumber}</span>
            </div>
            
            <p className="text-gray-600 mb-6">
              We've sent a confirmation email to your registered email address with your order details.
            </p>

            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="p-4 bg-kraft-light/20 rounded-lg">
                <Truck className="w-8 h-8 text-corporate mx-auto mb-2" />
                <h3 className="font-medium mb-1">Estimated Delivery</h3>
                <p className="text-sm text-gray-600">3-5 Business Days</p>
              </div>
              
              <div className="p-4 bg-kraft-light/20 rounded-lg">
                <Mail className="w-8 h-8 text-corporate mx-auto mb-2" />
                <h3 className="font-medium mb-1">Order Updates</h3>
                <p className="text-sm text-gray-600">You'll receive email updates about your order</p>
              </div>
            </div>

            <div className="space-y-2">
              <Button asChild className="w-full bg-corporate hover:bg-corporate-dark">
                <Link to="/products">Continue Shopping</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/track-order">Track Your Order</Link>
              </Button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p>Need help? <Link to="/contact" className="text-corporate hover:underline">Contact our support team</Link></p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage; 