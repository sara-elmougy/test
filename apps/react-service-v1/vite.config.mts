/// <reference types='vitest' />
import { defineConfig, type ViteDevServer, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { IncomingMessage, ServerResponse } from 'http';
import path, { resolve } from 'path';
import fs from 'fs';

const libsRoot = resolve(__dirname, '../../libs/shared');

// Serves workspace-level shared assets at /scripts/ and /etec/
function workspaceStaticPlugin(): Plugin {
  const assetsDir = path.resolve(__dirname, '../../assets');
  const staticPaths: Record<string, string> = {
    '/scripts': path.join(assetsDir, 'scripts/twkhelper'),
    '/etec': path.join(assetsDir, 'etec'),
    '/assets/twk-profiles': path.join(assetsDir, 'twk-profiles'),
  };

  function serveStatic(baseDir: string) {
    return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
      const filePath = path.join(baseDir, req.url ?? '');
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        fs.createReadStream(filePath).pipe(res);
      } else {
        next();
      }
    };
  }

  return {
    name: 'workspace-static',
    configureServer(server: ViteDevServer) {
      for (const [urlPath, dir] of Object.entries(staticPaths)) {
        server.middlewares.use(urlPath, serveStatic(dir));
      }
    },
  };
}

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/react-service-v1',
  server: {
    port: 3000,
    host: 'localhost',
  },
  preview: {
    port: 3000,
    host: 'localhost',
  },
  plugins: [react(), tsconfigPaths(), workspaceStaticPlugin()],
  resolve: {
    alias: {
      '@tawakalna/services': resolve(libsRoot, 'services/src/index.ts'),
      '@tawakalna/hooks': resolve(libsRoot, 'hooks/src/index.ts'),
      '@tawakalna/models': resolve(libsRoot, 'models/src/index.ts'),
      '@tawakalna/store': resolve(libsRoot, 'store/src/index.ts'),
      '@tawakalna/interceptors': resolve(libsRoot, 'interceptors/src/index.ts'),
      '@tawakalna/environments': resolve(libsRoot, 'environments/src/index.ts'),
      '@tawakalna/usecases': resolve(libsRoot, 'usecases/src/index.ts'),
    },
  },
  base: './',
  build: {
    outDir: './dist',
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
