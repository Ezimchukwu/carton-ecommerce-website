
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import WholesalePage from '@/pages/WholesalePage';
import CustomPrintingPage from '@/pages/CustomPrintingPage';
import ProductsPage from '@/pages/ProductsPage';
import CheckoutPage from '@/pages/CheckoutPage';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import POSDashboard from '@/pages/POSDashboard';
import PosSalesPage from '@/pages/PosSalesPage';
import NotFound from '@/pages/NotFound';
import InventoryPage from '@/pages/InventoryPage';
import Index from '@/pages/Index';
import AdminLogin from '@/pages/AdminLogin';
import MyOrdersPage from '@/pages/MyOrdersPage';
import MyProfilePage from '@/pages/MyProfilePage';
import { useEffect, useState } from 'react';

// Import category pages
import PizzaBoxesPage from '@/pages/categories/PizzaBoxesPage';
import MailerBoxesPage from '@/pages/categories/MailerBoxesPage';
import CargoBoxesPage from '@/pages/categories/CargoBoxesPage';
import WrappingPapersPage from '@/pages/categories/WrappingPapersPage';
import GiftBagsPage from '@/pages/categories/GiftBagsPage';
import AdhesivesPage from '@/pages/categories/AdhesivesPage';

// Admin authentication
const isAdmin = () => {
  // In a real app, you'd check against a server-side authentication system
  // For now, we'll use localStorage as a simple demonstration
  return localStorage.getItem('isAdminAuthenticated') === 'true';
};

// Protected Route component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if the user is an admin
    const adminStatus = isAdmin();
    setIsAuthenticated(adminStatus);
    setIsChecking(false);
  }, []);
  
  if (isChecking) {
    return <Layout><div className="container mx-auto p-8">Checking authentication...</div></Layout>;
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/admin/login" replace />
  );
};

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Layout><Index /></Layout>} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/wholesale" element={<WholesalePage />} />
      <Route path="/custom-printing" element={<CustomPrintingPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:slug" element={<ProductDetailPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      
      {/* User Account Pages */}
      <Route path="/orders" element={<MyOrdersPage />} />
      <Route path="/profile" element={<MyProfilePage />} />
      
      {/* Product Category Pages */}
      <Route path="/categories/pizza-boxes" element={<PizzaBoxesPage />} />
      <Route path="/categories/mailer-boxes" element={<MailerBoxesPage />} />
      <Route path="/categories/cargo-boxes" element={<CargoBoxesPage />} />
      <Route path="/categories/wrapping-papers" element={<WrappingPapersPage />} />
      <Route path="/categories/gift-bags" element={<GiftBagsPage />} />
      <Route path="/categories/adhesives" element={<AdhesivesPage />} />
      
      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* POS and Inventory Management Routes - Protected for Admin only */}
      <Route path="/pos" element={<AdminRoute><POSDashboard /></AdminRoute>} />
      <Route path="/pos/sales" element={<AdminRoute><PosSalesPage /></AdminRoute>} />
      <Route path="/admin/pos" element={<AdminRoute><POSDashboard /></AdminRoute>} />
      <Route path="/pos-dashboard" element={<AdminRoute><POSDashboard /></AdminRoute>} />
      <Route path="/admin/inventory" element={<AdminRoute><InventoryPage /></AdminRoute>} />
      
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
