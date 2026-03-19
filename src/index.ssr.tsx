// SSR-compatible entry point for @woby/use
// This export only includes hooks that work in server-side rendering environments
// For browser-only hooks, use @woby/use/browser instead

// Core utilities
export * from './use/use'
export * from './utils'

// State management hooks (SSR-safe)
export * from './useBoolean/useBoolean'
export * from './useCounter/useCounter'
export * from './useMap/useMap'
export * from './useSet/useSet'
export * from './useStep/useStep'
export * from './useToggle/useToggle'
export * from './useInvert/useInvert'
export * from './useDestruct/useDestruct'

// Timer/Effect hooks (SSR-safe)
export * from './useDebounce/useDebounce'
export * from './useTimeout/useTimeout'
export * from './useInterval/useInterval'
export * from './useTimer/useTimer'
export * from './usePause/usePause'
export * from './useTimeout/Timeout'

// Callback/Ref hooks (SSR-safe)
export * from './useEventCallback/useEventCallback'
export * from './useIsomorphicLayoutEffect/useIsomorphicLayoutEffect'
export * from './useId/useId'
export * from './useWith/useWith'

// Error handling (SSR-safe)
export * from './useTry/useTry'

// Data transformation (SSR-safe)
export * from './Array/Array'
export * from './Object'
export * from './Ratio/Ratio'

// Environment detection (works in both environments)
export * from './useSsr/useSsr'

// Re-export types from woby
export type { Observant, Unobservant } from 'woby'
export { useMounted } from 'woby'

// Browser-only hooks are intentionally NOT exported here
// If you need them in an SSR context, they will be undefined/noop
// Import from @woby/use/browser explicitly if needed
