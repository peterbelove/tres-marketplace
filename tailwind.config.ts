import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        tresNavy: '#071C46',
        tresGreen: '#16a34a',
        tresGreenHover: '#128a3e',
        tresBg: '#f7f9fc'
      }
    }
  },
  plugins: []
} satisfies Config;