import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import MobileBottomNav from './components/MobileBottomNav';

// Pages
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import TrackOrderPage from './pages/TrackOrderPage';
import ReturnsPage from './pages/ReturnsPage';
import ProfilePage from './pages/ProfilePage';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';

// Auto-scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Storefront layout shell
function StoreLayout({ children }) {
  const { isAuthModalOpen, setIsAuthModalOpen } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-[#e12d2d] selection:text-white">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />

      {/* Mobile Sticky Bottom App Navigation */}
      <MobileBottomNav />

      {/* Global Slide-over Bag Drawer */}
      <CartDrawer />

      {/* Global Auth / Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Storefront Routes */}
          <Route path="/" element={<StoreLayout><HomePage /></StoreLayout>} />
          <Route path="/products" element={<StoreLayout><ProductListPage /></StoreLayout>} />
          <Route path="/product/:id" element={<StoreLayout><ProductDetailPage /></StoreLayout>} />
          <Route path="/cart" element={<StoreLayout><CartPage /></StoreLayout>} />
          <Route path="/checkout" element={<StoreLayout><CheckoutPage /></StoreLayout>} />
          <Route path="/order-confirmation/:orderId" element={<StoreLayout><OrderConfirmationPage /></StoreLayout>} />
          <Route path="/track-order" element={<StoreLayout><TrackOrderPage /></StoreLayout>} />
          <Route path="/returns" element={<StoreLayout><ReturnsPage /></StoreLayout>} />
          <Route path="/profile" element={<StoreLayout><ProfilePage /></StoreLayout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<StoreLayout><HomePage /></StoreLayout>} />
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  );
}
