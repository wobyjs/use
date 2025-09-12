# useTimer

A hook that provides timer functionality with start, pause, split, and stop capabilities.

This hook implements a comprehensive timer that can track elapsed time, record laps, and manage different timer states. It's useful for building stopwatch applications, timing user interactions, or measuring performance.

## Usage

```tsx
import { useTimer } from '@woby/use'

const MyComponent = () => {
  const { start, pause, split, stop, total, laps } = useTimer()
  
  return (
    <div>
      <p>Total time: {total}ms</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={() => split('Lap')}>Split</button>
      <button onClick={() => stop('Finish')}>Stop</button>
      
      <ul>
        {laps().map((lap, index) => (
          <li key={index}>{lap.message}: {lap.ms}ms</li>
        ))}
      </ul>
    </div>
  )
}
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| startImmediately | `boolean` | Whether to start the timer immediately (default: true) |

## Return Value

Returns an object containing:

- `start`: Function to start the timer
- `pause`: Function to pause the timer
- `split`: Function to record a lap time
- `stop`: Function to stop the timer
- `total`: Observable containing the total elapsed time in milliseconds
- `reset`: Function to reset the timer
- `laps`: Observable array containing lap times

## Example

```tsx
const { start, pause, split, stop, total, laps } = useTimer()

return (
  <div>
    <p>Total time: {total}ms</p>
    <button onClick={start}>Start</button>
    <button onClick={pause}>Pause</button>
    <button onClick={() => split('Lap')}>Split</button>
    <button onClick={() => stop('Finish')}>Stop</button>
    
    <ul>
      {laps().map((lap, index) => (
        <li key={index}>{lap.message}: {lap.ms}ms</li>
      ))}
    </ul>
  </div>
)
```

## Timer Functions

| Function | Description |
| -------- | ----------- |
| `start()` | Starts the timer |
| `pause()` | Pauses the timer |
| `split(message?: string)` | Records a lap time with an optional message |
| `stop(message?: string)` | Stops the timer and records a final lap with an optional message |
| `reset()` | Resets the timer to its initial state |

## Timer Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `total` | `Observable<number>` | Total elapsed time in milliseconds |
| `laps` | `Observable<TimerMessage[]>` | Array of lap times with messages |

## TimerMessage Interface

| Property | Type | Description |
| -------- | ---- | ----------- |
| `message` | `string` | The message associated with the lap |
| `ms` | `number` | The elapsed time in milliseconds |

## Use Cases

- Building stopwatch applications
- Timing user interactions for analytics
- Measuring performance of operations
- Creating timed quizzes or games
- Tracking workout sessions

## Implementation Details

The hook uses `Date.now()` to track time and manages different timer states (running, paused, stopped). It automatically cleans up when the component unmounts by stopping the timer.

Lap times are recorded with messages and can be used to track segments of time. The total time accumulates all elapsed time.

## See Also

- [Date.now() documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now)
- [Woby documentation](https://github.com/vobyjs/woby) for more information about observables