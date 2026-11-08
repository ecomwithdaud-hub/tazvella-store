export type ProductCategory = 'all' | 'life' | 'finances' | 'pets';

export interface ProductBadge {
  text: string;
  variant: 'rose' | 'sage' | 'caramel' | 'lavender' | 'default';
}

export interface ProductFeature {
  title: string;
  description: string;
  iconName?: string;
}

export interface ProductMockupTab {
  id: string;
  label: string;
  image: string;
  description: string;
}

export interface ProductReview {
  id: string;
  author: string;
  handle?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  avatarUrl?: string;
  productTitle?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'life' | 'finances' | 'pets';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badges: ProductBadge[];
  thumbnail: string;
  gallery: string[];
  description: string;
  longDescription: string[];
  whatsIncluded: string[];
  features: ProductFeature[];
  compatibility: ('notion' | 'goodnotes' | 'sheets' | 'canva' | 'printable' | 'excel')[];
  mockupTabs?: ProductMockupTab[];
  isFeatured?: boolean;
  isBestseller?: boolean;
  salesCount?: string;
  instantDownloadNotes: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColorway?: string;
}

export interface Currency {
  code: 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD';
  symbol: string;
  rate: number; // relative to USD
}
