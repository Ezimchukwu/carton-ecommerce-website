
import React, { forwardRef } from 'react';
import { CartItem, POSOrder } from '@/types/pos.types';
import { formatDate } from '@/lib/utils';

interface PosReceiptProps {
  order: POSOrder | null;
  cart: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

const PosReceipt = forwardRef<HTMLDivElement, PosReceiptProps>(
  ({ order, cart, subtotal, tax, total }, ref) => {
    const today = order ? new Date(order.createdAt) : new Date();
    const formattedDate = formatDate ? formatDate(today) : today.toLocaleDateString();
    const formattedTime = today.toLocaleTimeString();
    
    // Use order data if available, otherwise use cart data (for preview)
    const items = order?.items.length 
      ? order.items 
      : cart.map(item => ({
          product: item.product,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.subtotal
        }));
        
    const orderNumber = order?.orderNumber || 'DRAFT';
    
    return (
      <div ref={ref} className="p-6 bg-white max-w-md mx-auto font-mono text-sm">
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold">CARTON ECO PACKAGING</h2>
          <p>123 Green Street, Eco City</p>
          <p>Tel: (123) 456-7890</p>
        </div>
        
        <div className="border-t border-b border-dashed border-gray-300 py-2 mb-4">
          <div className="flex justify-between">
            <span>Order #:</span>
            <span>{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{formattedDate}</span>
          </div>
          <div className="flex justify-between">
            <span>Time:</span>
            <span>{formattedTime}</span>
          </div>
          {order?.staff && (
            <div className="flex justify-between">
              <span>Staff:</span>
              <span>
                {typeof order.staff === 'string' ? order.staff : order.staff.name}
              </span>
            </div>
          )}
        </div>
        
        <div className="mb-4">
          <div className="flex font-bold border-b border-gray-300 pb-1 mb-2">
            <div className="w-1/2">Item</div>
            <div className="w-1/6 text-right">Qty</div>
            <div className="w-1/6 text-right">Price</div>
            <div className="w-1/6 text-right">Total</div>
          </div>
          
          {items.map((item, index) => (
            <div key={index} className="flex py-1 text-sm">
              <div className="w-1/2">
                {typeof item.product === 'string' 
                  ? `Product #${index + 1}`
                  : item.product.name}
              </div>
              <div className="w-1/6 text-right">{item.quantity}</div>
              <div className="w-1/6 text-right">${item.price.toFixed(2)}</div>
              <div className="w-1/6 text-right">${item.subtotal.toFixed(2)}</div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-dashed border-gray-300 pt-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${order?.subtotal.toFixed(2) || subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax:</span>
            <span>${order?.tax.toFixed(2) || tax.toFixed(2)}</span>
          </div>
          {order?.discount && order.discount > 0 && (
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>-${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold border-t border-dashed border-gray-300 mt-2 pt-2">
            <span>TOTAL:</span>
            <span>${order?.totalAmount.toFixed(2) || total.toFixed(2)}</span>
          </div>
          
          {order && (
            <div className="mt-2">
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Status:</span>
                <span>{order.paymentStatus}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center text-xs">
          <p>Thank you for shopping with us!</p>
          <p>All sustainable packaging for a greener future</p>
        </div>
      </div>
    );
  }
);

PosReceipt.displayName = 'PosReceipt';

export default PosReceipt;
