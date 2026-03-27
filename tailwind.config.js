/*
 * @Descripttion:
 * @version:
 * @Author: 程
 * @Date: 2023-02-15 10:17:31
 * @LastEditors: 程
 * @LastEditTime: 2023-02-15 10:26:02
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [],
};
