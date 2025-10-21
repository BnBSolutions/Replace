import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n, { getLocaleFromPath, getStoredLocale } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import CartDrawer from "@/components/shop/CartDrawer";

// Pages
import ServiceHome from "./pages/service/ServiceHome";
import Services from "./pages/service/Services";
import Prices from "./pages/service/Prices";
import Gallery from "./pages/service/Gallery";
import Reserve from "./pages/service/Reserve";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/shop/Shop";
import Category from "./pages/shop/Category";
import ProductDetail from "./pages/shop/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function LocaleRouter() {
  const location = useLocation();
  
  useEffect(() => {
    const locale = getLocaleFromPath(location.pathname);
    i18n.changeLanguage(locale);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <CartDrawer />
      <main className="min-h-screen pt-16">
        <Routes>
          {/* Redirect root to stored locale */}
          <Route path="/" element={<Navigate to={`/${getStoredLocale()}`} replace />} />
          
          {/* Service Routes */}
          <Route path="/:locale" element={<ServiceHome />} />
          <Route path="/:locale/services" element={<Services />} />
          <Route path="/:locale/prices" element={<Prices />} />
          <Route path="/:locale/gallery" element={<Gallery />} />
          <Route path="/:locale/reserve" element={<Reserve />} />
          <Route path="/:locale/about" element={<About />} />
          <Route path="/:locale/contact" element={<Contact />} />
          
          {/* Shop Routes */}
          <Route path="/:locale/shop" element={<Shop />} />
          <Route path="/:locale/shop/category/:slug" element={<Category />} />
          <Route path="/:locale/shop/product/:slug" element={<ProductDetail />} />
          <Route path="/:locale/cart" element={<Cart />} />
          <Route path="/:locale/checkout" element={<Checkout />} />
          
          {/* Legal Pages - TODO */}
          <Route path="/:locale/legal/terms" element={<NotFound />} />
          <Route path="/:locale/legal/privacy" element={<NotFound />} />
          <Route path="/:locale/warranty" element={<NotFound />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <LocaleRouter />
        </HashRouter>
      </TooltipProvider>
    </I18nextProvider>
  </QueryClientProvider>
);

export default App;
