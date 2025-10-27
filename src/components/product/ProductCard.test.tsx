import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import type { Product } from '@/types';

const mockProduct: Product = {
  id: '1',
  title: 'Test Product',
  slug: 'test-product',
  description: 'A test product',
  price: 999,
  oldPrice: 1299,
  rating: 4.5,
  reviewCount: 10,
  brand: 'Test Brand',
  categoryId: 'test-category',
  inStock: true,
  images: ['https://via.placeholder.com/300'],
  badges: ['New'],
  colors: ['Red', 'Blue'],
  sizes: ['S', 'M', 'L'],
};

describe('ProductCard', () => {
  it('renders product title', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('renders product price', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('999₺')).toBeInTheDocument();
  });

  it('renders old price when provided', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('1299₺')).toBeInTheDocument();
  });

  it('renders product image', () => {
    render(<ProductCard product={mockProduct} />);
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    // OptimizedImage uses data-src for lazy loading
    expect(image).toHaveAttribute('data-src', 'https://via.placeholder.com/300');
  });
});

