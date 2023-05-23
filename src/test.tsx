// export * from './useBoolean/useBoolean'
// import { __ } from 'https://deno.land/x/dirname/mod.ts'
// const { __filename, __dirname } = __(import.meta)

// console.log(__dirname)
// console.log(__filename)
// debugger

// global.__dirname = ''

// import 'jasmine-core/lib/jasmine-core/jasmine-html.js'
// // import 'jasmine-core/lib/jasmine-core/boot0.js'
// // import 'jasmine-core/lib/jasmine-core/boot1.js'

import './test.style.css'

// import 'jasmine-core/lib/jasmine-core/jasmine.js'


import './tests.ts'



    ; (function bootstrap() {
        if (window.jasmineRef) {
            location.reload()
            return
        }
        window.onload(new Event(null))
        window.jasmineRef = jasmine.getEnv()
    }())