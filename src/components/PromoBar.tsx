'use client';

import { useState, useEffect } from 'react';
import { Truck, CreditCard, Phone } from 'lucide-react';

const ITEMS = [
  { icon: Truck,       text: 'Envíos a todo el país por Andreani' },
  { icon: CreditCard,  text: 'Financiación diaria y semanal' },
  { icon: Phone,       text: '+54 345 401-5358 · Concordia, Entre Ríos' },
];

export default function PromoBar() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % ITEMS.length);
        setVisible(true);
      }, 300);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  const item = ITEMS[idx];
  const Icon = item.icon;

  return (
    <div className="bg-[#f59e0b] text-[#0B1C3A]">
      <div className="mx-auto max-w-7xl px-4 h-9 flex items-center justify-between">
        {/* Mensaje rotativo */}
        <div
          className="flex-1 flex items-center justify-center gap-2 text-[13px] font-semibold transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <Icon className="h-3.5 w-3.5 shrink-0" />
          <span>{item.text}</span>
        </div>

        {/* Puntos navegación */}
        <div className="hidden sm:flex gap-1.5 shrink-0">
          {ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="h-1.5 rounded-full transition-all"
              style={{ width: i === idx ? '16px' : '6px', background: i === idx ? '#0B1C3A' : 'rgba(11,28,58,0.3)' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
