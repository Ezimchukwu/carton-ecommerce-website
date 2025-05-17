
import { Product } from '@/types/pos.types';

export const useMockProducts = () => {
  // Mock products data
  const mockProducts: Product[] = [
    {
      _id: 'product1',
      name: 'Small Pizza Box',
      price: 1.99,
      description: 'Small pizza box',
      category: 'Pizza Boxes',
      images: [],
      stock: 50,
      hasVariants: false,
      active: true
    },
    {
      _id: 'product2',
      name: 'Medium Pizza Box',
      price: 2.49,
      description: 'Medium pizza box',
      category: 'Pizza Boxes',
      images: [],
      stock: 30,
      hasVariants: false,
      active: true
    },
    {
      _id: 'product3',
      name: 'Large Pizza Box',
      price: 2.99,
      description: 'Large pizza box',
      category: 'Pizza Boxes',
      images: [],
      stock: 25,
      hasVariants: false,
      active: true
    },
    {
      _id: 'product4',
      name: 'Extra Large Pizza Box',
      price: 3.49,
      description: 'Extra large pizza box',
      category: 'Pizza Boxes',
      images: [],
      stock: 20,
      hasVariants: false,
      active: true
    },
    {
      _id: 'product5',
      name: 'Small Mailer Box',
      price: 1.49,
      description: 'Small mailer box',
      category: 'Moving Boxes',
      images: [],
      stock: 40,
      hasVariants: false,
      active: true
    },
    {
      _id: 'product6',
      name: 'Medium Mailer Box',
      price: 1.99,
      description: 'Medium mailer box',
      category: 'Moving Boxes',
      images: [],
      stock: 35,
      hasVariants: false,
      active: true
    }
  ];

  // Mock categories
  const mockCategories = [
    { _id: 'cat1', name: 'Pizza Boxes', slug: 'pizza-boxes' },
    { _id: 'cat2', name: 'Moving Boxes', slug: 'moving-boxes' },
    { _id: 'cat3', name: 'Shipping Boxes', slug: 'shipping-boxes' },
    { _id: 'cat4', name: 'Gift Bags', slug: 'gift-bags' },
    { _id: 'cat5', name: 'Wrapping Paper', slug: 'wrapping-paper' }
  ];

  return { mockProducts, mockCategories };
};
