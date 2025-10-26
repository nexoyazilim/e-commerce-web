import { describe, it, expect, vi } from 'vitest';
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
  reviews: 10,
  stock: 100,
  brand: 'Test Brand',
  category: 'Test Category',
  images: ['https://via.placeholder.com/300'],
  badges: ['New'],
  variants: {
    color: ['Red', 'Blue'],
    size: ['S', 'M', 'L'],
  },
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
    expect(image).toHaveAttribute('src', 'https://via.placeholder.com/300');
  });
});

