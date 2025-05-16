
import React from 'react';
import { useCart } from '@/hooks/useCart';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

const OrderSummary: React.FC = () => {
  const { items, subtotal } = useCart();
  
  const shipping = 5.99;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;
  
  // Convert USD to Naira (using a fixed exchange rate for simplicity)
  const exchangeRate = 1550; // 1 USD = 1550 Naira
  const subtotalNaira = subtotal * exchangeRate;
  const shippingNaira = shipping * exchangeRate;
  const taxNaira = tax * exchangeRate;
  const totalNaira = total * exchangeRate;

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-4">Order Items</h3>
        
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-16 h-16 min-w-16 rounded overflow-hidden">
                {item.image && (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <div>${(item.price * item.quantity).toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">
                  ₦{((item.price * item.quantity) * exchangeRate).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <div className="text-right">
              <div>${subtotal.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">₦{subtotalNaira.toLocaleString()}</div>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <div className="text-right">
              <div>${shipping.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">₦{shippingNaira.toLocaleString()}</div>
            </div>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <div className="text-right">
              <div>${tax.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">₦{taxNaira.toLocaleString()}</div>
            </div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <div className="text-right">
            <div>${total.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">₦{totalNaira.toLocaleString()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
