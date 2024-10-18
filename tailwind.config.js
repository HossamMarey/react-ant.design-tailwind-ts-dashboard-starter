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
        primary: 'hsl(var(--color-primary))',
        secondary: 'hsl(var(--color-secondary))',
        bg: 'hsl(var(--color-background))',
        text: 'hsl(var(--color-text))',
        card: 'hsl(var(--color-card))',
        border: 'hsl(var(--color-border))',
        danger: 'hsl(var(--color-danger))',
        success: 'hsl(var(--color-success))',
        warning: 'hsl(var(--color-warning))',
        info: 'hsl(var(--color-info))',
      }
    },

  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}

