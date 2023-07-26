import { defineConfig } from 'vite'
import * as  glob from "glob"

const fileArr = glob.globSync(["./src/**/*.[sS]pec.ts?(x)", "./src/**/*.[tT]est.ts?(x)"])

console.log("", fileArr)
const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: fileArr,
            formats: ["es"],
            name: "123"
        },
        outDir: './test',
        rollupOptions: {
            output: {
                preserveModules: true
            }
        }
    },
    esbuild: {
        jsx: 'automatic',
    },
})



export default config
