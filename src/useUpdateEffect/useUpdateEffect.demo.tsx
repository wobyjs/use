import { useEffect, $ } from 'voby'

import { useUpdateEffect } from '..'

export default function Component() {
  const data = $<number>(0)
  useEffect(() => {
    console.log('Normal useEffect', { data() })
  })

  useUpdateEffect(() => {
    console.log('Update useEffect only', { data() })
  }, [data()])

  return (
    <div>
      <p>Open your console</p>
      <button onClick={() => data(Date.now())}>Update data</button>
    </div>
  )
}
