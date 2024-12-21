/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.4s ease-in-out forwards'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    }
  },
	safelist: [
		'bg-gray-50',
		'bg-white',
	],
	plugins: [],
}
