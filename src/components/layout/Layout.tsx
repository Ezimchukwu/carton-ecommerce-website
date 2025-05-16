
import React from 'react';
import Header from './header';
import Footer from './Footer';
import AdminNav from './AdminNav';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.includes('/admin') || 
                       location.pathname.includes('/pos') ||
                       location.pathname === '/';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isAdminRoute && <AdminNav />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
