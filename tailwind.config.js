/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
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
        "bg-input": "#050505",
        hour: "#A9ABAD",
      },

      keyframes: {
        "slide-down": {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },

        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(300px)" },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      },

      boxShadow: {
        login: "-5px 5px 15px 25px rgba(0, 0, 0, 0.3)",
      },
      fontFamily: {
        "DM-Sans": ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
