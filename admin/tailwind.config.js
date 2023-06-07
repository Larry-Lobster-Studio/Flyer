const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'flyer-primary': 'rgba(239,247,32,1)',
				'flyer-secondary': 'rgba(105,86,64,1)',
				'flyer-white': 'rgba(249,248,248,1)',
				'flyer-gray': 'rgba(88,80,74,1)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [
		require('@headlessui/tailwindcss'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('tailwindcss-unsplash'),
		plugin(function ({ addVariant, matchVariant, addUtilities }) {
			addVariant('not-last', '&:not(:last-child)');
			matchVariant(
				'nth',
				(value) => {
					return `&:nth-child(${value})`;
				},
				{
					values: {
						1: '1',
						2: '2',
						3: '3',
					},
				}
			);
			matchVariant(
				'nth-last',
				(value) => {
					return `&:nth-last-child(${value})`;
				},
				{
					values: {
						1: '1',
						2: '2',
						3: '3',
					},
				}
			);
			matchVariant(
				'nth-first',
				(value) => {
					return `&:nth-last-child(${value})`;
				},
				{
					values: {
						1: '1',
						2: '2',
						3: '3',
					},
				}
			);
			addUtilities({
				'.scrollbar-hide': {
					/* IE and Edge */
					'-ms-overflow-style': 'none',

					/* Firefox */
					'scrollbar-width': 'none',

					/* Safari and Chrome */
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				},
			});
		}),
	],
};

// #fd6746
