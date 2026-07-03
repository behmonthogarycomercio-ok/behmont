/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // BEHMONT-IMP brand tokens — steel + signal-amber industrial identity
        steel: {
          950: '#0B1220',
          900: '#111A2E',
          800: '#182545',
          700: '#223160', // primary brand navy-steel
          600: '#2E4380',
          100: '#E7EAF1',
          50: '#F4F5F8',
        },
        amber: {
          600: '#C2540A', // signal amber (deep) — CTAs
          500: '#E8590C', // signal amber — primary accent
          400: '#F2792F',
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
