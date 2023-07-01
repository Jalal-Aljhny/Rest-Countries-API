/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.js", "*.html"],
  theme: {
    fontFamily: {
      sans: ["Nunito Sans", "sans-serif"],
    },
    colors: {
      text: "var(--color-h1)",
      header: "var(--header)",
      body: "var(--body)",
      filter: "var(--filter)",
      shaddow: "var(--shaddow)",
    },
    gridTemplateColumns: {
      "auto-fill": "repeat(auto-fill, 16rem)",
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      x1: "1.17rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      md: "768px",
      // => @media (min-width: 768px) { ... }
      g: "991px",
      // => @media (min-width: 911px) { ... }
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },

  plugins: [],
};
