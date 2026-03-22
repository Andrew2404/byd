module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './data/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#09090b',
        graphite: '#16181d',
        mist: '#f5f7fb',
        silver: '#cbd5e1',
        aurora: '#1f8fff',
        electric: '#52d3ff',
        ember: '#ff7a59',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(82,211,255,.2), 0 10px 30px rgba(31,143,255,.15)',
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at top, rgba(82,211,255,0.18), transparent 36%), linear-gradient(180deg, rgba(255,255,255,0.02), transparent)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.65 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
