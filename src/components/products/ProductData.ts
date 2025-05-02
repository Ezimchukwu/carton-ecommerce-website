
// Helper function and data related to products

// Helper function to check if wholesale number exists
export const existingWholesaleNumbers = [1, 2, 3, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16];

// Product data with all available images and prices
export const getProducts = () => {
  const products = [
    // Product series 1-34
    ...[...Array(34)].map((_, index) => {
      const productNumber = index + 1;
      const imagePath = productNumber === 9 
        ? '/IMAGES/product9.jpeg'
        : `/IMAGES/product${productNumber}.jpeg`;
      
      return {
        id: productNumber,
        name: `Product ${productNumber}`,
        image: imagePath,
        description: "Quality carton packaging solution",
        category: "General",
        price: 1000 + (productNumber * 100) // Example price calculation
      };
    }),
    // Wholesale series (only existing numbers)
    ...existingWholesaleNumbers.map((num, index) => ({
      id: 35 + index,
      name: `Wholesale ${num}`,
      image: `/IMAGES/Wholsale ${num}.jpeg`,
      description: "Bulk packaging solution",
      category: "Wholesale",
      price: 2500 + (num * 200) // Higher price for wholesale items
    })),
    // Additional products with their prices
    {
      id: 51,
      name: "Premium Storage Box",
      image: "/IMAGES/Wholsale 5.jpeg",
      description: "Premium quality storage solution",
      category: "Storage",
      price: 3500
    },
    {
      id: 52,
      name: "Industrial Shipping Box",
      image: "/IMAGES/Wholsale 6.jpeg",
      description: "Heavy-duty shipping container",
      category: "Industrial",
      price: 4000
    },
    {
      id: 53,
      name: "Retail Display Box",
      image: "/IMAGES/Wholsale 8.jpeg",
      description: "Attractive retail display solution",
      category: "Retail",
      price: 2000
    },
    {
      id: 54,
      name: "Custom Gift Box",
      image: "/IMAGES/Wholsale 9.jpeg",
      description: "Elegant custom gift packaging",
      category: "Specialty",
      price: 3000
    },
    {
      id: 55,
      name: "Eco-Friendly Box",
      image: "/IMAGES/Wholsale 10.jpeg",
      description: "Sustainable packaging solution",
      category: "Eco-Friendly",
      price: 2500
    },
    {
      id: 56,
      name: "Deluxe Packaging",
      image: "/IMAGES/Wholsale 11.jpeg",
      description: "Premium deluxe packaging option",
      category: "Premium",
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
