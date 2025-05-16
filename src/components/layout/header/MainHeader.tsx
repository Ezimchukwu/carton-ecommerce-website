
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, Menu, X } from 'lucide-react';
import UserActions from './UserActions';

interface MainHeaderProps {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  cartItemCount: number;
  setAuthModalOpen: (open: boolean) => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  mobileMenuOpen,
  toggleMobileMenu,
  cartItemCount,
  setAuthModalOpen,
}) => {
  return (
    <div className="bg-white shadow-md py-4">
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-corporate">
            <span className="text-kraft-dark">PAPER</span> PACKAGING COMPANY
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

        {/* User Actions */}
        <UserActions cartItemCount={cartItemCount} setAuthModalOpen={setAuthModalOpen} />

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
  );
};

export default MainHeader;
