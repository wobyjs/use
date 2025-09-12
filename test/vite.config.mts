import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
    root: __dirname,
    resolve: {
        alias: {
            'woby/jsx-dev-runtime': 'woby',
            'woby/jsx-runtime': 'woby',
            'woby': 'woby',
            'verifies': 'verifies',
        },
    },

    build: {
        minify: false,
        outDir: 'dist',
        emptyOutDir: true,
        lib: {
            entry: './index.html',
            name: 'test',
            fileName: 'test',
        },
    },

    esbuild: {
        jsx: 'automatic',
    },

    server: {
        port: 5175,
    },
})