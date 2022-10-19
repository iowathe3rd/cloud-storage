/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				authBg: "url('/src/assets/auth_bg.webp')",
			},
		},
	},
	daisyui: {
		themes: ["light", "dark"],
	},
	plugins: [require("daisyui")],
};
