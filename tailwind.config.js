/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    daisyui: {
      themes: [
        {
          mytheme: {
            primary: "#0C9AAC",
            secondary: "#90E7F2",
            accent: "#9EF4FF",
            neutral: "#150500",
            "base-100": "#1f212b",
            info: "#00dbff",
            success: "#00d880",
            warning: "#b04b00",
            error: "#ff0049",
          },
        },
      ],
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-flip"),
    require("@tailwindcss/forms"),
  ],
};
