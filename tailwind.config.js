/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        caption: "#768396",
        group: "#131517",
        messages: "#212229",
        header: "#1E1F25",
        icon: "#5051F9",
        typing: "#258C60",
        delivered: "#41D37E",
        notification: "#D34141",
        input: "#282932",
        placeholder: "#9BABC5",
        description: "#F2F2F2",
        name: "#E9E9E9",
      },
      fontFamily: {
        "DM-Sans": ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
