/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,mjs}',
    './components/**/*.{js,jsx,ts,tsx,mjs}',
    './lib/**/*.{js,ts,jsx,tsx,mjs}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F62FE',
        'on-primary': '#ffffff',
        accent: '#ff8c00',
        'on-accent': '#ffffff',
        ink: '#1a1a1a',
        canvas: '#ffffff',
        'inverse-canvas': '#512396',
        'inverse-ink': '#ffffff',
        'hairline': '#e6e6e6',
        'hairline-soft': '#f1f1f1',
        'surface-soft': '#f9f8fc', // Light purple tint
        'surface-brand': '#e9e1f5', // Slightly darker light purple
        'block-lime': '#dceeb1',
        'block-lilac': '#c5b0f4',
        'block-cream': '#f4ecd6',
        'block-pink': '#efd4d4',
        'block-mint': '#c8e6cd',
        'block-coral': '#f3c9b6',
        'block-navy': '#1f1d3d',
        'accent-magenta': '#ff3d8b',
        'semantic-success': '#1ea64a',
        'overlay-scrim': 'rgba(0,0,0,0.6)'
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', '-apple-system', 'Helvetica Neue', 'Arial'],
        mono: ['JetBrains Mono', 'SF Mono', 'Menlo', 'monospace']
      },
      borderRadius: {
        xs: '2px',
        sm: '6px',
        md: '8px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
        pill: '9999px',
        full: '9999px'
      },
      spacing: {
        hair: '1px',
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        section: '96px'
      },
      fontSize: {
        'display-xl': ['5.375rem', { lineHeight: '1.0' }],
        'display-lg': ['4rem', { lineHeight: '1.1' }],
        headline: ['1.625rem', { lineHeight: '1.35' }],
        'body-lg': ['1.25rem', { lineHeight: '1.4' }],
        body: ['1.125rem', { lineHeight: '1.45' }],
        'body-sm': ['1rem', { lineHeight: '1.45' }]
      }
    }
  },
  plugins: []
};
