export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'skincare' | 'makeup' | 'haircare' | 'fragrance' | 'body';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  hoverImage: string;
  badge?: 'Bestseller' | 'New Formula' | 'Award Winner' | 'Clean Beauty' | 'Limited Edition';
  isBestseller?: boolean;
  isNew?: boolean;
  description: string;
  activeIngredients: string[];
  volumeOrSize: string;
  shades?: string[];
  skinType: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: 'all' | 'skincare' | 'makeup' | 'haircare' | 'fragrance' | 'body';
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedShade?: string;
}

export type ActiveTab = 'all' | 'bestsellers' | 'skincare' | 'makeup' | 'haircare' | 'fragrance' | 'body' | 'new';
export type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating';

export type AppMode = 'storefront' | 'wireframe' | 'documentation';
export type WireframeDevice = 'desktop' | 'mobile' | 'both';
