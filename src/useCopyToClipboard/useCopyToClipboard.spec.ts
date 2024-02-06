import { act, renderHook, jest, test } from 'woby-jasmine'

import { useCopyToClipboard } from './useCopyToClipboard'
describe('useClipboard()', () => {
    const originalClipboard = globalThis.navigator.clipboard.writeText
    const mockData = 'Test value'

    beforeEach(() => {
        const mockClipboard = {
            writeText: jest.fn(),
        }
        // @ts-ignore mock clipboard
        globalThis.navigator.clipboard.writeText = jest.fn()
    })

    afterEach(() => {
        jest.resetAllMocks()
        // @ts-ignore mock clipboard
        globalThis.navigator.clipboard.writeText = originalClipboard
    })

    test('should use clipboard', () => {
        const { result } = renderHook(() => useCopyToClipboard())

        expect(result.current[0]()).toBe(null)
        expect(typeof result.current[1]).toBe('function')
    })

    test('should copy to the clipboard and the state', async () => {
        const { result } = renderHook(() => useCopyToClipboard())

        await act(async () => {
            await result.current[1](mockData)
        })

        expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1)
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockData)
        expect(result.current[0]()).toBe(mockData)
    })
})
