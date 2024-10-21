/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '3xl': '1900px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          lg: '2rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      colors: {
        primary: 'hsla(var(--color-primary))',
        secondary: 'hsla(var(--color-secondary))',
        bg: 'hsla(var(--color-background))',
        text: 'hsla(var(--color-text))',
        card: 'hsla(var(--color-card))',
        border: 'hsla(var(--color-border))',
        danger: 'hsla(var(--color-danger))',
        success: 'hsla(var(--color-success))',
        warning: 'hsla(var(--color-warning))',
        info: 'hsla(var(--color-info))',
      }
    },

  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

