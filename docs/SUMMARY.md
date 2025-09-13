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

- [use](hooks/use.md) - Convert values to observables
- [useCounter](hooks/useCounter.md) - Track numerical state with increment/decrement functions
- [useToggle](hooks/useToggle.md) - Toggle between two values
- [useBoolean](hooks/useBoolean.md) - Manage boolean state
- [useLocalStorage](hooks/useLocalStorage.md) - Manage localStorage values
- [useSessionStorage](hooks/useSessionStorage.md) - Manage sessionStorage values
- [useReadLocalStorage](hooks/useReadLocalStorage.md) - Read localStorage values
- [useDarkMode](hooks/useDarkMode.md) - Handle dark mode preferences
- [useWindowSize](hooks/useWindowSize.md) - Track window size changes
- [useDebounce](hooks/useDebounce.md) - Debounce values or functions
- [useInterval](hooks/useInterval.md) - Set up intervals
- [useTimeout](hooks/useTimeout.md) - Set up timeouts
- [useHover](hooks/useHover.md) - Track hover state
- [useClickAnyWhere](hooks/useClickAnyWhere.md) - Handle clicks anywhere
- [useClickAway](hooks/useClickAway.md) - Handle clicks outside elements
- [useOnClickOutside](hooks/useOnClickOutside.md) - Handle clicks outside elements
- [useEventListener](hooks/useEventListener.md) - Subscribe to events
- [useDocumentTitle](hooks/useDocumentTitle.md) - Set document title
- [useCopyToClipboard](hooks/useCopyToClipboard.md) - Copy text to clipboard
- [useFetch](hooks/useFetch.md) - Fetch data from URLs
- [useScript](hooks/useScript.md) - Load external scripts
- [useMap](hooks/useMap.md) - Manage Map state
- [useSet](hooks/useSet.md) - Manage Set state
- [useStep](hooks/useStep.md) - Manage step navigation
- [useCountdown](hooks/useCountdown.md) - Manage countdown timers
- [useTernaryDarkMode](hooks/useTernaryDarkMode.md) - Advanced dark mode management
- [useLockedBody](hooks/useLockedBody.md) - Lock body scrolling
- [useElementSize](hooks/useElementSize.md) - Track element size
- [useIntersectionObserver](hooks/useIntersectionObserver.md) - Observe element intersections
- [useImageOnLoad](hooks/useImageOnLoad.md) - Handle image loading
- [useScreen](hooks/useScreen.md) - Access screen information
- [useSsr](hooks/useSsr.md) - Handle server-side rendering
- [useIsClient](hooks/useIsClient.md) - Check if running on client
- [useIsFirstRender](hooks/useIsFirstRender.md) - Check first render
- [useIsMounted](hooks/useIsMounted.md) - Check if component is mounted
- [useEventCallback](hooks/useEventCallback.md) - Create event callbacks
- [useEffectOnce](hooks/useEffectOnce.md) - Run effect only once
- [useUpdateEffect](hooks/useUpdateEffect.md) - Run effect on updates
- [useIsomorphicLayoutEffect](hooks/useIsomorphicLayoutEffect.md) - Isomorphic layout effect
- [useDestruct](hooks/useDestruct.md) - Destructure objects and arrays
- [useGpsLocation](hooks/useGpsLocation.md) - Access GPS location
- [useId](hooks/useId.md) - Generate unique IDs
- [useInvert](hooks/useInvert.md) - Invert boolean values
- [useLocation](hooks/useLocation.md) - Access browser location
- [usePause](hooks/usePause.md) - Create timed delays
- [useScreenOrientation](hooks/useScreenOrientation.md) - Access screen orientation
- [useSelection](hooks/useSelection.md) - Access text selection
- [useTimer](hooks/useTimer.md) - Create timers
- [useTry](hooks/useTry.md) - Execute functions with error handling
- [useComputedStyle](hooks/useComputedStyle.md) - Access computed styles
- [Array](hooks/Array.md) - Render arrays with context
- [Object](hooks/Object.md) - Object utilities
- [Ratio](hooks/Ratio.md) - Render items with selection
- [Timeout](hooks/Timeout.md) - Delay rendering
- [isLocalhost](hooks/isLocalhost.md) - Check if running on localhost
- [useAspect](hooks/useAspect.md) - Calculate window aspect ratio
- [useViewportSize](hooks/useViewportSize.md) - Access visual viewport properties

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