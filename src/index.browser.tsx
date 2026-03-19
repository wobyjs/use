// Browser-only entry point for @woby/use
// This export includes ALL hooks including those that require browser APIs
// For SSR environments, use @woby/use/ssr instead

// Include everything from SSR build
export * from './index.ssr'

// Additional browser-only hooks

// Storage hooks (require localStorage/sessionStorage)
export * from './useLocalStorage/useLocalStorage'
export * from './useSessionStorage/useSessionStorage'

// Clipboard (requires navigator.clipboard)
export * from './useCopyToClipboard/useCopyToClipboard'

// DOM Event hooks (require window/document/HTMLElement)
export * from './useEventListener/useEventListener'
export * from './useClickAway'
export * from './useClickAnyWhere/useClickAnyWhere'
export * from './useOnClickOutside/useOnClickOutside'
export * from './useHover/useHover'

// Layout/Size hooks (require DOM APIs)
export * from './useElementSize/useElementSize'
export * from './useWindowSize/useWindowSize'
export * from './useWindowSize/useViewportSize'
export * from './useWindowSize/useAspect'
export * from './useComputedStyle'

// Location/Screen hooks (require browser APIs)
export * from './useLocation'
export * from './useGpsLocation'
export * from './useScreen/useScreen'
export * from './useScreenOrientation'
export * from './useMediaQuery/useMediaQuery'

// Observer hooks (require browser APIs)
export * from './useIntersectionObserver/useIntersectionObserver'

// Document hooks (require document API)
export * from './useDocumentTitle/useDocumentTitle'
export * from './useLockedBody/useLockedBody'

// Script/Image hooks (require browser APIs)
export * from './useScript/useScript'
export * from './useImageOnLoad/useImageOnLoad'

// Theme hooks (often use localStorage + matchMedia)
export * from './useDarkMode/useDarkMode'
export * from './useTernaryDarkMode/useTernaryDarkMode'

// Fetch (uses browser fetch API)
export * from './useFetch/useFetch'

// Selection (requires Selection API)
export * from './useSelection'

// Utility (localhost detection)
export * from './isLocalhost'
