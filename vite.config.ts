import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

function copyMediaFoldersPlugin() {
  return {
    name: 'copy-media-folders',
    closeBundle() {
      const rootDir = process.cwd();
      const distDir = path.join(rootDir, 'dist');
      const folders = [
        'assets',
        'images',
        'project photos',
        'project_photos',
        'achivements',
        'achievements',
        'videos',
        'certificate',
        'certificates',
        'music',
        'audio'
      ];

      folders.forEach((folder) => {
        const srcPath = path.join(rootDir, folder);
        const destPath = path.join(distDir, folder);
        if (fs.existsSync(srcPath)) {
          try {
            fs.mkdirSync(destPath, { recursive: true });
            fs.cpSync(srcPath, destPath, { recursive: true });
          } catch (e) {
            console.warn(`[copy-media-plugin] Could not copy ${folder}:`, e);
          }
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), copyMediaFoldersPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
