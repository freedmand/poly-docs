const colors = require('tailwindcss/colors');

const invertMap = {
	50: '900',
	100: '800',
	200: '700',
	300: '600',
	400: '500',
	500: '400',
	600: '300',
	700: '200',
	800: '100',
	900: '50'
};

function invert(colors) {
	return Object.fromEntries(Object.entries(colors).map(([key, value]) => [invertMap[key], value]));
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				neutral: colors.slate,
				neutralDark: invert(colors.slate),
				positive: colors.green,
				positiveDark: invert(colors.green),
				urge: colors.violet,
				urgeDark: invert(colors.violet),
				warning: colors.yellow,
				warningDark: invert(colors.yellow),
				info: colors.blue,
				infoDark: invert(colors.blue),
				critical: colors.red,
				criticalDark: invert(colors.red),
				emeraldDark: invert(colors.emerald),
				greenDark: invert(colors.green),
				amberDark: invert(colors.amber),
				slateDark: invert(colors.slate),
				// Define a really dark purple for dark mode
				// 'purple-dark': '#0d051c'
				// 'purple-dark': '#130c21',
				// 'purple-dark': '#100027',
				'purple-dark': '#130820',
				'purple-fg': '#c2bcd0'
			}
		}
	},
	plugins: [require('a17t')]
};
