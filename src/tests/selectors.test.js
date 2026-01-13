import { describe, it, expect } from 'vitest';
import { selectFilteredProducts, selectFavoriteProducts } from '../store/selectors';

describe('Selectors', () => {
  const mockState = {
    products: {
      items: [
        { id: 1, title: 'Laptop', price: 999, category: 'electronics' },
        { id: 2, title: 'Phone', price: 599, category: 'electronics' },
        { id: 3, title: 'Shirt', price: 29, category: 'clothing' },
        { id: 4, title: 'Headphones', price: 199, category: 'electronics' }
      ]
    },
    filters: {
      search: '',
      category: 'all',
      sort: 'default'
    },
    favorites: []
  };

  describe('selectFilteredProducts', () => {
    it('returns all products when no filters applied', () => {
      const result = selectFilteredProducts(mockState);
      expect(result).toHaveLength(4);
    });

    it('filters products by search term', () => {
      const state = {
        ...mockState,
        filters: { ...mockState.filters, search: 'phone' }
      };
      const result = selectFilteredProducts(state);
      expect(result).toHaveLength(2); // Phone and Headphones
    });

    it('filters products by category', () => {
      const state = {
        ...mockState,
        filters: { ...mockState.filters, category: 'electronics' }
      };
      const result = selectFilteredProducts(state);
      expect(result).toHaveLength(3);
      expect(result.every(p => p.category === 'electronics')).toBe(true);
    });

    it('sorts products by price ascending', () => {
      const state = {
        ...mockState,
        filters: { ...mockState.filters, sort: 'price-asc' }
      };
      const result = selectFilteredProducts(state);
      expect(result[0].price).toBe(29);
      expect(result[result.length - 1].price).toBe(999);
    });

    it('sorts products by price descending', () => {
      const state = {
        ...mockState,
        filters: { ...mockState.filters, sort: 'price-desc' }
      };
      const result = selectFilteredProducts(state);
      expect(result[0].price).toBe(999);
      expect(result[result.length - 1].price).toBe(29);
    });

    it('applies multiple filters correctly', () => {
      const state = {
        ...mockState,
        filters: {
          search: 'phone',
          category: 'electronics',
          sort: 'price-asc'
        }
      };
      const result = selectFilteredProducts(state);
      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Headphones');
      expect(result[1].title).toBe('Phone');
    });
  });

  describe('selectFavoriteProducts', () => {
    it('returns empty array when no favorites', () => {
      const result = selectFavoriteProducts(mockState);
      expect(result).toEqual([]);
    });

    it('returns only favorited products', () => {
      const state = {
        ...mockState,
        favorites: [1, 3]
      };
      const result = selectFavoriteProducts(state);
      expect(result).toHaveLength(2);
      expect(result.map(p => p.id)).toEqual([1, 3]);
    });
  });
});
