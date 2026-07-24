import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif']
      },
      colors: {
        ink: {
          900: '#07111f',
          950: '#040914'
        },
        aqua: '#22d3ee',
        cobalt: '#2563eb',
        amber: '#f59e0b'
      },
      boxShadow: {
        glow: '0 20px 80px rgba(34, 211, 238, 0.14)'
      }
    }
  }
} satisfies Config;
