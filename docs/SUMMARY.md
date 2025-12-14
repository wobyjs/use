# Summary

## Documentation Structure

This documentation is organized into the following sections:

1. [README](README.md) - Main documentation index
2. [Getting Started](getting-started.md) - Installation and basic usage
3. [API Reference](api-reference.md) - Complete API documentation
4. [Examples](examples.md) - Practical usage examples
5. [Contributing](contributing.md) - Guidelines for contributors
6. [Hooks](hooks/) - Detailed documentation for individual hooks

## Key Documentation Pages

### State Management Hooks
- [use](hooks/use.md) - Convert values to observables
- [useBoolean](hooks/useBoolean.md) - Manage boolean state
- [useCounter](hooks/useCounter.md) - Track numerical state with increment/decrement functions
- [useToggle](hooks/useToggle.md) - Toggle between two values
- [useMap](hooks/useMap.md) - Manage Map-like state
- [useSet](hooks/useSet.md) - Manage Set state
- [Array](hooks/Array.md) - Render arrays with context
- [Object](hooks/Object.md) - Object utilities
- [Ratio](hooks/Ratio.md) - Render items with selection

### Browser Utilities
- [useLocalStorage](hooks/useLocalStorage.md) - Manage localStorage values
- [useSessionStorage](hooks/useSessionStorage.md) - Manage sessionStorage values
- [useReadLocalStorage](hooks/useReadLocalStorage.md) - Read localStorage values
- [useWindowSize](hooks/useWindowSize.md) - Track window size changes
- [useViewportSize](hooks/useViewportSize.md) - Access visual viewport properties
- [useAspect](hooks/useAspect.md) - Calculate window aspect ratio
- [useDarkMode](hooks/useDarkMode.md) - Handle dark mode preferences
- [useTernaryDarkMode](hooks/useTernaryDarkMode.md) - Advanced dark mode management
- [useMediaQuery](hooks/useMediaQuery.md) - Respond to media query changes
- [useCopyToClipboard](hooks/useCopyToClipboard.md) - Copy text to clipboard
- [useDocumentTitle](hooks/useDocumentTitle.md) - Set document title
- [useLockedBody](hooks/useLockedBody.md) - Lock body scrolling
- [useScreen](hooks/useScreen.md) - Access screen information
- [useScreenOrientation](hooks/useScreenOrientation.md) - Access screen orientation
- [useLocation](hooks/useLocation.md) - Access browser location
- [useGpsLocation](hooks/useGpsLocation.md) - Access GPS location

### Event Hooks
- [useEventListener](hooks/useEventListener.md) - Subscribe to events
- [useClickAnyWhere](hooks/useClickAnyWhere.md) - Handle clicks anywhere
- [useClickAway](hooks/useClickAway.md) - Handle clicks outside elements
- [useOnClickOutside](hooks/useOnClickOutside.md) - Handle clicks outside elements
- [useHover](hooks/useHover.md) - Track hover state

### Effect Hooks
- [useDebounce](hooks/useDebounce.md) - Debounce values or functions
- [useTimeout](hooks/useTimeout.md) - Set up timeouts
- [useInterval](hooks/useInterval.md) - Set up intervals
- [useEffectOnce](hooks/useEffectOnce.md) - Run effect only once
- [useUpdateEffect](hooks/useUpdateEffect.md) - Run effect on updates
- [useIsomorphicLayoutEffect](hooks/useIsomorphicLayoutEffect.md) - Isomorphic layout effect

### Timer Hooks
- [useCountdown](hooks/useCountdown.md) - Manage countdown timers
- [useTimer](hooks/useTimer.md) - Create timers
- [usePause](hooks/usePause.md) - Create timed delays
- [Timeout](hooks/Timeout.md) - Delay rendering

### Navigation & Routing
- [useStep](hooks/useStep.md) - Manage step navigation

### UI & DOM Hooks
- [useElementSize](hooks/useElementSize.md) - Track element size
- [useIntersectionObserver](hooks/useIntersectionObserver.md) - Observe element intersections
- [useImageOnLoad](hooks/useImageOnLoad.md) - Handle image loading
- [useSelection](hooks/useSelection.md) - Access text selection
- [useComputedStyle](hooks/useComputedStyle.md) - Access computed styles

### Network Hooks
- [useFetch](hooks/useFetch.md) - Fetch data from URLs
- [useScript](hooks/useScript.md) - Load external scripts

### SSR & Environment Hooks
- [useSsr](hooks/useSsr.md) - Handle server-side rendering
- [useIsClient](hooks/useIsClient.md) - Check if running on client
- [useIsFirstRender](hooks/useIsFirstRender.md) - Check first render
- [useIsMounted](hooks/useIsMounted.md) - Check if component is mounted

### Utility Hooks
- [useEventCallback](hooks/useEventCallback.md) - Create event callbacks
- [useId](hooks/useId.md) - Generate unique IDs
- [useDestruct](hooks/useDestruct.md) - Destructure objects and arrays
- [useInvert](hooks/useInvert.md) - Invert boolean values
- [useTry](hooks/useTry.md) - Execute functions with error handling
- [isLocalhost](hooks/isLocalhost.md) - Check if running on localhost
- [useChanged](hooks/useChanged.md) - Track value changes
- [useWith](hooks/useWith.md) - Use observable values with callbacks

## Development Resources

- [Contributing Guide](contributing.md) - How to contribute to the project
- [API Reference](api-reference.md) - Complete list of all available hooks
- [Examples](examples.md) - Sample implementations

## Repository Structure

```
@woby/use/
├── demo/           # Example implementations
├── dist/           # Built files
├── docs/           # Documentation
│   ├── hooks/      # Individual hook documentation
│   └── ...         # General documentation files
├── src/            # Source code
└── test/           # Test files
```