import { ChangeEvent, useEffect, $ } from 'voby'

import { useDebounce } from '..'

export default function Component() {
  const value = $<string>('')
  const debouncedValue = useDebounce<string>(value(), 500)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    value(event.target.value())
  }

  // Fetch API (optional)
  useEffect(() => {
    // Do fetch here...
    // Triggers when "debouncedValue" changes
  })

  return (
    <div>
      <p>Value real-time: {value}</p>
      <p>Debounced value: {debouncedValue}</p>

      <input type="text" value={value} onChange={handleChange} />
    </div>
  )
}
