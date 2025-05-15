
import { Routes as RouterRoutes, Route } from 'react-router-dom';
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
      
      {/* POS and Inventory Management Routes */}
      <Route path="/pos" element={<Layout><POSDashboard /></Layout>} />
      <Route path="/pos/sales" element={<Layout><PosSalesPage /></Layout>} />
      <Route path="/admin/pos" element={<Layout><POSDashboard /></Layout>} />
      <Route path="/pos-dashboard" element={<Layout><POSDashboard /></Layout>} />
      <Route path="/admin/inventory" element={<Layout><InventoryPage /></Layout>} />
      
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
