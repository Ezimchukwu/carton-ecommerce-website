
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Menu, 
  X,
  Phone
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import MegaMenu from './MegaMenu';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (megaMenuOpen) setMegaMenuOpen(false);
  };
  
  const toggleMegaMenu = () => {
    setMegaMenuOpen(!megaMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="relative z-50">
      {/* Top Bar */}
      <div className="bg-corporate text-white py-2">
        <div className="container flex justify-between items-center">
          <div className="flex items-center">
            <Phone size={16} className="mr-2" />
            <span className="text-sm">Call Us: (555) 123-4567</span>
          </div>
          <div className="text-sm">
            <Link to="/track-order" className="mr-4 hover:underline">Track Order</Link>
            <Link to="/support" className="hover:underline">Support</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-md py-4">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold text-corporate">
              <span className="text-kraft-dark">Carton</span>Craft
            </h1>
          </Link>

          {/* Search Bar - hidden on mobile */}
          <div className="hidden md:flex relative flex-grow max-w-md mx-4">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 pr-4 py-2 w-full border rounded-md"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/account" className="flex flex-col items-center text-sm text-gray-700 hover:text-corporate transition-colors">
              <User size={20} />
              <span>Account</span>
            </Link>
            <Link to="/wishlist" className="flex flex-col items-center text-sm text-gray-700 hover:text-corporate transition-colors">
              <Heart size={20} />
              <span>Wishlist</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-sm text-gray-700 hover:text-corporate transition-colors">
              <div className="relative">
                <ShoppingCart size={20} />
                <Badge className="absolute -top-2 -right-2 bg-corporate text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">0</Badge>
              </div>
              <span>Cart</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button 
            onClick={toggleMobileMenu} 
            variant="ghost" 
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <nav className="bg-kraft-light py-2 hidden md:block">
        <div className="container">
          <ul className="flex items-center justify-between">
            <li>
              <Button 
                variant="ghost" 
                onClick={toggleMegaMenu}
                className={`text-corporate-dark font-medium ${megaMenuOpen ? 'bg-kraft' : ''}`}
              >
                All Categories
              </Button>
            </li>
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
      
      {/* Mega Menu */}
      {megaMenuOpen && <MegaMenu onClose={() => setMegaMenuOpen(false)} />}
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white h-full w-4/5 max-w-sm overflow-y-auto animate-fade-in">
            <div className="p-4">
              <div className="flex justify-between mb-6">
                <h2 className="text-lg font-bold">Menu</h2>
                <Button variant="ghost" onClick={toggleMobileMenu}>
                  <X size={24} />
                </Button>
              </div>
              
              {/* Search */}
              <div className="relative mb-6">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 w-full border rounded-md"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              {/* Mobile Navigation Links */}
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="block py-2 text-corporate-dark font-medium" onClick={toggleMobileMenu}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="block py-2 text-corporate-dark font-medium" onClick={toggleMobileMenu}>
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/custom-printing" className="block py-2 text-corporate-dark font-medium" onClick={toggleMobileMenu}>
                    Custom Printing
                  </Link>
                </li>
                <li>
                  <Link to="/wholesale" className="block py-2 text-corporate-dark font-medium" onClick={toggleMobileMenu}>
                    Wholesale
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="block py-2 text-corporate-dark font-medium" onClick={toggleMobileMenu}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="block py-2 text-corporate-dark font-medium" onClick={toggleMobileMenu}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="block py-2 text-corporate-dark font-medium" onClick={toggleMobileMenu}>
                    Blog
                  </Link>
                </li>
              </ul>
              
              <hr className="my-4" />
              
              {/* Mobile Action Buttons */}
              <div className="flex justify-around">
                <Link to="/account" className="flex flex-col items-center text-sm text-gray-700" onClick={toggleMobileMenu}>
                  <User size={20} />
                  <span>Account</span>
                </Link>
                <Link to="/wishlist" className="flex flex-col items-center text-sm text-gray-700" onClick={toggleMobileMenu}>
                  <Heart size={20} />
                  <span>Wishlist</span>
                </Link>
                <Link to="/cart" className="flex flex-col items-center text-sm text-gray-700" onClick={toggleMobileMenu}>
                  <div className="relative">
                    <ShoppingCart size={20} />
                    <Badge className="absolute -top-2 -right-2 bg-corporate text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">0</Badge>
                  </div>
                  <span>Cart</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
