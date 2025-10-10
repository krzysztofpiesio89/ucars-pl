/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dark': "url('/images/hero-dark.jpg')",
        'light': "url('/images/hero-light.jpg')",
      },

      animation: {
        // ...twoje inne animacje
        'spin-slow': 'spin 10s linear infinite', // ✅ DODAJ TĘ LINIĘ
        'turn-signal': 'turn-signal-blink 3s ease-in-out infinite' // ✅ DODAJ TĘ LINIĘ
      },
      keyframes: {
        // ...twoje inne klatki kluczowe
        'turn-signal-blink': { // ✅ DODAJ TEN CAŁY OBIEKT
          '0%, 100%': { 
            opacity: '0.5',
            textShadow: 'none',
          },
          '50%': { 
            opacity: '1',
            textShadow: '0 0 12px rgba(251, 146, 60, 1)', // Neonowa pomarańczowa poświata
          },
        },
      },

    },

  },
  plugins: [],
  darkMode: 'class',
}
