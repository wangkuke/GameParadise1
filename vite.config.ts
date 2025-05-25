/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

function getPlugins() {
  const plugins = [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    }), 
    tsconfigPaths()
  ];
  return plugins;
}

export default defineConfig({
  plugins: getPlugins(),
  base: './',
  define: {
    'process.env.NODE_ENV': '"production"',
    __DEFINES__: '{}',
    __HMR_CONFIG_NAME__: '{}'
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      output: {
        format: 'es',
        manualChunks: undefined,
        inlineDynamicImports: true,
        generatedCode: {
          constBindings: true
        }
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      supported: {
        'top-level-await': true
      }
    }
  },
  esbuild: {
    target: 'esnext',
    supported: {
      'top-level-await': true
    },
    legalComments: 'none'
  },
  server: {
    port: 3001,
    host: true
  }
});
