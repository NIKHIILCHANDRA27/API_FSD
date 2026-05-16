export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#111827',
        panel: '#1f2937',
        accent: '#7c3aed',
        accentSoft: '#8b5cf6',
        glow: '#a855f7'
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.25)'
      }
    }
  },
  plugins: []
};
