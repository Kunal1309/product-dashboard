import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../components/ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    image: 'test.jpg',
    category: 'electronics'
  };

  it('renders product information correctly', () => {
    const onToggleFavorite = vi.fn();
    const onViewDetails = vi.fn();

    render(
      <ProductCard
        product={mockProduct}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
        onViewDetails={onViewDetails}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('electronics')).toBeInTheDocument();
  });

  it('calls onToggleFavorite when favorite button is clicked', () => {
    const onToggleFavorite = vi.fn();
    const onViewDetails = vi.fn();

    render(
      <ProductCard
        product={mockProduct}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
        onViewDetails={onViewDetails}
      />
    );

    const favoriteButton = screen.getByLabelText('Add to favorites');
    fireEvent.click(favoriteButton);
    expect(onToggleFavorite).toHaveBeenCalledWith(1);
  });

  it('calls onViewDetails when view details button is clicked', () => {
    const onToggleFavorite = vi.fn();
    const onViewDetails = vi.fn();

    render(
      <ProductCard
        product={mockProduct}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
        onViewDetails={onViewDetails}
      />
    );

    fireEvent.click(screen.getByText('View Details'));
    expect(onViewDetails).toHaveBeenCalledWith(1);
  });

  it('shows correct favorite button text based on isFavorite prop', () => {
    const onToggleFavorite = vi.fn();
    const onViewDetails = vi.fn();

    const { rerender } = render(
      <ProductCard
        product={mockProduct}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
        onViewDetails={onViewDetails}
      />
    );

    expect(screen.getByLabelText('Add to favorites')).toBeInTheDocument();

    rerender(
      <ProductCard
        product={mockProduct}
        isFavorite={true}
        onToggleFavorite={onToggleFavorite}
        onViewDetails={onViewDetails}
      />
    );

    expect(screen.getByLabelText('Remove from favorites')).toBeInTheDocument();
  });
});
