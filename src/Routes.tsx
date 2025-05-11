
import { Routes as RouterRoutes, Route } from 'react-router-dom';
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

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<HomePage />} />
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
      <Route path="/pos" element={<POSDashboard />} />
      <Route path="/pos/sales" element={<PosSalesPage />} />
      <Route path="/admin/pos" element={<POSDashboard />} />
      <Route path="/pos-dashboard" element={<POSDashboard />} />
      <Route path="/admin/inventory" element={<InventoryPage />} />
      
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
