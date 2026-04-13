import type { Plugin, ResolvedConfig, ViteDevServer } from 'vite';
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

  function copyDirSync(src: string, dest: string) {
    if (!fs.existsSync(src)) return;
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyDirSync(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  let resolvedConfig: ResolvedConfig;

  return {
    name: 'workspace-static',
    configResolved(config) {
      resolvedConfig = config;
    },
    configureServer(server: ViteDevServer) {
      for (const [urlPath, dir] of Object.entries(staticPaths)) {
        server.middlewares.use(urlPath, serveStatic(dir));
      }
    },
    closeBundle() {
      if (resolvedConfig.command !== 'build') return;
      const outDir = path.resolve(resolvedConfig.root, resolvedConfig.build.outDir);
      for (const [urlPath, srcDir] of Object.entries(staticPaths)) {
        const destDir = path.join(outDir, urlPath.replace(/^\//, ''));
        copyDirSync(srcDir, destDir);
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
