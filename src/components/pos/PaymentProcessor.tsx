
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
    // Use contentRef instead of a function to match the expected RefObject<ContentNode> type
    contentRef: receiptRef,
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
      // Mock order creation
      const mockOrder = {
        _id: `order_${Date.now()}`,
        orderNumber: `POS${Date.now().toString().slice(-8)}`,
        items: cart,
        customer: paymentDetails.customer,
        staff: { _id: 'staff_1', name: 'Staff User', email: 'staff@example.com' },
        subtotal: subtotal,
        tax: tax,
        discount: paymentDetails.discount || 0,
        discountCode: paymentDetails.discountCode,
        totalAmount: total - (paymentDetails.discount || 0),
        paymentMethod: paymentDetails.paymentMethod,
        paymentStatus: 'completed',
        notes: paymentDetails.notes,
        createdAt: new Date().toISOString()
      };
      
      setCurrentOrder(mockOrder as POSOrder);
      
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
