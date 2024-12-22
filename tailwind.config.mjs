/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out forwards',
        fadeInSlide: 'fadeInSlide 0.5s ease-out forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInSlide: {
          '0%': {
            opacity: '0',
            transform: 'translateX(1rem)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }}
      }
    }
  },
	safelist: [
		'bg-gray-50',
		'bg-white',
	],
	plugins: [],
}
