/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8f4',
          100: '#d6efe5',
          200: '#b0decc',
          500: '#2f9b75',
          600: '#1f7a5a',
          700: '#1a6149',
          800: '#184e3c',
        },
        ink: {
          500: '#5b6573',
          700: '#2f3742',
          900: '#151a21',
        },
        surface: {
          page: '#f4f6f8',
          card: '#ffffff',
        },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(21, 26, 33, 0.04), 0 8px 24px rgba(21, 26, 33, 0.06)',
      },
    },
  },
  plugins: [],
};
