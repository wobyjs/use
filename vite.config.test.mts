import { defineConfig } from 'vite'
import tsconfig from 'vite-plugin-tsconfig'

export default defineConfig({
    plugins: [
        tsconfig({
            filename: 'tsconfig.test.json'
        })
    ],
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