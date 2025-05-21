import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fighting: "#ce3f6a",
        psychic: "#f97077",
        poison: "#ab6ac8",
        dragon: "#096dc3",
        ghost: "#5269ab",
        dark: "#595365",
        ground: "#d97746",
        fire: "#fe9c53",
        fairy: "#ec8fe7",
        water: "#4d90d5",
        flying: "#8fa8de",
        normal: "#9098a2",
        rock: "#c6b889",
        electric: "#f4d23b",
        bug: "#90c02c",
        grass: "#63bb5c",
        ice: "#73cebf",
        steel: "#5a8fa1",
        "black-dark": "#424242",
        "pokemon-blue": "#3b5ca8",
        "pokemon-red": "#e3350d",
      },
      fontFamily: {
        flexo: ["var(--flexo)"],
      },
      screens: {
        lg: "992px",
        xs: "425px",
      },
      transitionDuration: {
        250: "250ms",
      },
      height: {
        inherit: "inherit",
      },
      dropShadow: {
        text: "0 2px 2px rgba(0,0,0,.8)",
      },
      keyframes: {
        increase: {
          "0%": {
            transform: "translateX(-110%)",
          },
        },
        toRight: {
          "0%": {
            transform: "translateX(100px)",
          },
          "100%": {
            transform: "initial",
          },
        },
        down: {
          "0%": {
            transform: "translateY(-50px)",
          },
          "100%": {
            transform: "initial",
          },
        },
      },
      textShadow: {
        DEFAULT: "0 2px 5px rgba(0,0,0,.8)",
      },
      backgroundImage: {
        pokeball: "url('/pokeball-transparent.svg')",
      },
    },
  },
  safelist: [
    {
      pattern: /(bg|text|shadow)-+/,
      variants: ["before"],
    },
  ],
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": value => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      )
    }),
  ],
}
export default config
