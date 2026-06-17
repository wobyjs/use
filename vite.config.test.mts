import { defineConfig } from 'vite'
import tsconfig from 'vite-plugin-tsconfig'
import path from 'path'

export default defineConfig({
    plugins: [
        tsconfig({
            filename: 'tsconfig.test.json'
        })
    ],
    resolve: {
        alias: {
            '@woby/chk': path.resolve(__dirname, '../chk/dist/index.mjs')
        }
    },
    build: {
        outDir: 'dist/test',
        lib: {
            entry: 'test/index.ts',
            formats: ['es'],
            fileName: 'test'
        },
        rollupOptions: {
            external: ['woby'],
            output: {
                globals: {
                    woby: 'woby'
                }
            },
            treeshake: false
        }
    }
})