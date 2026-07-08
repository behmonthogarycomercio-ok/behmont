'use client';

import { CartProvider } from '@/lib/cart-context';
import { FavoritesProvider } from '@/lib/favorites-context';
import { LocationProvider } from '@/lib/location-context';
import ZonePrompt from '@/components/ZonePrompt';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocationProvider>
      <CartProvider>
        <FavoritesProvider>
          {children}
          <ZonePrompt />
        </FavoritesProvider>
      </CartProvider>
    </LocationProvider>
  );
}
