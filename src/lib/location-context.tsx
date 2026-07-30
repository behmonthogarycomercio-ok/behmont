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
  declineZone: () => void;
};

const LocationContext = createContext<LocationContextType | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ZoneState>({ city: null, allowed: null });
  const [showPrompt, setShowPrompt] = useState(false);

  // La confirmación de ubicación se pide siempre que se entra al sitio --
  // no se guarda entre visitas (ni localStorage ni sessionStorage), así que
  // una carga nueva de la página siempre vuelve a preguntar.
  useEffect(() => {
    const timer = setTimeout(() => setShowPrompt(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  function setZone(city: string, allowed: boolean) {
    setState({ city, allowed });
    setShowPrompt(false);
  }

  function clearZone() {
    setState({ city: null, allowed: null });
    setShowPrompt(true);
  }

  // Confirmar la ubicación es obligatorio -- no hay forma de cerrar el
  // cartel sin responder (ni X, ni click afuera). La única salida sin
  // elegir una zona puntual es declineZone, que igual guarda una respuesta
  // (para esta visita: el visitante confirmó que no está en ninguna zona
  // con financiación).
  function declineZone() {
    setState({ city: null, allowed: false });
    setShowPrompt(false);
  }

  return (
    <LocationContext.Provider value={{ ...state, setZone, clearZone, showPrompt, declineZone }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error('useLocation must be used within LocationProvider');
  return ctx;
}
