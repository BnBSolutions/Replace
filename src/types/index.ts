// Money
export type Money = {
  amount: number;
  currency: 'MDL' | 'EUR' | 'USD';
};

// Service Types
export type DeviceBrand = 'Apple' | 'Samsung' | 'Huawei' | 'Xiaomi' | 'OnePlus' | 'Google' | 'Other';

export type IssueCategory = 
  | 'screen'
  | 'battery'
  | 'port'
  | 'camera'
  | 'back-glass'
  | 'water-damage'
  | 'diagnostics'
  | 'other';

export type ServiceTicket = {
  id: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'canceled';
  deviceBrand: string;
  deviceModel: string;
  issue: string;
  issueCategory: IssueCategory;
  slot?: {
    start: string; // ISO date
    end: string;
  };
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  attachments?: Array<{
    url: string;
    type: 'image' | 'pdf';
  }>;
  notes?: string;
  estimatedPrice?: Money;
  createdAt: string;
};

export type ServicePrice = {
  id: string;
  service: string;
  deviceBrand: DeviceBrand;
  deviceModel: string;
  price: Money;
  compareAtPrice?: Money;
  duration: number; // minutes
  warranty: number; // days
  category: IssueCategory;
};

// Shop Types
export type ProductCategory = 
  | 'cases'
  | 'glass'
  | 'charging'
  | 'audio'
  | 'power'
  | 'auto'
  | 'care';

export type Product = {
  id: string;
  slug: string;
  title: string;
  category: ProductCategory;
  price: Money;
  compareAt?: Money;
  images: Array<{
    src: string;
    alt: string;
  }>;
  brand?: string;
  deviceModels?: string[];
  material?: string;
  colorHex?: string;
  magsafe?: boolean;
  stock: number;
  badges?: Array<'new' | 'bestseller' | 'promo'>;
  description?: string;
  features?: string[];
  i18n?: Record<'ro' | 'ru' | 'en', {
    title?: string;
    description?: string;
    features?: string[];
  }>;
};

export type CartLine = {
  productId: string;
  qty: number;
  unitPrice: Money;
  total: Money;
  variantKey?: string;
};

export type FulfillmentMethod = 'pickup' | 'courier';

export type Order = {
  id: string;
  status: 'draft' | 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'canceled';
  lines: CartLine[];
  subtotal: Money;
  deliveryFee: Money;
  discount: Money;
  total: Money;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  fulfillment: {
    method: FulfillmentMethod;
    zone?: string;
    address?: string;
    slot?: {
      start: string;
      end: string;
    };
    mountingIncluded?: boolean;
  };
  payment: {
    method: 'cod' | 'pickup' | 'card_online';
    paid?: boolean;
  };
  createdAt: string;
};

// Testimonial
export type Testimonial = {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  verified?: boolean;
};

// Gallery Item
export type GalleryItem = {
  id: string;
  before: string;
  after: string;
  device: string;
  service: string;
  duration: number; // minutes
};
