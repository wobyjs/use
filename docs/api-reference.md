# API Reference

This document provides a comprehensive reference for all hooks, components, and utilities available in the `@woby/use` library. Each entry includes usage examples and parameter descriptions to help you integrate these tools into your applications effectively.

## Core Hooks

### use

Converts a value or observable into an observable.

```typescript
const observable = use(value: ObservableMaybe<T> | T, shouldClone?: boolean, def?: ObservableMaybe<T> | T);
```

### useBoolean

Manages boolean state with utility functions.

```typescript
const { value, setTrue, setFalse, toggle } = useBoolean(defaultValue?: ObservableMaybe<boolean>);
```

### useCounter

Manages numerical state with increment/decrement functions.

```typescript
const { count, increment, decrement, reset, setCount } = useCounter(initialValue?: ObservableMaybe<number>, clone?: boolean);
```

### useToggle

Toggles between two values.

```typescript
const [value, toggle] = useToggle<T>(defaultValue: ObservableMaybe<T>, nextValue?: T, clone?: boolean);
```

### useLocalStorage

Manages localStorage values.

```typescript
const value = useLocalStorage<T>(key: string, initialValue?: ObservableMaybe<T>, options?: { removeOnNull?: boolean, readonly?: boolean });
```

**Options:**
- `removeOnNull`: If true, setting the value to null will remove the item from localStorage
- `readonly`: If true, returns a readonly observable that can only read from localStorage

### useSessionStorage

Manages sessionStorage values.

```typescript
const value = useSessionStorage<T>(key: string, initialValue?: ObservableMaybe<T>, options?: { removeOnNull?: boolean, readonly?: boolean });
```

**Options:**
- `removeOnNull`: If true, setting the value to null will remove the item from sessionStorage
- `readonly`: If true, returns a readonly observable that can only read from sessionStorage

### useReadLocalStorage (Deprecated)

Reads localStorage values.

**Deprecated:** Use `useLocalStorage(key, initialValue, { readonly: true })` instead.

```typescript
const value = useReadLocalStorage<T>(key: string);
```

### useWindowSize

Tracks window size changes.

```typescript
const { width, height } = useWindowSize();
```

## State Management Hooks

### useMap

Tracks state of a Map-like object.

```typescript
const [map, { set, setAll, remove, reset, entries }] = useMap<T extends MapOrEntries>(initialState?: T);
```

### useSet

Tracks state of a Set.

```typescript
const [set, { add, remove, clear, reset, entries }] = useSet<T>(initialState?: SetOrEntries<T>);
```

### useArray

Tracks state of an array.

```typescript
const { value, setValue, add, clear, removeAt, remove } = useArray(initialValue?: any[]);
```

### useStep

Manages step navigation.

```typescript
const [currentStep, helpers] = useStep(maxStep: number | Observable<number>);
```

### useCountdown

Manages countdown timers.

```typescript
const [count, { start, stop, reset }] = useCountdown(seconds: number);
```

### useDestruct

Destructures properties from objects or elements from arrays.

```typescript
const { property } = useDestruct(object: Observable<T> | T, ...keys: (keyof T)[]);
```

## Event Hooks

### useEventListener

Subscribes to events.

```typescript
useEventListener(eventName: string, handler: Function, element?: HTMLElement);
```

### useClickAnyWhere

Subscribes a callback to clicks anywhere on the page.

```typescript
useClickAnyWhere(handler: Function);
```

### useClickAway

Detects clicks outside an element.

```typescript
useClickAway(ref: Observable<T>, clickEvent: Function);
```

### useOnClickOutside

Detects clicks outside an element.

```typescript
useOnClickOutside(ref: RefObject<HTMLElement>, handler: Function);
```

### useHover

Tracks hover state of an element.

```typescript
const isHovered = useHover<T extends HTMLElement>(elementRef: Observable<T> | T);
```

## Effect Hooks

### useDebounce

Debounces a value or function.

```typescript
const debouncedValue = useDebounce(value: any, delay: number);
```

### useTimeout

A simple alias for the native `setTimeout` function.

```typescript
const timeoutId = useTimeout(callback: () => void, delay: number);
```

### useInterval

Sets up an interval that runs a callback.

```typescript
const [start, stop] = useInterval(callback: Function, delay: number | Observable<number>);
```

### useEffectOnce

Runs an effect only once during the component's lifecycle.

```typescript
useEffectOnce(effect: Parameters<typeof useEffect>[0]);
```

### useUpdateEffect

Runs an effect on updates only (not on mount).

```typescript
useUpdateEffect(effect: EffectCallback, deps?: DependencyList);
```

### useIsomorphicLayoutEffect

Currently an alias for useEffect.

```typescript
const useIsomorphicLayoutEffect: typeof useEffect = useEffect;
```

## Browser Hooks

### useDarkMode

Tracks and toggles dark mode state.

```typescript
const { darkmode, toggle, enable, disable } = useDarkMode(initialValue?: boolean | Observable<boolean>);
```

### useTernaryDarkMode

Advanced dark mode management with 'auto' state.

