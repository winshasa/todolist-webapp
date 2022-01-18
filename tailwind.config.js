const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          ...colors.green,
          DEFAULT: "#28a745",
        },
        red: {
          ...colors.red,
          DEFAULT: "#dc3545",
        },
        yellow: {
          ...colors.yellow,
          DEFAULT: "#ffc107",
        },
        blue: {
          ...colors.blue,
          DEFAULT: "#17a2b8",
        },
        purple: {
          ...colors.violet,
          DEFAULT: "#8B5CF6",
        },
        pink: {
          ...colors.pink,
          DEFAULT: "#EC4899"
        },
        indigo: {
          ...colors.indigo,
          DEFAULT: "#6366F1"
        },
        gray: {
          ...colors.gray,
          DEFAULT: "#6B7280"
        },
        orange: {
          ...colors.yellow,
          DEFAULT: "#FF8B00"
        },
        social: {
          facebook: "#3b5998",
          twitter: "#1da1f2",
          pinterest: "#bd081c",
          whatsapp: "#25d366",
        },
      },
    },
    colors: {
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      primary: {
        DEFAULT: "#145388",
        100: "#F3F6F9",
        200: "#C4D4E1",
        300: "#A1BACF",
        400: "#5B87AC",
        500: "#145388",
        600: "#124B7A",
        700: "#0C3252",
        800: "#09253D",
        900: "#061929",
      },
      secondary: "#555555",
      gray: {
        100: "#f8f8f8",
        200: "#eeeeee",
        300: "#dddddd",
        400: "#cccccc",
        500: "#aaaaaa",
        600: "#888888",
        700: "#555555",
        800: "#242526",
        900: "#151515",
      },
    },
  },
  plugins: [],
}
