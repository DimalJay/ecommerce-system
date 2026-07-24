export interface HeroItem {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  price: number;
  rating: string;
  reviewsCount: number;
  image: string;
  color: string;
  swatches: string[];
}

export const HERO_FEATURED: HeroItem[] = [
  {
    id: 1,
    badge: 'NEW SEASON 2026',
    title: 'Aether Shell Anorak',
    subtitle: 'Arctic White • Crystalline 3-Layer Nano-Weave',
    price: 495.00,
    rating: '4.9',
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
    color: 'ARCTIC WHITE',
    swatches: ['#e2e8f0', '#0f172a', '#93c5fd']
  },
  {
    id: 6,
    badge: 'LIMITED RELEASE',
    title: 'Sub-Zero Insulated Parka',
    subtitle: 'Glacier Navy • Thermo-Lock Down Core',
    price: 650.00,
    rating: '5.0',
    reviewsCount: 41,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=80',
    color: 'GLACIER NAVY',
    swatches: ['#026597', '#0f172a', '#94a3b8']
  },
  {
    id: 2,
    badge: 'PERFORMANCE BOTTOMS',
    title: 'Stratus Technical Cargo Pant',
    subtitle: 'Pale Slate • Ergonomic Seam Articulation',
    price: 280.00,
    rating: '4.8',
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
    color: 'PALE SLATE',
    swatches: ['#cbd5e1', '#334155']
  }
];
