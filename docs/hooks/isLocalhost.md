# isLocalhost

A computed observable that determines if the current host is localhost.

This observable automatically updates when the location changes and returns true if the current host includes 'localhost' in its name.

## Usage

```tsx
import { isLocalhost } from '@woby/use'

const MyComponent = () => {
  return (
    <div>
      {() => isLocalhost() ? 'Running on localhost' : 'Running on production'}
    </div>
  )
}
```

## Return Value

Returns an `Observable<boolean>` that is true when the current host is localhost.

## Use Cases

- Conditional rendering based on environment
- Enabling/disabling development features
- Implementing environment-specific behavior
- Building debugging tools that only appear in development
- Creating different API endpoints for development and production

## Implementation Details

The isLocalhost utility is a computed observable that uses the [useLocation](useLocation.md) hook to track the current location. It checks if the host portion of the URL includes 'localhost' (case-insensitive).

The observable automatically updates when the location changes, ensuring that the value stays current as users navigate through the application.

## Examples

### Environment-Based Rendering

```tsx
const EnvironmentIndicator = () => {
  return (
    <div>
      {() => isLocalhost() ? (
        <div className="dev-badge">Development</div>
      ) : (
        <div className="prod-badge">Production</div>
      )}
    </div>
  )
}
```

### Conditional Feature Enablement

```tsx
const DebugPanel = () => {
  return (
    <div>
      {() => isLocalhost() && (
        <div className="debug-panel">
          {/* Debug tools only shown in development */}
          <p>Debug information here</p>
        </div>
      )}
    </div>
  )
}
```

## See Also

- [useLocation hook](useLocation.md)
- [Woby documentation](https://github.com/vobyjs/woby) for more information about observables
- [Window.location documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)