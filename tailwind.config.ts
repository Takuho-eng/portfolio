import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['var(--font-bebas)'],
        dm: ['var(--font-dm)']
      },
      colors: {
        accent: '#8A8FAB'
      }
    }
  },
  plugins: []
}

export default config
