# @woby/use

A collection of essential hooks designed for both React and Voby environments. This library provides a comprehensive set of utility hooks that help you build better applications with less code, featuring **dual builds** optimized for both browser and server-side rendering (SSR) environments.

## Key Features

- 🎯 **50+ Essential Hooks** - State management, effects, events, utilities
- ⚡ **Dual Builds** - Optimized bundles for browser (37KB) and SSR (15KB)
- 🔒 **Type Safe** - Full TypeScript support with separate type definitions
- 🌐 **Universal Compatibility** - Works with React 16.8+ and Voby
- 📦 **Tree Shakeable** - Only import what you need

## Installation

```bash
# Using npm
npm install @woby/use

# Using yarn
yarn add @woby/use

# Using pnpm
pnpm add @woby/use
```

## Import Paths

The library provides separate builds for browser and server-side rendering (SSR) environments:

```javascript
// Default import - works in both environments (uses SSR-safe hooks only)
import { useCounter, useBoolean } from '@woby/use';

// Explicit browser import - includes ALL hooks (browser + SSR-safe)
import { useLocalStorage, useEventListener } from '@woby/use/browser';

// Explicit SSR import - only SSR-compatible hooks
import { useCounter, useDebounce } from '@woby/use/ssr';
```

### Which import should you use?

| Import Path | Use Case | Bundle Size | Hooks Included |
|-------------|----------|-------------|----------------|
| **`@woby/use`** (default) | Universal/isomorphic components | 15 KB | SSR-safe only (29 hooks) |
| **`@woby/use/browser`** | Client-only features | 37 KB | ALL hooks (60+ hooks) |
| **`@woby/use/ssr`** | Server-side rendering | 15 KB | SSR-safe only (29 hooks) |

**Recommendation:** Start with the default import. Only use `/browser` when you specifically need browser-only hooks like `useLocalStorage` or `useEventListener`.

### SSR Compatibility

The library is split into two builds to optimize for different environments:

#### Server-Safe Hooks ✅

These hooks work perfectly in SSR environments and don't require browser APIs:

**State Management:**
- `useBoolean`, `useCounter`, `useMap`, `useSet`, `useStep`, `useToggle`, `useInvert`, `useDestruct`

**Timers & Effects:**
- `useDebounce`, `useTimeout`, `useInterval`, `useTimer`, `usePause`

**Callbacks & Refs:**
- `useEventCallback`, `useIsomorphicLayoutEffect`, `useId`, `useWith`

**Utilities:**
- `useTry`, `useSsr`, `Array`, `Object`, `Ratio`, `use`

#### Browser-Only Hooks ⚠️

These hooks require browser APIs (`window`, `document`, `navigator`, etc.) and should NOT be used during SSR:

**Storage:**
- `useLocalStorage`, `useSessionStorage`

**DOM Events:**
- `useEventListener`, `useClickAway`, `useClickAnyWhere`, `useOnClickOutside`, `useHover`

**Layout & Size:**
- `useElementSize`, `useWindowSize`, `useViewportSize`, `useAspect`, `useComputedStyle`

**Location & Screen:**
- `useLocation`, `useGpsLocation`, `useScreen`, `useScreenOrientation`, `useMediaQuery`

**Observers:**
- `useIntersectionObserver`

**Document Operations:**
- `useDocumentTitle`, `useLockedBody`

**Browser APIs:**
- `useCopyToClipboard`, `useScript`, `useImageOnLoad`, `useFetch`, `useSelection`

**Theme:**
- `useDarkMode`, `useTernaryDarkMode`

**Other:**
- `isLocalhost`

### Usage Examples

#### SSR-Safe Code (Recommended for Universal Components)

```javascript
// This works in both browser and server - perfect for Next.js pages, Nuxt components, etc.
import { useCounter, useDebounce } from '@woby/use';

function Counter() {
  const { count, increment } = useCounter(0);
  const debouncedCount = useDebounce(count, 300);
  
  return <div>{debouncedCount}</div>;
}
```

#### Browser-Only Features

```javascript
// Only import browser hooks in client components
'use client'; // If using Next.js app router

import { useLocalStorage, useEventListener } from '@woby/use/browser';

function StorageComponent() {
  const value = useLocalStorage('key', 'default');
  
  return <div>{value}</div>;
}
```

#### Mixed Usage (Universal + Client Components)

```javascript
// Universal component (SSR-safe)
import { useCounter } from '@woby/use';

export function Counter() {
  const { count } = useCounter(0);
  return <div>{count}</div>;
}

// Client component (with browser hooks)
'use client';
import { useLocalStorage } from '@woby/use/browser';

export function PersistentCounter() {
  const [value, setValue] = useLocalStorage('counter', 0);
  return <div>{value}</div>;
}
```

#### Framework-Specific Patterns

**Next.js App Router:**
```javascript
// Server Component (default)
import { useCounter } from '@woby/use'; // ✅ Works fine

// Client Component
'use client';
import { useLocalStorage } from '@woby/use/browser'; // ✅ Has browser APIs
```

**Nuxt 3:**
```vue
<script setup>
// Auto-imported in templates, but explicit imports needed for composables
import { useCounter } from '@woby/use'
import { useLocalStorage } from '@woby/use/browser'
</script>
```

**React SPA (No SSR):**
```javascript
// You can safely import everything from browser build
import { useLocalStorage, useEventListener } from '@woby/use/browser';
```

## Quick Start

```javascript
import { useToggle, useCounter, useLocalStorage } from '@woby/use/browser';

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

> **Note:** The example above uses `@woby/use/browser` because it includes `useLocalStorage`. For SSR-safe components, use the default import and avoid browser-only hooks.

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

# Start development server (browser)
pnpm dev

# Build for production
pnpm build

# Build browser-only version
pnpm build:browser

# Build SSR-only version  
pnpm build:ssr

# Run tests
pnpm test

# Serve documentation
pnpm docs
```

