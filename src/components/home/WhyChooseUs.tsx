
import React from 'react';
import { 
  Truck, 
  Shield, 
  CreditCard, 
  Users, 
  Leaf, 
  BadgePercent 
} from 'lucide-react';

const FeatureItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-sm hover-scale">
      <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-kraft-light text-corporate-dark mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Truck size={24} />,
      title: "Fast Delivery",
      description: "Get your packaging materials delivered quickly with our efficient shipping process."
    },
    {
      icon: <Shield size={24} />,
      title: "Quality Guarantee",
      description: "We stand behind our products with durability and performance guarantees."
    },
    {
      icon: <CreditCard size={24} />,
      title: "Secure Payments",
      description: "Shop with confidence using our secure and protected payment options."
    },
    {
      icon: <Users size={24} />,
      title: "Expert Support",
      description: "Our knowledgeable team is ready to help with all your packaging needs."
    },
    {
      icon: <Leaf size={24} />,
      title: "Eco-Friendly",
      description: "Sustainable packaging options that minimize environmental impact."
    },
    {
      icon: <BadgePercent size={24} />,
      title: "Bulk Discounts",
      description: "Save more with our volume-based pricing for larger orders."
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="section-title text-center">Why Choose Us</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          We're committed to providing high-quality packaging solutions with exceptional service that helps your business thrive.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
