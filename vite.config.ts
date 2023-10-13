import { resolve } from 'path'
import { defineConfig } from 'vite'
import loadCssModulePlugin from 'vite-plugin-load-css-module'
import react from '@vitejs/plugin-react'
import pkt from './package.json'

export default defineConfig({
  plugins: [
    react(),
    loadCssModulePlugin.default({
      include: (id) => {
        const path = id.split('?').slice(0, 1).join('')
        if (path.endsWith('less') && !path.includes('node_modules')) {
          return true
        }
      },
    }),
  ],
  define: {
    "_VERSION_": pkt.version,
  },
  build: {
    lib: {
      entry: [resolve(__dirname, 'index.js'), resolve(__dirname, 'runtime.js')],
      name: 'logic-engine',
    },
    rollupOptions: {
      external: [
        'react', 'redux', 'react-dnd', 'react/jsx-runtime', 'react-redux', 'react-dnd', 'react-dnd-html5-backend'
      ],
      output: {
        globals: {
        },
      },
    },
  },
  resolve: {
    alias: {
      "*": './*',
    },
  }
})
