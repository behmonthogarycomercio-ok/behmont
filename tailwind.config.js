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
    },
  },
  plugins: [],
};
