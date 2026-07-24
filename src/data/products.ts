import type { Product } from '../components/ProductCard';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Aether Shell Anorak',
    category: 'outerwear',
    colorName: 'ARCTIC WHITE',
    price: 495.00,
    oldPrice: 580.00,
    rating: 4.9,
    reviewsCount: 84,
    discount: 'NEW SEASON',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80',
    isNew: true,
    swatches: ['#e2e8f0', '#0f172a', '#93c5fd']
  },
  {
    id: 2,
    title: 'Stratus Technical Cargo Pant',
    category: 'pants',
    colorName: 'PALE SLATE',
    price: 280.00,
    rating: 4.8,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
    swatches: ['#cbd5e1', '#334155']
  },
  {
    id: 3,
    title: 'Glacier Expedition Daypack',
    category: 'outerwear',
    colorName: 'ARCTIC WHITE',
    price: 195.00,
    oldPrice: 230.00,
    rating: 4.9,
    reviewsCount: 110,
    discount: '-15%',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    swatches: ['#f8fafc', '#026597']
  },
  {
    id: 4,
    title: 'Thermal Core Base Layer Tee',
    category: 'baselayers',
    colorName: 'ICE BLUE',
    price: 110.00,
    rating: 4.7,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    isNew: true,
    swatches: ['#bae6fd', '#e2e8f0', '#0f172a']
  },
  {
    id: 5,
    title: 'Apex Trail Runner V2',
    category: 'footwear',
    colorName: 'WHITE / FROST',
    price: 220.00,
    oldPrice: 260.00,
    rating: 4.9,
    reviewsCount: 96,
    discount: '-15%',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    swatches: ['#e0f2fe', '#f1f5f9']
  },
  {
    id: 6,
    title: 'Sub-Zero Insulated Parka',
    category: 'outerwear',
    colorName: 'GLACIER NAVY',
    price: 650.00,
    oldPrice: 720.00,
    rating: 5.0,
    reviewsCount: 41,
    discount: 'LIMITED',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80',
    isNew: true,
    swatches: ['#026597', '#0f172a', '#94a3b8']
  }
];
