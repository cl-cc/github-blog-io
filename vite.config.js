/*
 * @Descripttion:
 * @version:
 * @Author: 程
 * @Date: 2021-10-28 15:02:15
 * @LastEditors: 程
 * @LastEditTime: 2026-03-27 11:39:44
 */

const { defineConfig } = require('vite');
const vue = require('@vitejs/plugin-vue');
const path = require('path');

// https://vitejs.dev/config/
module.exports = defineConfig({
  base: '/github-blog-io/',
  plugins: [vue()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2020',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  server: {
    hmr: true,
    port: '4000',
    proxy: {
      '/api': {
        target: 'http://192.168.5.42:9501/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
});
