'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type ZoneState = {
  city: string | null;
  allowed: boolean | null; // null = not yet set
};

type LocationContextType = ZoneState & {
  setZone: (city: string, allowed: boolean) => void;
  clearZone: () => void;
  showPrompt: boolean;
  dismissPrompt: () => void;
};

const LocationContext = createContext<LocationContextType | null>(null);

const STORAGE_KEY = 'behmont_zone_v1';

export function LocationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ZoneState>({ city: null, allowed: null });
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ZoneState;
        setState(parsed);
      } catch {
        setShowPrompt(true);
      }
    } else {
      const timer = setTimeout(() => setShowPrompt(true), 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  function setZone(city: string, allowed: boolean) {
    const next: ZoneState = { city, allowed };
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setShowPrompt(false);
  }

  function clearZone() {
    setState({ city: null, allowed: null });
    localStorage.removeItem(STORAGE_KEY);
    setShowPrompt(true);
  }

  function dismissPrompt() {
    const next: ZoneState = { city: null, allowed: false };
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setShowPrompt(false);
  }

  return (
    <LocationContext.Provider value={{ ...state, setZone, clearZone, showPrompt, dismissPrompt }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocation must be used within LocationProvider');
  return ctx;
}
