
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationBar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-kraft-light py-2 hidden md:block">
      <div className="container">
        <ul className="flex items-center justify-between">
          <li>
            <Link to="/" className={`px-4 py-2 font-medium ${isActive('/') ? 'text-corporate' : 'text-corporate-dark hover:text-corporate'}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className={`px-4 py-2 font-medium ${isActive('/products') ? 'text-corporate' : 'text-corporate-dark hover:text-corporate'}`}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/custom-printing" className={`px-4 py-2 font-medium ${isActive('/custom-printing') ? 'text-corporate' : 'text-corporate-dark hover:text-corporate'}`}>
              Custom Printing
            </Link>
          </li>
          <li>
            <Link to="/wholesale" className={`px-4 py-2 font-medium ${isActive('/wholesale') ? 'text-corporate' : 'text-corporate-dark hover:text-corporate'}`}>
              Wholesale
            </Link>
          </li>
          <li>
            <Link to="/about" className={`px-4 py-2 font-medium ${isActive('/about') ? 'text-corporate' : 'text-corporate-dark hover:text-corporate'}`}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className={`px-4 py-2 font-medium ${isActive('/contact') ? 'text-corporate' : 'text-corporate-dark hover:text-corporate'}`}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/blog" className={`px-4 py-2 font-medium ${isActive('/blog') ? 'text-corporate' : 'text-corporate-dark hover:text-corporate'}`}>
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
