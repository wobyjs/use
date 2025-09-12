# useEffectOnce

A hook that runs an effect only once, similar to componentDidMount in class components.

## Import

```typescript
import { useEffectOnce } from '@woby/use'
```

## Usage

```tsx
import { useEffectOnce } from '@woby/use'

function MyComponent() {
  useEffectOnce(() => {
    console.log('This will only run once when the component mounts')
    
    // Cleanup function (optional)
    return () => {
      console.log('This will run when the component unmounts')
    }
  })
  
  return <div>Component content</div>
}
```

## Parameters

| Name   | Type     | Description                           |
|--------|----------|---------------------------------------|
| effect | Function | The effect function to run once       |

## Examples

### Basic Usage

```tsx
import { $, useEffectOnce } from '@woby/use'

function Component() {
  const data = $<number>(0)
  
  useEffectOnce(() => {
    console.log('Triggered only once, on mount', { data() })
  })

  return (
    <div>
      <p>Open your console</p>
      <button onClick={() => data(Date.now())}>Update data</button>
    </div>
  )
}
```

### With API Call

```tsx
import { $, useEffectOnce } from '@woby/use'

function UserProfile({ userId }) {
  const user = $<User | null>(null)
  const loading = $<boolean>(true)
  
  useEffectOnce(() => {
    fetchUser(userId)
      .then(userData => {
        user(userData)
        loading(false)
      })
      .catch(error => {
        console.error('Failed to fetch user:', error)
        loading(false)
      })
  })

  return (
    <div>
      {() => $$(loading) ? (
        <p>Loading...</p>
      ) : $$(user) ? (
        <div>
          <h2>{$$(user).name}</h2>
          <p>{$$(user).email}</p>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  )
}
```

## API Reference

```typescript
function useEffectOnce(effect: () => void | (() => void)): void
```

## Notes

- Runs the effect only once when the component mounts
- The effect function can return a cleanup function that will run when the component unmounts
- Similar to `useEffect(effect, [])` but with a more explicit name
- Useful for initialization logic, API calls, or setting up subscriptions
- Built on top of React's useEffect hook