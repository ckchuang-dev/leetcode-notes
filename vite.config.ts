/// <reference types="vitest/config" />
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
    silent: true, // Suppresses all output except for errors
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
});
