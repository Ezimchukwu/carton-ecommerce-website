
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '@/types/pos.types';
import { formatCurrency } from '@/lib/utils';

interface PosCartProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  onRemoveItem: (id: string) => void; // Changed from index: number
  onUpdateQuantity: (id: string, quantity: number) => void; // Changed from index: number
  onCheckout: () => void;
}

const PosCart: React.FC<PosCartProps> = ({
  items,
  subtotal,
  tax,
  total,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout
}) => {
  if (items.length === 0) {
    return (
      <div className="p-4 h-full flex flex-col">
        <h3 className="text-lg font-medium mb-4">Cart</h3>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <h3 className="text-lg font-medium mb-4">Cart</h3>
      
      <div className="flex-1 overflow-auto">
        {items.map((item, index) => (
          <div key={`${item.product._id}-${index}`} className="mb-3 pb-3 border-b">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">{formatCurrency(item.price)} each</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-red-500"
                onClick={() => onRemoveItem(item.product._id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center border rounded">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus size={14} />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
              <span className="font-medium">{formatCurrency(item.subtotal)}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between mb-1">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold mb-4">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
        
        <Button 
          className="w-full bg-corporate hover:bg-corporate/90"
          onClick={onCheckout}
          disabled={items.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default PosCart;
