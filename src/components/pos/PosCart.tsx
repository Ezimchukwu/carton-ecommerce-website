
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash, Plus, Minus } from 'lucide-react';
import { CartItem } from '@/types/pos.types';

interface PosCartProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, newQuantity: number) => void;
  onCheckout: () => void; // Kept for backward compatibility
}

const PosCart: React.FC<PosCartProps> = ({
  items,
  subtotal,
  tax,
  total,
  onRemoveItem,
  onUpdateQuantity
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-100 p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Current Sale</h2>
      </div>
      
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-gray-500">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <p className="text-center">No items in cart</p>
          <p className="text-sm text-center mt-2">Add products by clicking on them</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          {items.map((item, index) => (
            <div key={`${item.product._id}-${index}`} className="flex items-center py-2 border-b border-gray-100">
              <div className="flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                {item.variant && (
                  <p className="text-xs text-gray-500">
                    {item.variant.size && `Size: ${item.variant.size}`}
                    {item.variant.size && item.variant.packagingType && ' / '}
                    {item.variant.packagingType && `Type: ${item.variant.packagingType}`}
                  </p>
                )}
                <div className="flex items-center text-sm text-gray-500">
                  <span>${item.price.toFixed(2)} × {item.quantity}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="font-medium">${item.subtotal.toFixed(2)}</span>
                
                <div className="flex items-center border rounded">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 rounded-none"
                    onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 rounded-none"
                    onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onRemoveItem(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="space-y-1 mb-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (5%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-100">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Checkout button moved to PaymentProcessor */}
      </div>
    </div>
  );
};

export default PosCart;
