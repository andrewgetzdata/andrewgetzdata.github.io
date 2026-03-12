// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://andrewgetz.com',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  compilerOptions: {
    // Enable strict mode for better TypeScript support
    strictMode: true,
  },
  // Optimize for performance
  vite: {
    build: {
      cssMinify: true,
      minify: true,
    },
  },
});
