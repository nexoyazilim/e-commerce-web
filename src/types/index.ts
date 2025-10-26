export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  brand: string;
  categoryId: string;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  badges?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  parentId?: string;
}

export interface CartItem {
  productId: string;
  variantKey: string;
  color: string;
  size: string;
  quantity: number;
}

export interface FilterState {
  category?: string;
  priceRange?: [number, number];
  brands?: string[];
  colors?: string[];
  sizes?: string[];
  rating?: number;
  sortBy?: string;
  viewMode?: 'grid' | 'list';
}

export interface Order {
  id: string;
  date: string;
  items: Array<{
    productId: string;
    title: string;
    quantity: number;
    price: number;
    image: string;
    variantKey: string;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
}