### Build Outputs

The build process creates two separate bundles:

**Browser Build** (`dist/browser/`):
- `index.browser.es.js` (37 KB) - ES module format for modern bundlers
- `index.browser.umd.js` (43 KB) - UMD format for direct browser usage
- Full type definitions with DOM APIs (68 type files)
- **Includes:** All 60+ hooks (SSR-safe + browser-only)

**SSR Build** (`dist/ssr/`):
- `index.ssr.es.js` (15 KB) - ES module format 
- `index.ssr.cjs.js` (17 KB) - CommonJS format for Node.js
- Type definitions without DOM dependencies (29 type files)
- **Includes:** Only 29 SSR-safe hooks

**Bundle Size Comparison:**
- Browser build: ~37 KB (gzipped: ~9 KB)
- SSR build: ~15 KB (gzipped: ~5 KB) - **60% smaller!**

### Why Separate Builds?

1. **Smaller Server Bundles** - SSR build excludes 30+ browser-only hooks
2. **Type Safety** - Prevents accidental browser API usage in SSR context
3. **Better Tree-Shaking** - Explicit imports enable better dead code elimination
4. **Faster Compilation** - Smaller bundles compile faster
5. **Clear Intent** - Import paths clearly indicate environment compatibility

### Build Commands

```bash
# Clean build (removes dist folder)
pnpm build:clean

# Build everything (browser + SSR + types)
pnpm build

# Build only browser version
pnpm build:browser

# Build only SSR version
pnpm build:ssr

# Generate TypeScript declarations
pnpm build:types

# Watch mode for development
pnpm watch
```

## Framework Compatibility

The hooks in this library are designed to work with:

- **React** (16.8+) - Full support for all React features
- **Voby** - Optimized for Voby's reactive system with JSX configuration
- **Next.js** - SSR-safe hooks work in Server Components, browser hooks in Client Components
- **Nuxt 3** - Compatible with Nuxt's composition API
- **Remix** - Works with both client and server rendering
- **Astro** - Use SSR-safe hooks in islands, browser hooks in interactive components

### Framework-Specific Notes

**Next.js:**
- Default imports (`@woby/use`) work in Server Components
- Browser hooks require `'use client'` directive
- Recommended pattern: Universal components + client islands

**Nuxt 3:**
- Auto-imported in templates when configured
- Explicit imports needed in composables
- Use `@woby/use/ssr` for server plugins

**React SPA (No SSR):**
- Safe to use `@woby/use/browser` everywhere
- No need to worry about server compatibility

## TypeScript Support

All hooks come with full TypeScript support and type definitions included:

- ✅ **Strict Mode** - Full type inference
- ✅ **Generics** - Proper generic type handling
- ✅ **Separate Types** - Different types for browser vs SSR builds
- ✅ **DOM Types** - Only included in browser build types
- ✅ **JSX Support** - Configured for both React and Voby JSX

```typescript
// Full type inference
const { count, increment } = useCounter(0); // count is Observable<number>

// Generic hooks
const map = useMap<string, number>(new Map()); // Map<string, number>

// Type-safe event handlers
useEventListener(window, 'resize', (event) => {
  // event is inferred as UIEvent
  console.log(event.target);
});
```

## Contributing

Contributions are welcome! Please read our [contributing guide](./docs/contributing.md) to get started.

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/wobyjs/use
cd @woby/use

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

### Project Structure

```
@woby/use/
├── src/
│   ├── index.ssr.tsx      # SSR entry point (29 hooks)
│   ├── index.browser.tsx  # Browser entry point (60+ hooks)
│   ├── useCounter/        # Individual hook folders
│   ├── useLocalStorage/
│   └── ...
├── dist/
│   ├── browser/           # Browser build output
│   │   ├── *.es.js       # ES modules
│   │   ├── *.umd.js      # UMD format
│   │   └── types/        # Type definitions
│   └── ssr/              # SSR build output
│       ├── *.es.js
│       ├── *.cjs.js      # CommonJS
│       └── types/
├── docs/                  # Documentation
├── demo/                  # Example usage
└── test/                  # Test suite
```

### Adding New Hooks

1. Create a new folder in `src/` with your hook name
2. Implement the hook with TypeScript
3. Add tests (.test.ts or .spec.ts)
4. Add documentation in `docs/hooks/`
5. Export from appropriate entry point:
   - SSR-safe → `index.ssr.tsx`
   - Browser-only → `index.browser.tsx`
6. Update this README with hook details

### Testing Guidelines

- All hooks must have tests
- Use `chk` testing framework
- Tests run with `renderToString` for SSR compatibility
- Include both unit tests and integration examples
- Test edge cases and error conditions

### Code Style

- Use TypeScript strict mode
- Follow existing code formatting (Prettier)
- Write JSDoc comments for public APIs
- Keep hooks small and focused (single responsibility)
- Provide clear error messages

## License

MIT

## Related Projects

- **[Voby](https://github.com/wobyjs/woby)** - A reactive JavaScript framework
- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces
- **[@woby/chk](../chk)** - Testing framework used by @woby/use
- **[@woby/vite-plugin-test](../vite-plugin-test)** - Vite plugin for testing

## Community

- [GitHub Issues](https://github.com/wobyjs/use/issues) - Report bugs or request features
- [Discussions](https://github.com/wobyjs/use/discussions) - Ask questions and share ideas
- [Twitter](https://twitter.com/wobyjs) - Follow for updates

---

**Made with ❤️ by the Woby Team** | [Documentation](./docs/README.md) | [Examples](./docs/examples.md)