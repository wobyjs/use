# @woby/use

A collection of essential React hooks designed for both React and Voby environments. This library provides a set of utility hooks that help you build better applications with less code.

## Installation

```bash
# Using npm
npm install @woby/use

# Using yarn
yarn add @woby/use

# Using pnpm
pnpm add @woby/use
```

## Quick Start

```javascript
import { useToggle, useCounter, useLocalStorage } from '@woby/use';

function MyComponent() {
  const [value, toggle] = useToggle(false);
  const { count, increment, decrement } = useCounter(0);
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <div>
      <p>Toggle value: {() => $(value) ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
      
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name" 
      />
    </div>
  );
}
```

## Available Hooks

### Core
- `use` - Convert values to observables with optional cloning

### State Management
- `useBoolean` - Tracks state of a boolean value
- `useCounter` - Tracks numerical state with increment/decrement functions
- `useToggle` - Toggles between two values
- `useMap` - Tracks state of a Map
- `useSet` - Tracks state of a Set
- `useStep` - Manages step navigation
- `useCountdown` - Manages countdown timers

### Browser Utilities
- `useLocalStorage` - Manages localStorage values
- `useSessionStorage` - Manages sessionStorage values
- `useReadLocalStorage` - Reads localStorage values
- `useWindowSize` - Tracks window size changes
- `useAspect` - Calculates window aspect ratio
- `useViewportSize` - Accesses visual viewport properties
- `useDarkMode` - Tracks and toggles dark mode state
- `useTernaryDarkMode` - Advanced dark mode management
- `useMediaQuery` - Tracks media query matches
- `useCopyToClipboard` - Copies text to clipboard
- `useDocumentTitle` - Sets the document title
- `useLockedBody` - Locks body scrolling
- `useElementSize` - Tracks element size
- `useIntersectionObserver` - Observes element intersections
- `useImageOnLoad` - Handles image loading
- `useScreen` - Accesses screen information
- `useGpsLocation` - Accesses GPS location
- `useLocation` - Accesses browser location
- `useScreenOrientation` - Accesses screen orientation
- `useSelection` - Accesses text selection

### Events
- `useEventListener` - Subscribes to events
- `useClickAnyWhere` - Subscribes a callback to clicks anywhere on the page
- `useClickAway` - Detects clicks outside an element
- `useOnClickOutside` - Detects clicks outside an element

### Effects
- `useDebounce` - Debounces a value or function
- `useTimeout` - Sets up a timeout that runs a callback
- `useInterval` - Sets up an interval that runs a callback
- `useIsomorphicLayoutEffect` - useLayoutEffect in browser, useEffect in server
- `useEffectOnce` - Runs an effect only once
- `useUpdateEffect` - Runs an effect on updates only

### Utility
- `useFetch` - Fetches data from a URL
- `useScript` - Loads external scripts
- `useHover` - Tracks hover state of an element
- `useDestruct` - Destructures objects and arrays
- `useEventCallback` - Creates stable event callbacks
- `useId` - Generates unique IDs
- `useInvert` - Inverts boolean values
- `usePause` - Creates timed delays
- `useTimer` - Creates timers
- `useTry` - Executes functions with error handling

### Environment
- `useSsr` - Handles server-side rendering
- `useIsClient` - Checks if running on client
- `useIsFirstRender` - Checks if it's the first render
- `useIsMounted` - Checks if component is mounted

## Documentation

Check out our [full documentation](./docs) for detailed information about each hook:

- [Getting Started Guide](./docs/getting-started.md)
- [API Reference](./docs/api-reference.md)
- [Hook Documentation](./docs/hooks/)
- [Examples](./docs/examples.md)
- [Contributing Guide](./docs/contributing.md)

## Development

```bash
# Clone the repository
git clone https://github.com/wobyjs/use
cd @woby/use

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build:web

# Run tests
pnpm test

# Serve documentation
pnpm docs
```

## Framework Compatibility

The hooks in this library are designed to work with:
- React (16.8+)
- Voby (with appropriate JSX configuration)

## TypeScript Support

All hooks come with full TypeScript support and type definitions included.

## Contributing

Contributions are welcome! Please read our [contributing guide](./docs/contributing.md) to get started.

## License

MIT

## Related Projects

- [Voby](https://github.com/vobyjs/woby) - A reactive JavaScript framework
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces