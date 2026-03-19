import { defineConfig, PluginOption } from 'vite'
import { testPlugin } from '@woby/vite-plugin-test'
import path from 'path'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.ssr.tsx"],
            name: "@woby/use",
            formats: ['es', 'cjs'],
            fileName: (format: string, entryName: string) => `index.ssr.${format}.js`
        },
        sourcemap: true,
        outDir: './dist/ssr',
        ssr: true,
        rollupOptions: {
            external: [
                'woby',
                'woby/jsx-runtime',
                'oby',
                '**/*.text.ts*',
                /^@woby\/(.*)/,
                // Exclude browser-only hooks to ensure they're not bundled
                './src/useLocalStorage/*',
                './src/useSessionStorage/*',
                './src/useCopyToClipboard/*',
                './src/useEventListener/*',
                './src/useClickAway*',
                './src/useClickAnyWhere/*',
                './src/useOnClickOutside/*',
                './src/useHover/*',
                './src/useElementSize/*',
                './src/useWindowSize/*',
                './src/useViewportSize*',
                './src/useAspect*',
                './src/useComputedStyle*',
                './src/useLocation*',
                './src/useGpsLocation*',
                './src/useScreen/*',
                './src/useScreenOrientation*',
                './src/useMediaQuery/*',
                './src/useIntersectionObserver/*',
                './src/useDocumentTitle/*',
                './src/useLockedBody/*',
                './src/useScript/*',
                './src/useImageOnLoad/*',
                './src/useDarkMode/*',
                './src/useTernaryDarkMode/*',
                './src/useFetch/*',
                './src/useSelection*',
                './src/isLocalhost*'
            ],
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
