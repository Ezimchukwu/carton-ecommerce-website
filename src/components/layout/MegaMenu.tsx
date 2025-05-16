
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MegaMenuProps {
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  const categories = [
    {
      name: "Pizza Boxes",
      slug: "pizza-boxes",
      path: "/categories/pizza-boxes",
      description: "Boxes designed specifically for pizzas of various sizes.",
      subcategories: ["6\" Pizza Boxes", "8\" Pizza Boxes", "10\" Pizza Boxes", "12\" Pizza Boxes", "14\" Pizza Boxes", "16\" Pizza Boxes"]
    },
    {
      name: "Moving & Storage Boxes",
      slug: "moving-storage-boxes",
      path: "/categories/cargo-boxes",
      description: "Durable boxes for moving, relocation, and storage purposes.",
      subcategories: ["Big Boxes", "Moving Boxes", "Cargo Boxes", "Storage Boxes", "Multi-Purpose Boxes"]
    },
    {
      name: "Specialty Boxes",
      slug: "specialty-boxes",
      path: "/categories/mailer-boxes",
      description: "Custom boxes designed for specific products and purposes.",
      subcategories: ["Mailer Boxes", "Gable Boxes", "Cake Boxes", "e-Commerce Boxes"]
    },
    {
      name: "Medium Size Boxes",
      slug: "medium-boxes",
      path: "/products?category=medium-boxes",
      description: "Versatile medium-sized boxes for various needs.",
      subcategories: ["DOC Boxes", "Door Boxes", "Shoe Boxes", "Sheet Board Boxes"]
    },
    {
      name: "Food Wrapping Papers",
      slug: "food-wrapping",
      path: "/categories/wrapping-papers",
      description: "Quality papers for wrapping and serving food items.",
      subcategories: ["Grease-Proof Paper", "Kraft Paper"]
    },
    {
      name: "Paper Bags & Envelopes",
      slug: "paper-bags-envelopes",
      path: "/categories/wrapping-papers",
      description: "Various styles of paper bags and envelopes for packaging needs.",
      subcategories: ["Kraft Papers", "2ply-Fluiting", "Paper Bags", "Envelopes"]
    },
    {
      name: "Archive & Document Storage",
      slug: "archive-storage",
      path: "/products?category=archive-storage",
      description: "Solutions for document archiving and storage.",
      subcategories: ["Archive Boxes", "Document Storage", "Cargo Packaging", "General Packaging"]
    },
    {
      name: "Food Packaging",
      slug: "food-packaging",
      path: "/products?category=food-packaging",
      description: "Specialized packaging solutions for food items.",
      subcategories: ["Burger Boxes", "Shawarma Wraps", "Chicken Boxes", "Pie Boxes", "Donut Boxes", "Hotdog Containers", "Small Chops Boxes"]
    },
    {
      name: "Gift & Fancy Packaging",
      slug: "gift-packaging",
      path: "/categories/gift-bags",
      description: "High-quality packaging options for gifts and premium products.",
      subcategories: ["Gift Bags", "Fancy Packaging", "Premium Packaging"]
    },
    {
      name: "Printing & Branding",
      slug: "printing-branding",
      path: "/custom-printing",
      description: "Custom printing and branding services for packaging products.",
      subcategories: ["Logo Printing", "Custom Design", "Brand Integration"]
    },
    {
      name: "Corrugated Wrapping",
      slug: "corrugated-wrapping",
      path: "/categories/wrapping-papers",
      description: "Protective wrapping materials for fragile items and surfaces.",
      subcategories: ["Double Ply", "Fragile Wrapping", "Floor Protection", "Wall Protection", "Export Wrapping"]
    },
    {
      name: "Adhesives & Accessories",
      slug: "adhesives",
      path: "/categories/adhesives",
      description: "Adhesive products and packaging accessories.",
      subcategories: ["Glue", "Gum", "Hot-Melt", "Cellotape", "Cellotape Dispensers"]
    },
  ];

  return (
    <div className="absolute left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 animate-fade-in">
      <div className="container py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-corporate-dark">Product Categories</h2>
          <Button variant="ghost" onClick={onClose} size="sm">
            <X size={20} />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.slug} className="mb-4">
              <Link 
                to={category.path} 
                className="text-lg font-medium text-corporate hover:text-corporate-dark"
                onClick={onClose}
              >
                {category.name}
              </Link>
              <p className="text-sm text-gray-500 mt-1 mb-2">{category.description}</p>
              <ul className="space-y-1">
                {category.subcategories.map((subcat, idx) => (
                  <li key={idx}>
                    <Link 
                      to={`${category.path}`}
                      className="text-sm text-gray-600 hover:text-corporate"
                      onClick={onClose}
                    >
                      {subcat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
