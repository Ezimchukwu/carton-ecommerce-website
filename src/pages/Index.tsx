
import React from 'react';
import HomePage from './HomePage';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  // Add admin navigation links
  const adminLinks = [
    { name: 'POS Dashboard', path: '/admin/pos' },
    { name: 'Inventory Management', path: '/admin/inventory' },
  ];

  return (
    <div>
      <HomePage />
      
      {/* Admin Links Section */}
      <div className="bg-gray-100 py-8 mt-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Tools</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-md"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
