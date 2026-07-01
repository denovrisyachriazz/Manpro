import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          register: path.resolve(__dirname, 'register.html'),
          dashboard: path.resolve(__dirname, 'dashboard.html'),
          'buat-laporan': path.resolve(__dirname, 'buat-laporan.html'),
          'laporan-saya': path.resolve(__dirname, 'laporan-saya.html'),
          'detail-laporan': path.resolve(__dirname, 'detail-laporan.html'),
          'tracking-bantuan': path.resolve(__dirname, 'tracking-bantuan.html'),
          profil: path.resolve(__dirname, 'profil.html'),
          pengaturan: path.resolve(__dirname, 'pengaturan.html'),
          'tentang-kami': path.resolve(__dirname, 'tentang-kami.html'),
          faq: path.resolve(__dirname, 'faq.html'),
          kontak: path.resolve(__dirname, 'kontak.html'),
          'admin-dashboard': path.resolve(__dirname, 'admin-dashboard.html'),
        },
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
