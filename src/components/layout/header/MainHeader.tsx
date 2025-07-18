
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
    <div className="bg-white shadow-md py-2 sm:py-3 md:py-4">
      <div className="container flex justify-between items-center gap-2 sm:gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <h1 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-corporate leading-tight">
            <span className="text-kraft-dark">PAPER</span>{' '}
            <span className="hidden xs:inline">PACKAGING</span>{' '}
            <span className="hidden sm:inline">COMPANY</span>
            <span className="xs:hidden">PKG</span>
          </h1>
        </Link>

        {/* Search Bar - hidden on mobile */}
        <div className="hidden lg:flex relative flex-grow max-w-md mx-4">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="pl-10 pr-4 py-2 w-full border rounded-md text-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* User Actions */}
          <UserActions cartItemCount={cartItemCount} setAuthModalOpen={setAuthModalOpen} />

          {/* Mobile menu button */}
          <Button 
            onClick={toggleMobileMenu} 
            variant="ghost" 
            className="lg:hidden p-2 min-h-[44px] min-w-[44px]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
