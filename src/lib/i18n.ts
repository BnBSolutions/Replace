import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ro from '@/i18n/ro.json';
import ru from '@/i18n/ru.json';
import en from '@/i18n/en.json';

export type Locale = 'ro' | 'ru' | 'en';

export const LOCALES: Locale[] = ['ro', 'ru', 'en'];

export const LOCALE_NAMES: Record<Locale, string> = {
  ro: 'RO',
  ru: 'РУ',
  en: 'EN',
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ro: { translation: ro },
      ru: { translation: ru },
      en: { translation: en },
    },
    lng: 'ro', // default
    fallbackLng: 'ro',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

// Get locale from URL path
export function getLocaleFromPath(pathname: string): Locale {
  const firstSegment = pathname.split('/')[1];
  if (LOCALES.includes(firstSegment as Locale)) {
    return firstSegment as Locale;
  }
  return 'ro';
}

// Convert path to localized path
export function localizePathname(pathname: string, locale: Locale): string {
  const currentLocale = getLocaleFromPath(pathname);
  
  // Remove current locale prefix
  let cleanPath = pathname;
  if (LOCALES.includes(currentLocale)) {
    cleanPath = pathname.replace(`/${currentLocale}`, '');
  }
  
  // Add new locale prefix
  if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`;
  return `/${locale}${cleanPath}`;
}

// Get stored locale preference
export function getStoredLocale(): Locale {
  const stored = localStorage.getItem('preferred-locale');
  if (stored && LOCALES.includes(stored as Locale)) {
    return stored as Locale;
  }
  return 'ro';
}

// Store locale preference
export function storeLocale(locale: Locale): void {
  localStorage.setItem('preferred-locale', locale);
}
