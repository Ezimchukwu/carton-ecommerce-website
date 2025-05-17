
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Paypal } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  paymentMethod: z.enum(['card', 'paypal']),
});

type CheckoutFormProps = {
  onSubmit: () => void;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Nigeria',
      paymentMethod: 'card',
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      console.log('Form values:', values);
      console.log('Card details:', cardDetails);
      
      // Simulate API call for payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Send confirmation email (simulated)
      toast.success("Payment successful!", {
        description: "A confirmation email has been sent to your inbox."
      });
      
      // Call the onSubmit prop function to proceed with order completion
      onSubmit();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("Payment failed", {
        description: "There was an issue processing your payment. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Nigerian states list
  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Federal Capital Territory',
    'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
    'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const selectedPaymentMethod = form.watch('paymentMethod');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="080XXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="my-6" />
        <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Lagos" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Select 
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {nigerianStates.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP Code</FormLabel>
                <FormControl>
                  <Input placeholder="100001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select 
                defaultValue={field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Nigeria">Nigeria</SelectItem>
                  <SelectItem value="Ghana">Ghana</SelectItem>
                  <SelectItem value="Kenya">Kenya</SelectItem>
                  <SelectItem value="South Africa">South Africa</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="my-6" />
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-4"
                >
                  <div className="flex items-center space-x-2 border p-4 rounded-md bg-white hover:bg-gray-50">
                    <RadioGroupItem value="card" id="card" />
                    <label htmlFor="card" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                      <span>Credit/Debit Card</span>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 border p-4 rounded-md bg-white hover:bg-gray-50">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <label htmlFor="paypal" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <Paypal className="h-5 w-5 text-blue-500" />
                      <span>PayPal</span>
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedPaymentMethod === 'card' && (
          <div className="space-y-4 p-4 border rounded-md bg-gray-50">
            <div>
              <FormLabel>Card Number</FormLabel>
              <Input 
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormLabel>Expiry Date</FormLabel>
                <Input 
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                />
              </div>
              <div>
                <FormLabel>CVV</FormLabel>
                <Input 
                  placeholder="123"
                  type="password"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}

        {selectedPaymentMethod === 'paypal' && (
          <div className="p-4 border rounded-md bg-gray-50 text-center">
            <p>You will be redirected to PayPal to complete your payment.</p>
          </div>
        )}

        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Complete Order"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutForm;
