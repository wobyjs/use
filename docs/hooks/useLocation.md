# useLocation

A hook that provides reactive access to the browser's location object.

This hook returns an observable that contains the current window.location object and automatically updates when the URL changes through navigation, pushState, or replaceState operations. It's useful for building reactive UIs that respond to URL changes.

## Usage

```tsx
import { useLocation } from '@woby/use'

const MyComponent = () => {
  const location = useLocation()
  
  return (
    <div>
      <p>Current URL: {() => location().href}</p>
      <p>Current Path: {() => location().pathname}</p>
    </div>
  )
}
```

## Parameters

This hook does not take any parameters.

## Return Value

Returns an `Observable<Location>` containing the current Location object.

## Example

```tsx
const location = useLocation()

return (
  <div>
    <p>Current URL: {() => location().href}</p>
    <p>Current Path: {() => location().pathname}</p>
  </div>
)
```

## Use Cases

- Building reactive UIs that respond to URL changes
- Creating breadcrumb navigation components
- Implementing route-based conditional rendering
- Tracking user navigation patterns
- Building URL-aware components

## Implementation Details

The hook listens for several events to ensure it stays in sync with URL changes:

1. `popstate` event - triggered when the user navigates with the browser's back/forward buttons
2. Monkey-patches `window.history.pushState` and `window.history.replaceState` to detect programmatic navigation changes

When any of these events occur, the hook updates the observable with the current window.location object.

## Properties Available

The returned Location object contains all standard properties:

- `href` - The entire URL
- `origin` - The origin (protocol + hostname + port)
- `protocol` - The protocol (e.g., "http:" or "https:")
- `hostname` - The domain name
- `port` - The port number
- `pathname` - The path portion of the URL
- `search` - The query string
- `hash` - The fragment identifier
- `host` - The hostname and port

## See Also

- [Location API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Location)
- [Woby documentation](https://github.com/wobyjs/woby) for more information about observables