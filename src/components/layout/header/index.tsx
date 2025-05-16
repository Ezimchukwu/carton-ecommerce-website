
import React, { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import TopBar from './TopBar';
import MainHeader from './MainHeader';
import NavigationBar from './NavigationBar';
import MobileMenu from './MobileMenu';
import MegaMenu from '../MegaMenu';
import AuthModal from '@/components/auth/AuthModal';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { items } = useCart();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (megaMenuOpen) setMegaMenuOpen(false);
  };
  
  const toggleMegaMenu = () => {
    setMegaMenuOpen(!megaMenuOpen);
  };

  return (
    <header className="relative z-50">
      {/* Top Bar */}
      <TopBar />

      {/* Main Header */}
      <MainHeader 
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        cartItemCount={cartItemCount}
        setAuthModalOpen={setAuthModalOpen}
      />
      
      {/* Navigation Bar */}
      <NavigationBar />
      
      {/* Mega Menu */}
      {megaMenuOpen && <MegaMenu onClose={() => setMegaMenuOpen(false)} />}
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenu 
          toggleMobileMenu={toggleMobileMenu}
          cartItemCount={cartItemCount}
          setAuthModalOpen={setAuthModalOpen}
        />
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  );
};

export default Header;
