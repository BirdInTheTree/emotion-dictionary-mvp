import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}','./components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#fafafb',
        ink: '#0f172a',
        subtle: '#6b7280',
        card: '#ffffff',
        border: '#e5e7eb',
        accent: '#111827'
      },
      boxShadow: { soft: '0 10px 30px rgba(17,24,39,0.06)' },
      borderRadius: { xl2: '1.25rem' }
    }
  },
  plugins: []
} satisfies Config;
