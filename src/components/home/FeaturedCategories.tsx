
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
  path: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, image, slug, path }) => {
  return (
    <Link to={path} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
          <h3 className="text-lg font-medium text-corporate-dark group-hover:text-corporate">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {description}
          </p>
          <div className="mt-2 flex items-center text-corporate">
            <span className="text-sm font-medium">Browse Products</span>
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const FeaturedCategories: React.FC = () => {
  const categories = [
    {
      title: "Pizza Boxes",
      description: "High-quality pizza boxes available in various sizes from 6\" to 16\".",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product8.jpeg",
      slug: "pizza-boxes",
      path: "/categories/pizza-boxes"
    },
    {
      title: "Moving & Storage",
      description: "Durable boxes perfect for moving, relocation, and storage purposes.",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product15.jpeg",
      slug: "moving-storage-boxes",
      path: "/categories/cargo-boxes"
    },
    {
      title: "Food Packaging",
      description: "Specialized packaging for burgers, shawarma, chicken, pies, and more.",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product12.jpeg",
      slug: "food-packaging",
      path: "/products?category=food-packaging"
    },
    {
      title: "Gift Packaging",
      description: "High-end quality gift bags and fancy packaging solutions.",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product16.jpeg",
      slug: "gift-packaging",
      path: "/categories/gift-bags"
    },
    {
      title: "Mailer Boxes",
      description: "Custom mailer boxes, gable boxes, and e-commerce packaging solutions.",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product26.jpeg",
      slug: "mailer-boxes",
      path: "/categories/mailer-boxes"
    },
    {
      title: "Custom Printing",
      description: "Customize any box with your brand logo and design for a professional look.",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product14.jpeg",
      slug: "custom-printing",
      path: "/custom-printing"
    },
    {
      title: "Paper Bags & Envelopes",
      description: "Kraft papers, 2ply-fluiting, paper bags, and envelopes for all needs.",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product10.jpeg",
      slug: "paper-bags-envelopes",
      path: "/categories/wrapping-papers"
    },
    {
      title: "Adhesives & Accessories",
      description: "Complete range of glues, tapes, and packaging accessories.",
      image: "https://a59f966b-3068-4b84-8ccb-5de17fedad8d.lovableproject.com/IMAGES/product11.jpeg",
      slug: "adhesives",
      path: "/categories/adhesives"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="section-title text-center mb-12">Browse Our Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard 
              key={category.slug}
              title={category.title}
              description={category.description}
              image={category.image}
              slug={category.slug}
              path={category.path}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
