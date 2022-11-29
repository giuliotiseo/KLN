/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Outfit', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          // Verde alternativo giulio
          100: '#2cdda8',
          200: '#1CAE81',
          300: '#1A9E76'
          // Verde originale giulio
          // 100: '#11676A',
          // 200: '#158084',
          // 300: '#21CED4'
          // Verde alternativo logo...
          // 100: '#008776',
          // 200: '#009A5E',
          // 300: '#3AAA35'
        },
        secondary: {
          100: '#0A445C',
          200: '#073042',
          300: '#062937',
          // Blu alternativo logo...
          // 100: '#0267A2',
          // 200: '#008BAA',
          // 300: '#7fc3ea',
        },
        tertiary: {
          100: '#0267A2',
          200: '#008BAA',
          300: '#7fc3ea',
        },
        light: {
           50: '#d9dee8',
          100: '#ffffff',
          200: '#f7f9fc',
          300: '#f4f6fb',
        },
        neutral: {
          100: "#42444B",
          200: "#fcfcfd"
        },
        dark: {
          50: '#0c0e12',
          100: '#2d3037',
          200: '#22252C',
          300: '#161a21'
        },
        danger: {
          100: '#9A1D1D',
          200: '#B42222',
          300: '#DE5454'
        },
        success: {
          100: '#55C595',
          200: '#7ce495',
          300: '#CFF4D2',
        },
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        5: '5 5 0%',
        6: '6 6 0%',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'login': "url('/public/images/cart-pallet-vertical.png')",
        'buildings': "url('/public/images/buildings-1.jpg')",
        'warehouse': "url('/public/images/warehouse.jpg')",
        'home': "url('/public/images/home-bg.png')",
      },
      fontSize: {
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      }
    },
    boxShadow: {
      primary: '0 1px 10px 0 rgb(51 165 147 / 35%), 0 0px 2px 0 rgb(51 165 147 / 40%)',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
     '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
  },
  // variants: {
  //   boxShadow: ['active'],
  //   extend: {
  //     fill: ['hover'],
  //     opacity: ['disabled'],
  //     textColor: ['disabled'],
  //     backgroundColor: ['disabled'],
  //     borderColor: ['disabled'],
  //     cursor: ['disabled']
  //   },
  // },
  plugins: [],
}
