/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#161240',
          plum: '#3A1A4A',
          maroon: '#6B2244',
          orange: '#F58A1F',
          cream: '#FFF3E8',
          creamBorder: '#F5A623',
        },
        surface: {
          page: '#F8F8FB',
          card: '#FFFFFF',
          muted: '#F3F3F8',
        },
        ink: {
          DEFAULT: '#1E1B3A',
          secondary: '#6B6B80',
          faint: '#A0A0B2',
        },
        line: '#ECECF3',
        status: {
          success: '#22C55E',
          successBg: '#E8F8EE',
          danger: '#EF4444',
          dangerBg: '#FDECEC',
          warning: '#F97316',
          warningBg: '#FFF1E6',
          info: '#3B82F6',
          infoBg: '#E8F0FE',
          violet: '#6C5CE7',
          violetBg: '#ECEBFF',
          cyan: '#06B6D4',
          cyanBg: '#E0F7FA',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg,#161240 0%,#3A1A4A 55%,#6B2244 100%)',
        'brand-gradient-v': 'linear-gradient(180deg,#161240 0%,#3A1A4A 55%,#6B2244 100%)',
        'sidebar-gradient': 'linear-gradient(180deg,#FFFFFF 0%,#FFF1EC 100%)',
        'topbar-gradient': 'linear-gradient(90deg,#FFFFFF 0%,#FFF6F2 60%,#FFEDE6 100%)',
      },
      borderRadius: {
        card: '16px',
        hero: '20px',
      },
      boxShadow: {
        card: '0 4px 16px rgba(22,18,64,0.06)',
        soft: '0 2px 8px rgba(22,18,64,0.04)',
      },
    },
  },
  plugins: [],
};
