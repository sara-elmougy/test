import type { Plugin, ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import path from 'path';
import fs from 'fs';

export function workspaceStaticPlugin(workspaceRoot: string): Plugin {
  const assetsDir = path.resolve(workspaceRoot, 'assets');
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

export function createSharedAliases(workspaceRoot: string): Record<string, string> {
  const libsRoot = path.resolve(workspaceRoot, 'libs/shared');
  return {
    '@tawakalna/services': path.resolve(libsRoot, 'services/src/index.ts'),
    '@tawakalna/hooks': path.resolve(libsRoot, 'hooks/src/index.ts'),
    '@tawakalna/models': path.resolve(libsRoot, 'models/src/index.ts'),
    '@tawakalna/store': path.resolve(libsRoot, 'store/src/index.ts'),
    '@tawakalna/interceptors': path.resolve(libsRoot, 'interceptors/src/index.ts'),
    '@tawakalna/environments': path.resolve(libsRoot, 'environments/src/index.ts'),
    '@tawakalna/usecases': path.resolve(libsRoot, 'usecases/src/index.ts'),
  };
}
