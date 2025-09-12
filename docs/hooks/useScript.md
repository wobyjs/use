# useScript

A hook for loading external scripts dynamically.

## Import

```typescript
import { useScript } from '@woby/use'
```

## Usage

```tsx
import { useScript } from '@woby/use'

function MyComponent() {
  const status = useScript('https://code.jquery.com/jquery-3.5.1.min.js')
  
  return (
    <div>
      <p>Script status: {status}</p>
      {status() === 'ready' && <p>Script is loaded and ready to use</p>}
    </div>
  )
}
```

## Parameters

| Name    | Type             | Description                    |
|---------|------------------|--------------------------------|
| src     | string \| null   | The URL of the script to load  |
| options | UseScriptOptions | Optional configuration options |

### UseScriptOptions

| Property          | Type    | Description                                    |
|-------------------|---------|------------------------------------------------|
| shouldPreventLoad | boolean | If true, prevents the script from loading      |
| removeOnUnmount   | boolean | If true, removes the script when component unmounts |

## Return Value

Returns an observable containing the current status of the script loading process.

Possible status values:
- `'idle'` - Script loading hasn't started
- `'loading'` - Script is currently loading
- `'ready'` - Script has loaded successfully
- `'error'` - Script failed to load

## Examples

### Basic Usage

```tsx
import { useScript } from '@woby/use'

function ScriptLoader() {
  const status = useScript('https://code.jquery.com/jquery-3.5.1.min.js')
  
  return (
    <div>
      <p>Current status: {status}</p>
      {status() === 'ready' && <p>You can use the script here.</p>}
    </div>
  )
}
```

### With Options

```tsx
import { useScript } from '@woby/use'

function ScriptLoaderWithOptions() {
  const status = useScript('https://code.jquery.com/jquery-3.5.1.min.js', {
    removeOnUnmount: true,
  })
  
  return (
    <div>
      <p>Script status: {status}</p>
    </div>
  )
}
```

## API Reference

```typescript
function useScript(
  src: string | null, 
  options?: UseScriptOptions
): Observable<UseScriptStatus>

type UseScriptStatus = 'idle' | 'loading' | 'ready' | 'error'

interface UseScriptOptions {
  shouldPreventLoad?: boolean
  removeOnUnmount?: boolean
}
```

## Notes

- The hook handles script caching to prevent loading the same script multiple times
- Automatically cleans up event listeners when the component unmounts
- Supports SSR by returning 'loading' status on the server
- Can be configured to remove the script element when the component unmounts