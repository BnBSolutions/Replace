import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Phone, MessageCircle, ShoppingCart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import { useUIStore } from '@/store/ui';
import { LOCALES, LOCALE_NAMES, getLocaleFromPath, localizePathname } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
export function Header() {
  const {
    t,
    i18n
  } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useCartStore(state => state.getItemCount());
  const {
    mobileMenuOpen,
    setMobileMenuOpen,
    setCartOpen
  } = useUIStore();
  const currentLocale = getLocaleFromPath(location.pathname);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleLanguageSwitch = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    const newPath = localizePathname(location.pathname, newLocale);
    i18n.changeLanguage(newLocale);
    localStorage.setItem('preferred-locale', newLocale);
    navigate(newPath);
  };
  const isActive = (path: string) => {
    const cleanPath = location.pathname.replace(`/${currentLocale}`, '') || '/';
    return cleanPath === path || cleanPath.startsWith(path + '/');
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={`/${currentLocale}`} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl hidden sm:block">Replace</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to={`/${currentLocale}`} className={`link-underline ${isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
              {t('nav.service')}
            </Link>
            <Link to={`/${currentLocale}/shop`} className={`link-underline ${isActive('/shop') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
              {t('nav.shop')}
            </Link>
            <Link to={`/${currentLocale}/prices`} className={`link-underline ${isActive('/prices') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
              {t('nav.prices')}
            </Link>
            <Link to={`/${currentLocale}/gallery`} className={`link-underline ${isActive('/gallery') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
              {t('nav.gallery')}
            </Link>
            <Link to={`/${currentLocale}/about`} className={`link-underline ${isActive('/about') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
              {t('nav.about')}
            </Link>
            <Link to={`/${currentLocale}/contact`} className={`link-underline ${isActive('/contact') ? 'text-primary' : 'text-foreground hover:text-primary'}`}>
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="hidden sm:flex items-center gap-1 bg-secondary rounded-lg p-1">
              {LOCALES.map(locale => <button key={locale} onClick={() => handleLanguageSwitch(locale)} className={`px-3 py-1 rounded text-sm font-medium transition-colors ${currentLocale === locale ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  {LOCALE_NAMES[locale]}
                </button>)}
            </div>

            {/* Quick Actions */}
            <a href="tel:+37360000000" className="hidden md:flex">
              <Button variant="ghost" size="icon">
                <Phone className="w-5 h-5" />
              </Button>
            </a>
            <a href="https://wa.me/37360000000" target="_blank" rel="noopener noreferrer" className="hidden md:flex">
              <Button variant="ghost" size="icon">
                <MessageCircle className="w-5 h-5" />
              </Button>
            </a>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="lg:hidden bg-background border-t border-border">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              <Link to={`/${currentLocale}`} className="py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.service')}
              </Link>
              <Link to={`/${currentLocale}/shop`} className="py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.shop')}
              </Link>
              <Link to={`/${currentLocale}/prices`} className="py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.prices')}
              </Link>
              <Link to={`/${currentLocale}/gallery`} className="py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.gallery')}
              </Link>
              <Link to={`/${currentLocale}/about`} className="py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.about')}
              </Link>
              <Link to={`/${currentLocale}/contact`} className="py-2 hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {t('nav.contact')}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2 pt-3 border-t border-border">
                {LOCALES.map(locale => <button key={locale} onClick={() => {
              handleLanguageSwitch(locale);
              setMobileMenuOpen(false);
            }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentLocale === locale ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                    {LOCALE_NAMES[locale]}
                  </button>)}
              </div>
            </nav>
          </motion.div>}
      </AnimatePresence>
    </header>;
}