```typescript
const { 
  isDarkMode, 
  ternaryDarkMode, 
  setTernaryDarkMode, 
  toggleTernaryDarkMode 
} = useTernaryDarkMode();
```

### useMediaQuery

Tracks media query matches.

```typescript
const matches = useMediaQuery(query: string);
```

### useCopyToClipboard

Copies text to clipboard.

```typescript
const [copied, copy, reset] = useCopyToClipboard();
```

### useDocumentTitle

Sets the document title.

```typescript
useDocumentTitle(title: string | Observable<string>): void;
```

### useLockedBody

Locks body scrolling.

```typescript
const isLocked = useLockedBody(initialLocked?: boolean, rootId?: string);
```

### useElementSize

Tracks element size.

```typescript
const { width, height } = useElementSize<T extends HTMLElement>(elementRef: Observable<T> | T);
```

### useIntersectionObserver

Observes element intersections.

```typescript
const entry = useIntersectionObserver<T extends HTMLElement>(elementRef: Observable<T> | T, options?: IntersectionObserverInit);
```

### useImageOnLoad

Handles image loading.

```typescript
const { onLoad, onError } = useImageOnLoad();
```

### useScreen

Accesses screen information.

```typescript
const screen = useScreen();
```

### useSsr

Handles server-side rendering.

```typescript
const { isBrowser, isServer } = useSsr();
```

### useGpsLocation

Accesses GPS location information.

```typescript
const { location, error } = useGpsLocation(options?: GpsLocationOptions);
```

### useLocation

Accesses browser location information.

```typescript
const location = useLocation();
```

### useScreenOrientation

Accesses screen orientation information.

```typescript
const { angle, type } = useScreenOrientation();
```

### useSelection

Accesses text selection information.

```typescript
const { selection, anchorNode, anchorOffset, focusNode, focusOffset, isCollapsed, rangeCount, type, ranges } = useSelection(element?: ObservableMaybe<HTMLElement>);
```

## Utility Hooks

### useIsClient

Checks if running on client.

```typescript
const isClient = useIsClient();
```

### useIsFirstRender

Checks if it's the first render.

```typescript
const isFirstRender = useIsFirstRender();
```

### useIsMounted

Checks if component is mounted.

```typescript
const isMounted = useIsMounted();
```

### useEventCallback

Creates stable event callbacks.

```typescript
const callback = useEventCallback(fn: Function);
```

### useFetch

Fetches data from a URL.

```typescript
const { data, error, loading } = useFetch(url: string, options?: RequestInit);
```

### useScript

Loads external scripts.

```typescript
const status = useScript(src: string, options?: ScriptOptions);
```

### useId

Generates unique IDs.

```typescript
const id = useId();
```

### useInvert

Creates an inverted observable boolean value.

```typescript
const inverted = useInvert(ori: ObservableMaybe<boolean>);
```

### usePause

Creates a promise that resolves after a specified delay.

```typescript
const promise = usePause(delay: number);
```

### useTimer

Provides timer functionality with start, pause, split, and stop capabilities.

```typescript
const { start, pause, split, stop, total, reset, laps } = useTimer(startImmediately?: boolean);
```

### useTry

Executes a given function with try-catch-finally logic.

```typescript
const [result, error] = useTry(fn: Function, final?: Function);
```

### useChanged

Tracks changes to a value and provides utilities to detect when it changes.

```typescript
const { value, previousValue, changed, diff } = useChanged<T>(val: ObservableMaybe<T>);
```

### useWith

Allows you to use an observable value with a callback function that is called whenever the value changes.

```typescript
useWith<T>(obj: ObservableMaybe<T>, func: (o: Unobservant<T>) => void);
```

## Components

### Array

Renders arrays with context.

```typescript
const array = Array<T, A, I>(props: ArrayProp<T, A, I>);
```

### Ratio

Renders items with ratio selection capabilities.

```typescript
const ratio = Ratio<T>(props: ArrayProp<T, ArrayType<T>, ItemType<T>> & { multiple?: boolean, group?: boolean });
```

### Timeout

Delays the rendering of its children.

```typescript
const timeout = Timeout<T, K>(props: { children?: JSX.Children, timeout?: number });
```

## Utilities

### Object Utilities

Utilities for working with objects and observables.

```typescript
const cloned = clone<T>(source: T, deepClone?: boolean);
const assigned = assign<T, S, O>(target: T, source: S, options?: O);
const made = make<T>(obj: T, inplace?: boolean);
const unwrapped = $$$<T, K>(obj: ObservableMaybe<T>, ...keys: K[]);
const deepUnwrapped = $$$$<T, K>(obj: ObservableMaybe<T>, ...keys: K[]);
```

### isLocalhost

Determines if the current host is localhost.

```typescript
const isLocal = isLocalhost();
```

### useAspect

Calculates and returns the aspect ratio of the window.

```typescript
const aspectRatio = useAspect();
```

### useViewportSize

Provides reactive access to the visual viewport size and properties.

```typescript
const viewport = useViewportSize();
// viewport contains: width, height, offsetLeft, offsetTop, pageLeft, pageTop, scale