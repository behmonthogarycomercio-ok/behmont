'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

type FavoritesContextValue = {
  favorites: string[];
  isFavorite: (sku: string) => boolean;
  toggleFavorite: (sku: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const STORAGE_KEY = 'behmont-imp-favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      // localStorage no disponible (SSR / navegación privada) — arranca vacío
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites, hydrated]);

  const isFavorite = useCallback((sku: string) => favorites.includes(sku), [favorites]);

  const toggleFavorite = useCallback((sku: string) => {
    setFavorites((prev) =>
      prev.includes(sku) ? prev.filter((s) => s !== sku) : [...prev, sku]
    );
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites debe usarse dentro de <FavoritesProvider>');
  return ctx;
}
