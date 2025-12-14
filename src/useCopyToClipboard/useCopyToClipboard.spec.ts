import { test, expect, spyOn } from '@woby/chk'
import { $$ } from 'woby'
import { useCopyToClipboard } from './useCopyToClipboard'

test('useClipboard()', () => {
    const mockData = 'Test value'

    test('should use clipboard', () => {
        // Since we don't have renderHook, we'll test the function directly
        const [value, copyToClipboard] = useCopyToClipboard()

        expect($$(value)).toBe(null)
        expect(copyToClipboard).toBeTypeOf('function')
    })

    test('should copy to the clipboard and the state', async ({ expect }) => {
        // Create a proper mock with correct context
        const mockWriteText = (...args) => Promise.resolve()
        const writeTextSpy = spyOn(navigator.clipboard, 'writeText').mockImplementation(mockWriteText)

        // Test the function directly
        const [value, copyToClipboard] = useCopyToClipboard()

        const result = await copyToClipboard(mockData)

        expect(result).toBe(true)
        expect(writeTextSpy).toHaveBeenCalledTimes(1)
        expect(writeTextSpy).toHaveBeenCalledWith(mockData)
        expect($$(value)).toBe(mockData)
    })


})