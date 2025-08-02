
// Helper function and data related to products

// Helper function to check if wholesale number exists
export const existingWholesaleNumbers = [1, 2, 3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// Product data with all available images and prices
export const getProducts = () => {
  const products = [
    // Product series 1-34
    ...[...Array(34)].map((_, index) => {
      const productNumber = index + 1;
      // Use relative path for production compatibility
      const imagePath = `/IMAGES/product${productNumber}.jpeg`;
      
      return {
        id: productNumber,
        name: `Carton Box ${productNumber}`,
        image: imagePath,
        description: "Quality carton packaging solution designed for durability and professional presentation",
        category: "carton-boxes",
        price: 1000 + (productNumber * 100) // Example price calculation
      };
    }),
    // Wholesale series (only existing numbers)
    ...existingWholesaleNumbers.map((num, index) => ({
      id: 35 + index,
      name: `Wholesale Carton ${num}`,
      image: `/IMAGES/Wholsale ${num}.jpeg`,
      description: "Bulk packaging solution for commercial and industrial use",
      category: "wholesale-boxes",
      price: 2500 + (num * 200) // Higher price for wholesale items
    })),
    // Additional products with their prices
    {
      id: 51,
      name: "Premium Storage Box",
      image: "/IMAGES/Wholsale 5.jpeg",
      description: "Premium quality storage solution for archival and organizational needs",
      category: "storage-boxes",
      price: 3500
    },
    {
      id: 52,
      name: "Industrial Shipping Box",
      image: "/IMAGES/Wholsale 6.jpeg",
      description: "Heavy-duty shipping container for industrial applications",
      category: "shipping-boxes",
      price: 4000
    },
    {
      id: 53,
      name: "Retail Display Box",
      image: "/IMAGES/Wholsale 8.jpeg",
      description: "Attractive retail display solution for product presentation",
      category: "display-boxes",
      price: 2000
    },
    {
      id: 54,
      name: "Custom Gift Box",
      image: "/IMAGES/Wholsale 9.jpeg",
      description: "Elegant custom gift packaging for special occasions",
      category: "gift-boxes",
      price: 3000
    },
    {
      id: 55,
      name: "Eco-Friendly Box",
      image: "/IMAGES/Wholsale 10.jpeg",
      description: "Sustainable packaging solution made from recycled materials",
      category: "eco-friendly",
      price: 2500
    },
    {
      id: 56,
      name: "Deluxe Packaging",
      image: "/IMAGES/Wholsale 11.jpeg",
      description: "Premium deluxe packaging option for luxury products",
      category: "premium-boxes",
      price: 5000
    }
  ].filter(product => {
    try {
      const img = new Image();
      img.src = product.image;
      return true;
    } catch {
      return false;
    }
  });

  return products;
};

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
}
