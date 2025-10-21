import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { getLocaleFromPath } from '@/lib/i18n';
export function Footer() {
  const {
    t
  } = useTranslation();
  const location = useLocation();
  const currentLocale = getLocaleFromPath(location.pathname);
  return <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-4">GSM Service</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Reparații profesionale și accesorii originale pentru dispozitivele tale. 
              Diagnostic gratuit și garanție 6 luni.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/37360000000" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('nav.service')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={`/${currentLocale}/services`} className="text-muted-foreground hover:text-primary transition-colors">
                  Servicii
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/prices`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.prices')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/gallery`} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/reserve`} className="text-muted-foreground hover:text-primary transition-colors">
                  Rezervă reparația
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('nav.shop')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={`/${currentLocale}/shop/category/huse`} className="text-muted-foreground hover:text-primary transition-colors">
                  Huse
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/shop/category/sticla`} className="text-muted-foreground hover:text-primary transition-colors">
                  Sticlă & Folii
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/shop/category/incarcare`} className="text-muted-foreground hover:text-primary transition-colors">
                  Încărcare
                </Link>
              </li>
              <li>
                <Link to={`/${currentLocale}/shop/category/audio`} className="text-muted-foreground hover:text-primary transition-colors">
                  Audio
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('nav.contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 shrink-0 text-primary" />
                <span>str. Ștefan cel Mare, Chișinău</span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-5 h-5 shrink-0 text-primary" />
                <a href="tel:+37360000000" className="text-muted-foreground hover:text-primary transition-colors">
                  +373 60 000 000
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="w-5 h-5 shrink-0 text-primary" />
                <a href="mailto:info@gsmservice.md" className="text-muted-foreground hover:text-primary transition-colors">info@gmail.com</a>
              </li>
            </ul>
            <div className="mt-4 text-sm text-muted-foreground">
              <p className="font-medium">Program:</p>
              <p>Luni - Vineri: 09:00 - 19:00</p>
              <p>Sâmbătă: 10:00 - 17:00</p>
              <p>Duminică: Închis</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2025 GSM Service. {t('footer.rights')}.</p>
          <div className="flex gap-6">
            <Link to={`/${currentLocale}/legal/terms`} className="hover:text-primary transition-colors">
              {t('footer.terms')}
            </Link>
            <Link to={`/${currentLocale}/legal/privacy`} className="hover:text-primary transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to={`/${currentLocale}/warranty`} className="hover:text-primary transition-colors">
              {t('footer.warranty')}
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}