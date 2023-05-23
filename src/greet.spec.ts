import { describe, it, expect } from 'jasmine-core'

import { greet } from './greet'

debugger
describe('greet', () => {
    it('should greet with correct name', () => {
        const name: string = 'Arthur'
        const greeting: string = greet(name)
        expect(greeting).toBe('Hello Arthur!')
    })
})
