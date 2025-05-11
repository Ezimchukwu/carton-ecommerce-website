
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
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold mb-4">Admin Tools</h2>
          <div className="flex gap-4">
            {adminLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
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
