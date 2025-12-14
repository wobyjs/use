# Hooks

This directory contains documentation for individual hooks in the @woby/use library.

## Available Hooks

### State Management
- [use](use.md) - Convert values to observables
- [useBoolean](useBoolean.md) - Manage boolean state
- [useCounter](useCounter.md) - Track numerical state with increment/decrement functions
- [useToggle](useToggle.md) - Toggle between two values
- [useMap](useMap.md) - Manage Map-like state
- [useSet](useSet.md) - Manage Set state
- [Array](Array.md) - Render arrays with context
- [Object](Object.md) - Object utilities
- [Ratio](Ratio.md) - Render items with selection

### Browser Utilities
- [useLocalStorage](useLocalStorage.md) - Manage localStorage values
- [useSessionStorage](useSessionStorage.md) - Manage sessionStorage values
- [useReadLocalStorage](useReadLocalStorage.md) - Read localStorage values
- [useWindowSize](useWindowSize.md) - Track window size changes
- [useViewportSize](useViewportSize.md) - Access visual viewport properties
- [useAspect](useAspect.md) - Calculate window aspect ratio
- [useDarkMode](useDarkMode.md) - Handle dark mode preferences
- [useTernaryDarkMode](useTernaryDarkMode.md) - Advanced dark mode management
- [useMediaQuery](useMediaQuery.md) - Respond to media query changes
- [useCopyToClipboard](useCopyToClipboard.md) - Copy text to clipboard
- [useDocumentTitle](useDocumentTitle.md) - Set document title
- [useLockedBody](useLockedBody.md) - Lock body scrolling
- [useScreen](useScreen.md) - Access screen information
- [useScreenOrientation](useScreenOrientation.md) - Access screen orientation
- [useLocation](useLocation.md) - Access browser location
- [useGpsLocation](useGpsLocation.md) - Access GPS location

### Event Hooks
- [useEventListener](useEventListener.md) - Subscribe to events
- [useClickAnyWhere](useClickAnyWhere.md) - Handle clicks anywhere
- [useClickAway](useClickAway.md) - Handle clicks outside elements
- [useOnClickOutside](useOnClickOutside.md) - Handle clicks outside elements
- [useHover](useHover.md) - Track hover state

### Effect Hooks
- [useDebounce](useDebounce.md) - Debounce values or functions
- [useTimeout](useTimeout.md) - Set up timeouts
- [useInterval](useInterval.md) - Set up intervals
- [useEffectOnce](useEffectOnce.md) - Run effect only once
- [useUpdateEffect](useUpdateEffect.md) - Run effect on updates
- [useIsomorphicLayoutEffect](useIsomorphicLayoutEffect.md) - Isomorphic layout effect

### Timer Hooks
- [useCountdown](useCountdown.md) - Manage countdown timers
- [useTimer](useTimer.md) - Create timers
- [usePause](usePause.md) - Create timed delays
- [Timeout](Timeout.md) - Delay rendering

### Navigation & Routing
- [useStep](useStep.md) - Manage step navigation

### UI & DOM Hooks
- [useElementSize](useElementSize.md) - Track element size
- [useIntersectionObserver](useIntersectionObserver.md) - Observe element intersections
- [useImageOnLoad](useImageOnLoad.md) - Handle image loading
- [useSelection](useSelection.md) - Access text selection
- [useComputedStyle](useComputedStyle.md) - Access computed styles

### Network Hooks
- [useFetch](useFetch.md) - Fetch data from URLs
- [useScript](useScript.md) - Load external scripts

### SSR & Environment Hooks
- [useSsr](useSsr.md) - Handle server-side rendering
- [useIsClient](useIsClient.md) - Check if running on client
- [useIsFirstRender](useIsFirstRender.md) - Check first render
- [useIsMounted](useIsMounted.md) - Check if component is mounted

### Utility Hooks
- [useEventCallback](useEventCallback.md) - Create event callbacks
- [useId](useId.md) - Generate unique IDs
- [useDestruct](useDestruct.md) - Destructure objects and arrays
- [useInvert](useInvert.md) - Invert boolean values
- [useTry](useTry.md) - Execute functions with error handling
- [isLocalhost](isLocalhost.md) - Check if running on localhost
- [useChanged](useChanged.md) - Track value changes
- [useWith](useWith.md) - Use observable values with callbacks

Each hook documentation includes:
- API description
- Parameter details
- Return values
- Usage examples
- Implementation details