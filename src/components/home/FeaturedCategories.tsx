
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryProps {
  title: string;
  slug: string;
  image: string;
  description: string;
}

const CategoryCard: React.FC<CategoryProps> = ({ title, slug, image, description }) => {
  return (
    <div className="product-card group">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-corporate-dark mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <Link 
          to={`/category/${slug}`} 
          className="inline-flex items-center text-corporate hover:text-corporate-dark transition-colors"
        >
          Browse Products <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

const FeaturedCategories: React.FC = () => {
  const categories = [
    {
      title: "Pizza Boxes",
      slug: "pizza-boxes",
      image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9",
      description: "High-quality pizza boxes available in various sizes from 6\" to 16\"."
    },
    {
      title: "Moving & Storage",
      slug: "moving-storage-boxes",
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28",
      description: "Durable boxes perfect for moving, relocation, and storage purposes."
    },
    {
      title: "Food Packaging",
      slug: "food-packaging",
      image: "https://images.unsplash.com/photo-1595964065429-c52c20bedb66",
      description: "Specialized packaging for burgers, shawarma, chicken, pies, and more."
    },
    {
      title: "Gift Packaging",
      slug: "gift-packaging",
      image: "https://images.unsplash.com/photo-1605164599901-f26e01783e64",
      description: "High-end quality gift bags and fancy packaging solutions."
    },
    {
      title: "Mailer Boxes",
      slug: "specialty-boxes",
      image: "https://images.unsplash.com/photo-1607349913338-fca6f7fc42d0",
      description: "Custom mailer boxes, gable boxes, and e-commerce packaging solutions."
    },
    {
      title: "Custom Printing",
      slug: "printing-branding",
      image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9",
      description: "Customize any box with your brand logo and design for a professional look."
    },
    {
      title: "Paper Bags & Envelopes",
      slug: "paper-bags-envelopes",
      image: "https://images.unsplash.com/photo-1605164599901-f26e01783e64",
      description: "Kraft papers, 2ply-fluiting, paper bags, and envelopes for all needs."
    },
    {
      title: "Adhesives & Accessories",
      slug: "adhesives",
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28",
      description: "Complete range of glues, tapes, and packaging accessories."
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="section-title text-center mb-10">Browse Our Categories</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              title={category.title}
              slug={category.slug}
              image={category.image}
              description={category.description}
            />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            to="/products" 
            className="inline-flex items-center bg-corporate hover:bg-corporate-dark text-white px-6 py-3 rounded-md transition-colors"
          >
            View All Categories <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
