import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@shared/contracts': path.resolve(__dirname, '../../shared/packages/contracts/src'),
      '@shared/config': path.resolve(__dirname, '../../shared/packages/config'),
      '@shared/ui': path.resolve(__dirname, '../../shared/packages/ui/src'),
    },
  },
});

