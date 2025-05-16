
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Search, User, LogOut, Phone, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

interface MobileMenuProps {
  toggleMobileMenu: () => void;
  cartItemCount: number;
  setAuthModalOpen: (open: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  toggleMobileMenu,
  cartItemCount,
  setAuthModalOpen,
}) => {
  const { user, logout } = useAuth();
  const isAuthenticated = !!user;
  
  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    toggleMobileMenu();
  };

  return (
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
          <div className="grid grid-cols-1 gap-4">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="font-medium">{user?.firstName} {user?.lastName}</div>
                <div className="grid grid-cols-1 gap-2">
                  <Link
                    to="/orders"
                    className="text-sm hover:text-corporate"
                    onClick={() => toggleMobileMenu()}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/profile"
                    className="text-sm hover:text-corporate"
                    onClick={() => toggleMobileMenu()}
                  >
                    My Profile
                  </Link>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    handleLogout();
                  }}
                  className="w-full mt-2"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => {
                  toggleMobileMenu();
                  setAuthModalOpen(true);
                }}
              >
                <User size={18} className="mr-2" />
                Login / Sign Up
              </Button>
            )}
            <Link
              to="/checkout"
              className="flex items-center space-x-2 text-sm font-medium text-gray-600"
              onClick={() => toggleMobileMenu()}
            >
              <div className="relative">
                <span className="sr-only">Cart</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-corporate text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </Badge>
                )}
              </div>
              <span>Cart</span>
            </Link>
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-600">
                <Phone size={18} className="text-corporate" />
                <div className="flex flex-col">
                  <a href="tel:+2348125160761" className="hover:text-corporate">08125160761</a>
                  <a href="tel:+2348038855851" className="hover:text-corporate">08038855851</a>
                </div>
              </div>
              <a 
                href="https://wa.me/2348125160761" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-corporate"
              >
                <MessageSquare size={18} className="text-corporate" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
