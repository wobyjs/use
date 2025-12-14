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
- [`use`](./docs/hooks/use.md) - Convert values to observables with optional cloning

### State Management
- [`useBoolean`](./docs/hooks/useBoolean.md) - Tracks state of a boolean value
- [`useCounter`](./docs/hooks/useCounter.md) - Tracks numerical state with increment/decrement functions
- [`useToggle`](./docs/hooks/useToggle.md) - Toggles between two values
- [`useMap`](./docs/hooks/useMap.md) - Tracks state of a Map
- [`useSet`](./docs/hooks/useSet.md) - Tracks state of a Set
- [`useStep`](./docs/hooks/useStep.md) - Manages step navigation
- [`useCountdown`](./docs/hooks/useCountdown.md) - Manages countdown timers

### Browser Utilities
- [`useLocalStorage`](./docs/hooks/useLocalStorage.md) - Manages localStorage values
- [`useSessionStorage`](./docs/hooks/useSessionStorage.md) - Manages sessionStorage values
- [`useReadLocalStorage`](./docs/hooks/useReadLocalStorage.md) - Reads localStorage values
- [`useWindowSize`](./docs/hooks/useWindowSize.md) - Tracks window size changes
- [`useAspect`](./docs/hooks/useAspect.md) - Calculates window aspect ratio
- [`useViewportSize`](./docs/hooks/useViewportSize.md) - Accesses visual viewport properties
- [`useDarkMode`](./docs/hooks/useDarkMode.md) - Tracks and toggles dark mode state
- [`useTernaryDarkMode`](./docs/hooks/useTernaryDarkMode.md) - Advanced dark mode management
- [`useMediaQuery`](./docs/hooks/useMediaQuery.md) - Tracks media query matches
- [`useCopyToClipboard`](./docs/hooks/useCopyToClipboard.md) - Copies text to clipboard
- [`useDocumentTitle`](./docs/hooks/useDocumentTitle.md) - Sets the document title
- [`useLockedBody`](./docs/hooks/useLockedBody.md) - Locks body scrolling
- [`useElementSize`](./docs/hooks/useElementSize.md) - Tracks element size
- [`useIntersectionObserver`](./docs/hooks/useIntersectionObserver.md) - Observes element intersections
- [`useImageOnLoad`](./docs/hooks/useImageOnLoad.md) - Handles image loading
- [`useScreen`](./docs/hooks/useScreen.md) - Accesses screen information
- [`useGpsLocation`](./docs/hooks/useGpsLocation.md) - Accesses GPS location
- [`useLocation`](./docs/hooks/useLocation.md) - Accesses browser location
- [`useScreenOrientation`](./docs/hooks/useScreenOrientation.md) - Accesses screen orientation
- [`useSelection`](./docs/hooks/useSelection.md) - Accesses text selection

### Events
- [`useEventListener`](./docs/hooks/useEventListener.md) - Subscribes to events
- [`useClickAnyWhere`](./docs/hooks/useClickAnyWhere.md) - Subscribes a callback to clicks anywhere on the page
- [`useClickAway`](./docs/hooks/useClickAway.md) - Detects clicks outside an element
- [`useOnClickOutside`](./docs/hooks/useOnClickOutside.md) - Detects clicks outside an element

### Effects
- [`useDebounce`](./docs/hooks/useDebounce.md) - Debounces a value or function
- [`useTimeout`](./docs/hooks/useTimeout.md) - Sets up a timeout that runs a callback
- [`useInterval`](./docs/hooks/useInterval.md) - Sets up an interval that runs a callback
- [`useIsomorphicLayoutEffect`](./docs/hooks/useIsomorphicLayoutEffect.md) - useLayoutEffect in browser, useEffect in server
- [`useEffectOnce`](./docs/hooks/useEffectOnce.md) - Runs an effect only once
- [`useUpdateEffect`](./docs/hooks/useUpdateEffect.md) - Runs an effect on updates only

### Utility
- [`useFetch`](./docs/hooks/useFetch.md) - Fetches data from a URL
- [`useScript`](./docs/hooks/useScript.md) - Loads external scripts
- [`useHover`](./docs/hooks/useHover.md) - Tracks hover state of an element
- [`useDestruct`](./docs/hooks/useDestruct.md) - Destructures objects and arrays
- [`useEventCallback`](./docs/hooks/useEventCallback.md) - Creates stable event callbacks
- [`useId`](./docs/hooks/useId.md) - Generates unique IDs
- [`useInvert`](./docs/hooks/useInvert.md) - Inverts boolean values
- [`usePause`](./docs/hooks/usePause.md) - Creates timed delays
- [`useTimer`](./docs/hooks/useTimer.md) - Creates timers
- [`useTry`](./docs/hooks/useTry.md) - Executes functions with error handling

### Environment
- [`useSsr`](./docs/hooks/useSsr.md) - Handles server-side rendering
- [`useIsClient`](./docs/hooks/useIsClient.md) - Checks if running on client
- [`useIsFirstRender`](./docs/hooks/useIsFirstRender.md) - Checks if it's the first render
- [`useIsMounted`](./docs/hooks/useIsMounted.md) - Checks if component is mounted

## Documentation

Check out our [full documentation](./docs/README.md) for detailed information about each hook:

- [Getting Started Guide](./docs/getting-started.md)
- [API Reference](./docs/api-reference.md)
- [Hook Documentation](./docs/hooks/README.md)
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

- [Voby](https://github.com/wobyjs/woby) - A reactive JavaScript framework
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces