
import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import { useReactToPrint } from 'react-to-print';
import { CartItem, PaymentDetails, POSOrder } from '@/types/pos.types';
import PaymentModal from '@/components/pos/PaymentModal';
import PosReceipt from '@/components/pos/PosReceipt';

interface PaymentProcessorProps {
  cart: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  onOrderComplete: () => void;
}

const PaymentProcessor: React.FC<PaymentProcessorProps> = ({ 
  cart, 
  subtotal, 
  tax, 
  total,
  onOrderComplete 
}) => {
  const [showPayment, setShowPayment] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<POSOrder | null>(null);
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrintReceipt = useReactToPrint({
    documentTitle: `POS-Receipt-${currentOrder?.orderNumber || 'draft'}`,
    onAfterPrint: () => {
      toast.success('Receipt printed successfully');
    },
    onPrintError: () => {
      toast.error('Failed to print receipt');
    },
    content: () => receiptRef.current,
  });

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
        onOrderComplete();
        setShowPayment(false);
      }, 500);
      
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred during checkout');
    }
  };

  return (
    <>
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

      {/* Return the checkout function so it can be used by the parent component */}
      <button 
        className="w-full bg-primary text-primary-foreground h-11 rounded-md px-8 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium"
        disabled={cart.length === 0}
        onClick={handleCheckout}
      >
        Checkout
      </button>
    </>
  );
};

export default PaymentProcessor;
