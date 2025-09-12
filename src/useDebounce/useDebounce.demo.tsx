import { ChangeEvent, useEffect, $, $$ } from 'woby'

import { useDebounce } from './useDebounce'

export default function Component() {
    const value = $<string>('')
    const debouncedValue = useDebounce<string>(value, 500)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        value(event.target.value())
    }

    // Fetch API (optional)
    useEffect(() => {
        // Do fetch here...
        // Triggers when "debouncedValue" changes
        console.log('Debounced value changed:', $$(debouncedValue))
    }, [$$(debouncedValue)])

    return (
        <div>
            <p>Value real-time: {value}</p>
            <p>Debounced value: {debouncedValue}</p>

            <input type="text" value={value} onChange={handleChange} />

            <h3>Example with existing observable</h3>
            <DebounceWithObservable />
        </div>
    )
}

function DebounceWithObservable() {
    const existingObservable = $<string>('initial')
    const debouncedValue = useDebounce<string>(existingObservable, 300)

    const updateValue = () => {
        existingObservable(prev => prev + ' updated')
    }

    return (
        <div>
            <p>Existing observable value: {existingObservable}</p>
            <p>Debounced value: {debouncedValue}</p>
            <button onClick={updateValue}>Update Value</button>
        </div>
    )
}