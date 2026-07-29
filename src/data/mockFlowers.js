import { mockProducts } from './mockProducts';

export const initialFlowers = mockProducts.filter(p => p.mainCategory === 'Flowers');

