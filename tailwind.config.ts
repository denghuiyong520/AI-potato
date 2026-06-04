import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium cream/neutral palette — the foundation of our "quiet luxury" aesthetic
        cream: {
          50:  '#FDFCFA',
          100: '#FAF8F4',
          200: '#F3EFE8',
          300: '#E8E3D9',
          400: '#D5CFC3',
          500: '#B8B0A3',
          600: '#9A9188',
          700: '#7A716A',
          800: '#5A524C',
          900: '#3A332E',
        },
        // Primary text and dark surfaces
        ink: {
          DEFAULT: '#1A1A1A',
          light: '#3D3D3D',
          muted: '#6B6560',
          subtle: '#9E9992',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'Cambria', 'serif'],
        sans:  ['var(--font-inter)',     'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4vw, 3.75rem)', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)',  { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      spacing: {
        section: '6rem',
        'section-lg': '9rem',
      },
      screens: {
        // Custom breakpoint: desktop nav shows at 960px (between md=768 and lg=1024)
        'desk': '960px',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'soft':    '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
        'card':    '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.12)',
        'float':   '0 20px 60px rgba(0,0,0,0.15)',
      },
      keyframes: {
        'pulse-ring': {
          '0%':   { transform: 'scale(0.95)', boxShadow: '0 0 0 0 rgba(34,197,94,0.7)' },
          '70%':  { transform: 'scale(1)',    boxShadow: '0 0 0 12px rgba(34,197,94,0)' },
          '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0  rgba(34,197,94,0)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.455,0.03,0.515,0.955) infinite',
        'fade-up':    'fade-up 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
