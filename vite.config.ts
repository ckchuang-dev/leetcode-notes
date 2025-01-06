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
    pool: 'threads',
    include: ['src/**/*.test.{ts,tsx}'],
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
});
