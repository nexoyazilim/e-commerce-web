import { create } from 'zustand';
import productsData from '@/data/products.json';
import type { Product } from '@/types';

interface ProductsStore {
  products: Product[];
  productsMap: Map<string, Product>;
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
}

export const useProductsStore = create<ProductsStore>()((set, get) => {
  const products = productsData as Product[];
  const productsMap = new Map(products.map(p => [p.id, p]));
  
  return {
    products,
    productsMap,
    getProductById: (id: string) => get().productsMap.get(id),
    getProductBySlug: (slug: string) => get().products.find(p => p.slug === slug),
  };
});

