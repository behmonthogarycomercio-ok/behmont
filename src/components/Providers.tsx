'use client';

import { CartProvider } from '@/lib/cart-context';
import { FavoritesProvider } from '@/lib/favorites-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </CartProvider>
  );
}
