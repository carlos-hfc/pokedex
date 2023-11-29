import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fighting: '#ce3f6a',
        psychic: '#f97077',
        poison: '#ab6ac8',
        dragon: '#096dc3',
        ghost: '#5269ab',
        dark: '#595365',
        ground: '#d97746',
        fire: '#fe9c53',
        fairy: '#ec8fe7',
        water: '#4d90d5',
        flying: '#8fa8de',
        normal: '#9098a2',
        rock: '#c6b889',
        electric: '#f4d23b',
        bug: '#90c02c',
        grass: '#63bb5c',
        ice: '#73cebf',
        steel: '#5a8fa1',
        'black-dark': '#424242',
        'pokemon-blue': '#3b5ca8'
      },
      fontFamily: {
        montserrat: ['var(--montserrat)'],
        flexo: ['var(--flexo)'],
      }
    }
  },
  plugins: [],
};
export default config;
