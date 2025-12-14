import { $, $$ } from 'woby'
import { test, expect } from '@woby/chk'
import { useTimer } from './useTimer'

test('useTimer hook', () => {
    test('should initialize with correct default values', () => {
        const timer = useTimer(false) // Don't start immediately

        expect($$(timer.total))['==='](0)
        expect($$(timer.laps).length)['==='](0)
    })

    test('should have callable methods', () => {
        const timer = useTimer(false)

        // Just test that methods exist and are callable
        expect(typeof timer.start)['===']('function')
        expect(typeof timer.pause)['===']('function')
        expect(typeof timer.split)['===']('function')
        expect(typeof timer.stop)['===']('function')
        expect(typeof timer.reset)['===']('function')
    })

    test('should add lap when split is called', () => {
        const timer = useTimer(true)

        timer.split('Test lap')
        expect($$(timer.laps).length)['==='](1)
        expect($$(timer.laps)[0].message)['===']('Test lap')
    })

    test('should reset timer when reset is called', () => {
        const timer = useTimer(true)

        // Add some data
        timer.split('Test lap')

        timer.reset()
        expect($$(timer.total))['==='](0)
        expect($$(timer.laps).length)['==='](0)
    })
})