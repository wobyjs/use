import { defineConfig } from 'vite'

export default defineConfig({
    resolve: {
        alias: {
            'woby/jsx-dev-runtime': 'woby',
            'woby/jsx-runtime': 'woby',
            'woby': 'woby',
        },
    },

    build: {
        minify: false,
        outDir: 'dist',
        emptyOutDir: true,
        lib: {
            entry: './index.html',
            name: '@woby/use/test',
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