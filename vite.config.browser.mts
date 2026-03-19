import { defineConfig, PluginOption } from 'vite'
import { testPlugin } from '@woby/vite-plugin-test'
import path from 'path'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.browser.tsx"],
            name: "@woby/use",
            formats: ['es', 'umd'],
            fileName: (format: string, entryName: string) => `index.browser.${format}.js`
        },
        sourcemap: true,
        outDir: './dist/browser',
        rollupOptions: {
            external: ['woby', 'woby/jsx-runtime', 'oby', '**/*.text.ts*', /^@woby\/(.*)/],
            output: {
                globals: {
                    'woby': 'woby',
                    'oby': 'oby',
                    'woby/jsx-runtime': 'jsxRuntime'
                }
            },
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        testPlugin() as PluginOption,
    ],
    resolve: {
        alias: {
            '@woby/chk': process.argv.includes('dev') ? path.resolve('../chk/src') : '@woby/chk',
        },
    },
})

export default config
