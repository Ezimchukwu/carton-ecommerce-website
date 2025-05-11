
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PaymentDetails } from '@/types/pos.types';
import { CreditCard, Banknote, Truck } from 'lucide-react';

interface PaymentModalProps {
  total: number;
  subtotal: number;
  tax: number;
  onConfirm: (paymentDetails: PaymentDetails) => void;
  onCancel: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  total,
  subtotal,
  tax,
  onConfirm,
  onCancel
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'bank_transfer' | 'other'>('cash');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'completed' | 'pay_on_delivery'>('completed');
  const [amountReceived, setAmountReceived] = useState<number>(total);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState('');
  
  const change = amountReceived - (total - discount);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onConfirm({
      paymentMethod,
      paymentStatus,
      amount: amountReceived,
      change: change > 0 ? change : 0,
      customer: {
        name: customerName || 'Walk-in Customer',
        phone: customerPhone
      },
      discount,
      notes
    });
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm text-gray-500">Subtotal</div>
              <div className="font-medium">${subtotal.toFixed(2)}</div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-sm text-gray-500">Tax</div>
              <div className="font-medium">${tax.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="discount">Discount</Label>
            <Input
              id="discount"
              type="number"
              min="0"
              step="0.01"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
            />
          </div>
          
          <div className="p-3 bg-blue-50 rounded-lg my-2">
            <div className="text-sm text-blue-600">Total to Pay</div>
            <div className="font-bold text-lg">${(total - discount).toFixed(2)}</div>
          </div>
          
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                type="button"
                variant={paymentMethod === 'cash' ? "default" : "outline"}
                className="flex flex-col items-center justify-center p-3 h-auto"
                onClick={() => setPaymentMethod('cash')}
              >
                <Banknote className="h-6 w-6 mb-1" />
                <span className="text-xs">Cash</span>
              </Button>
              
              <Button
                type="button"
                variant={paymentMethod === 'card' ? "default" : "outline"}
                className="flex flex-col items-center justify-center p-3 h-auto"
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard className="h-6 w-6 mb-1" />
                <span className="text-xs">Card</span>
              </Button>
              
              <Button
                type="button"
                variant={paymentMethod === 'bank_transfer' ? "default" : "outline"}
                className="flex flex-col items-center justify-center p-3 h-auto"
                onClick={() => setPaymentMethod('bank_transfer')}
              >
                <Truck className="h-6 w-6 mb-1" />
                <span className="text-xs">Delivery</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Payment Status</Label>
            <Select
              value={paymentStatus}
              onValueChange={(value) => setPaymentStatus(value as 'pending' | 'completed' | 'pay_on_delivery')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Paid</SelectItem>
                <SelectItem value="pending">Unpaid</SelectItem>
                <SelectItem value="pay_on_delivery">Pay on Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {paymentMethod === 'cash' && (
            <div className="space-y-2">
              <Label htmlFor="amount-received">Amount Received</Label>
              <Input
                id="amount-received"
                type="number"
                min={0}
                step="0.01"
                value={amountReceived}
                onChange={(e) => setAmountReceived(parseFloat(e.target.value) || 0)}
              />
              
              <div className="p-3 bg-green-50 rounded">
                <div className="text-sm text-green-600">Change</div>
                <div className="font-medium">${change > 0 ? change.toFixed(2) : '0.00'}</div>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="customer-name">Customer Name (Optional)</Label>
            <Input
              id="customer-name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Walk-in Customer"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customer-phone">Customer Phone (Optional)</Label>
            <Input
              id="customer-phone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes here..."
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Complete Sale</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
