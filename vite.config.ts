import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/e-commerce-web/',
  plugins: [
    react(), 
    tailwindcss(),
    visualizer({
      filename: './dist/bundle-report.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
    build: {
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor-core': [
            '@radix-ui/react-accordion', 
            '@radix-ui/react-avatar', 
            '@radix-ui/react-checkbox',
            '@radix-ui/react-label',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-tabs',
          ],
          'ui-vendor-forms': [
            '@radix-ui/react-select',
            '@radix-ui/react-slider',
            '@radix-ui/react-radio-group',
          ],
          'ui-vendor-dialog': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          'animations': ['framer-motion'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],                                                                             
          'store': ['zustand'],
          'virtualization': ['@tanstack/react-virtual'],
        },
      },
    },
    // Enable chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Minimize CSS
    cssCodeSplit: true,
    // Production source maps for debugging
    sourcemap: false,
    // Minification
    minify: 'esbuild', // Using esbuild for faster builds, terser is optional
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: [
      '@radix-ui/react-accordion',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs',
    ],
  },
})
