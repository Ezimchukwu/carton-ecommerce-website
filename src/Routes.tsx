
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
import NotFound from '@/pages/NotFound';
import Index from '@/pages/Index';
import MyOrdersPage from '@/pages/MyOrdersPage';
import MyProfilePage from '@/pages/MyProfilePage';
import AdminDashboard from '@/pages/AdminDashboard';
import POSDashboard from '@/pages/POSDashboard';
import InventoryPage from '@/pages/InventoryPage';
import PosSalesPage from '@/pages/PosSalesPage';

// Import category pages
import PizzaBoxesPage from '@/pages/categories/PizzaBoxesPage';
import MailerBoxesPage from '@/pages/categories/MailerBoxesPage';
import CargoBoxesPage from '@/pages/categories/CargoBoxesPage';
import WrappingPapersPage from '@/pages/categories/WrappingPapersPage';
import GiftBagsPage from '@/pages/categories/GiftBagsPage';
import AdhesivesPage from '@/pages/categories/AdhesivesPage';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Index />} />
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
      
      {/* Admin & POS Pages */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/pos" element={<POSDashboard />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/pos-sales" element={<PosSalesPage />} />
      
      {/* Product Category Pages */}
      <Route path="/categories/pizza-boxes" element={<PizzaBoxesPage />} />
      <Route path="/categories/mailer-boxes" element={<MailerBoxesPage />} />
      <Route path="/categories/cargo-boxes" element={<CargoBoxesPage />} />
      <Route path="/categories/wrapping-papers" element={<WrappingPapersPage />} />
      <Route path="/categories/gift-bags" element={<GiftBagsPage />} />
      <Route path="/categories/adhesives" element={<AdhesivesPage />} />
      
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
