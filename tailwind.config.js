/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      // Minimum width of 500px and maximum width of 767px
      sm: { min: "319px", max: "430px" },

      // Minimum width of 768px and maximum width of 1023px
      md: { min: "431px", max: "900px" },

      // Maximum width of 1279px
      lg: { min: "901px", max: "1440px" },
    },
    extend: {},
  },
  plugins: [],
};
