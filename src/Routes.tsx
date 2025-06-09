
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
      <Route path="/" element={<Layout><Index /></Layout>} />
      <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      <Route path="/wholesale" element={<Layout><WholesalePage /></Layout>} />
      <Route path="/custom-printing" element={<Layout><CustomPrintingPage /></Layout>} />
      <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
      <Route path="/product/:slug" element={<Layout><ProductDetailPage /></Layout>} />
      <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
      <Route path="/order-confirmation" element={<Layout><OrderConfirmationPage /></Layout>} />
      <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
      <Route path="/blog/:id" element={<Layout><BlogPostPage /></Layout>} />
      
      {/* User Account Pages */}
      <Route path="/orders" element={<Layout><MyOrdersPage /></Layout>} />
      <Route path="/profile" element={<Layout><MyProfilePage /></Layout>} />
      
      {/* Admin & POS Pages */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/pos" element={<POSDashboard />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/pos-sales" element={<PosSalesPage />} />
      
      {/* Product Category Pages */}
      <Route path="/categories/pizza-boxes" element={<Layout><PizzaBoxesPage /></Layout>} />
      <Route path="/categories/mailer-boxes" element={<Layout><MailerBoxesPage /></Layout>} />
      <Route path="/categories/cargo-boxes" element={<Layout><CargoBoxesPage /></Layout>} />
      <Route path="/categories/wrapping-papers" element={<Layout><WrappingPapersPage /></Layout>} />
      <Route path="/categories/gift-bags" element={<Layout><GiftBagsPage /></Layout>} />
      <Route path="/categories/adhesives" element={<Layout><AdhesivesPage /></Layout>} />
      
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </RouterRoutes>
  );
};

export default Routes;
