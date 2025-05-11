
// Product Types
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string | { _id: string; name: string; slug: string };
  images: string[];
  stock: number;
  hasVariants: boolean;
  variants?: ProductVariant[];
  active: boolean;
  sku?: string;
  barcode?: string;
}

export interface ProductVariant {
  name?: string;
  size?: string;
  packagingType?: string;
  price: number;
  stock: number;
  sku?: string;
  other?: Record<string, string>;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
  variant?: ProductVariant;
  subtotal: number;
}

// Payment Types
export interface PaymentDetails {
  paymentMethod: 'cash' | 'card' | 'bank_transfer' | 'other';
  paymentStatus: 'pending' | 'completed' | 'pay_on_delivery';
  amount: number;
  change?: number;
  customer: CustomerInfo;
  discount?: number;
  discountCode?: string;
  notes?: string;
}

export interface CustomerInfo {
  name?: string;
  email?: string;
  phone?: string;
  isRegistered?: boolean;
  userId?: string;
}

// POS Order Types
export interface POSOrder {
  _id: string;
  orderNumber: string;
  items: Array<{
    product: string | Product;
    quantity: number;
    price: number;
    variant?: ProductVariant;
    subtotal: number;
  }>;
  customer?: CustomerInfo;
  staff: string | { _id: string; name: string; email: string };
  subtotal: number;
  tax: number;
  discount: number;
  discountCode?: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'pay_on_delivery' | 'failed';
  notes?: string;
  createdAt: string;
}

// Inventory Types
export interface InventoryItem {
  _id: string;
  product: string | Product;
  quantity: number;
  variant?: {
    size?: string;
    packagingType?: string;
    other?: Record<string, string>;
  };
  lowStockThreshold: number;
  isLowStock: boolean;
  lastUpdated: string;
}
