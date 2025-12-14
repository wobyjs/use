import { defineConfig, PluginOption } from 'vite'
import { testPlugin } from '@woby/vite-plugin-test'
import path from 'path'
// import dts from 'vite-plugin-dts'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.tsx"],
            name: "@woby/use",
            formats: ['es', /*'cjs', */'umd'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        sourcemap: true,
        rollupOptions: {
            external: ['woby', 'woby/jsx-runtime', 'oby', '**/*.text.ts*', /^@woby\/(.*)/, /* , 'oby/dist/types/types' */],
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
        // dts({ entryRoot: './src', outputDir: './dist/types', exclude: './nodes_modules' })
    ],
    resolve: {
        alias: {
            '@woby/chk': process.argv.includes('dev') ? path.resolve('../chk/src') : '@woby/chk',
        },
    },
})



export default config
