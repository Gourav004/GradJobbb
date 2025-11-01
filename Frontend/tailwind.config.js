// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Add a custom name 'poppins', and optionally replace 'sans' to make it default
        sans: ["Roboto", sans - serif],
        // To set Poppins as the default sans:
        // sans: ["Poppins", "ui-sans-serif", "system-ui", ...],
      },
    },
  },
  plugins: [],
};
