/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import { workspaceStaticPlugin, createSharedAliases } from '../../libs/shared/config/vite.shared';

const workspaceRoot = resolve(__dirname, '../..');

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/profile-demo',
  server: {
    port: 3001,
    host: 'localhost',
  },
  preview: {
    port: 3001,
    host: 'localhost',
  },
  plugins: [react(), tsconfigPaths(), workspaceStaticPlugin(workspaceRoot)],
  resolve: {
    alias: createSharedAliases(workspaceRoot),
  },
  base: './',
  build: {
    outDir: '../../dist/apps/profile-demo',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
