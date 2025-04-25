
import React from 'react';
import { 
  Award, 
  Recycle, 
  Users, 
  Zap, 
  Heart, 
  Scale 
} from 'lucide-react';

const ValueCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-kraft-light text-corporate-dark mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-corporate-dark">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const MissionValues: React.FC = () => {
  const coreValues = [
    {
      icon: <Award size={24} />,
      title: "Quality Excellence",
      description: "We're committed to delivering packaging solutions that meet the highest standards of quality and performance."
    },
    {
      icon: <Recycle size={24} />,
      title: "Environmental Responsibility",
      description: "We prioritize sustainable materials and practices to minimize our environmental impact."
    },
    {
      icon: <Users size={24} />,
      title: "Customer Partnership",
      description: "We build lasting relationships with our customers, working together to meet their specific needs."
    },
    {
      icon: <Zap size={24} />,
      title: "Innovation",
      description: "We continuously develop new solutions to address evolving packaging challenges and opportunities."
    },
    {
      icon: <Heart size={24} />,
      title: "Community Engagement",
      description: "We actively contribute to the communities where we operate, supporting local initiatives and causes."
    },
    {
      icon: <Scale size={24} />,
      title: "Integrity",
      description: "We conduct business ethically and honestly, fostering trust with all stakeholders."
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="section-title">Our Mission & Values</h2>
          <p className="text-gray-700">
            Our mission is to empower businesses with innovative, sustainable packaging solutions that enhance their brand, 
            protect their products, and delight their customers. This mission is guided by our core values:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value, index) => (
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionValues;
