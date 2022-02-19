module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	// daisyUI config
	daisyui: {
		styled: true,
		themes: false,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		darkTheme: "dark",
	},
};
