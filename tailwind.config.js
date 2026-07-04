/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // BEHMONT — Comercio y Hogar — colores reales de marca (extraídos del logo)
        steel: {
          950: '#0A1226',
          900: '#111C38', // navy de marca
          800: '#182548',
          700: '#213262',
          600: '#2D4380',
          500: '#52649C',
          400: '#7886AD',
          300: '#9DA7C4',
          200: '#C3C9DA',
          100: '#E8EAF1',
          50: '#F5F6F9',
        },
        amber: {
          600: '#D62A2F',
          500: '#ED3237', // rojo de marca
          400: '#F15458',
        },
        plate: {
          50: '#F6F7F8',
          100: '#EEF0F2',
          200: '#DFE3E8',
        },
        success: {
          600: '#059669',
          700: '#047857',
        },
        warning: {
          500: '#F59E0B',
          600: '#D97706',
        },
        danger: {
          600: '#DC2626',
          700: '#B91C1C',
        },
        whatsapp: {
          600: '#059669',
          700: '#047857',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,18,32,0.06), 0 8px 24px -12px rgba(11,18,32,0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
