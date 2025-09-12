# useTernaryDarkMode

A hook for managing dark mode with three states: system, light, and dark.

## Import

```typescript
import { useTernaryDarkMode } from '@woby/use'
```

## Usage

```tsx
import { useTernaryDarkMode } from '@woby/use'

function MyComponent() {
  const { isDarkMode, ternaryDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode()
  
  return (
    <div>
      <p>Current theme: {() => $$(isDarkMode) ? 'dark' : 'light'}</p>
      <p>Ternary mode: {ternaryDarkMode}</p>
      <button onClick={toggleTernaryDarkMode}>
        Toggle mode
      </button>
    </div>
  )
}
```

## Return Value

Returns an object containing:

| Property              | Type                    | Description                                       |
|-----------------------|-------------------------|---------------------------------------------------|
| isDarkMode            | Observable<boolean>     | Current dark mode state                           |
| ternaryDarkMode       | Observable<TernaryDarkMode> | Current mode ('system', 'light', or 'dark')    |
| toggleTernaryDarkMode | () => void              | Function to cycle through the three modes         |

### TernaryDarkMode Type

```typescript
type TernaryDarkMode = 'system' | 'dark' | 'light'
```

## Examples

### Basic Usage

```tsx
import { useTernaryDarkMode } from '@woby/use'

function DarkModeController() {
  const {
    isDarkMode,
    ternaryDarkMode,
    toggleTernaryDarkMode,
  } = useTernaryDarkMode()

  return (
    <div>
      <p>Current theme: {() => $$(isDarkMode) ? 'dark' : 'light'}</p>
      <p>ternaryMode: {ternaryDarkMode}</p>
      <p>
        Toggle between three modes
        <button onClick={toggleTernaryDarkMode}>
          Toggle from {ternaryDarkMode}
        </button>
      </p>
      <p>
        Select a mode
        <br />
        <select
          name="select-ternaryDarkMode"
          onChange={ev =>
            ternaryDarkMode(ev.target.value as TernaryDarkMode)
          }
          value={ternaryDarkMode}
        >
          <option value="light">light</option>
          <option value="system">system</option>
          <option value="dark">dark</option>
        </select>
      </p>
    </div>
  )
}
```

## API Reference

```typescript
function useTernaryDarkMode(): {
  isDarkMode: Observable<boolean>
  ternaryDarkMode: Observable<TernaryDarkMode>
  toggleTernaryDarkMode: () => void
}

type TernaryDarkMode = 'system' | 'dark' | 'light'
```

## Notes

- Provides three modes: 'system' (follows OS preference), 'light', and 'dark'
- Automatically syncs with the OS dark mode preference when in 'system' mode
- Persists the selected mode in localStorage
- The [isDarkMode](file:///d:/Developments/tslib/use/src/useTernaryDarkMode/useTernaryDarkMode.ts#L30-L30) observable reflects the actual dark mode state based on the current mode setting
- The [toggleTernaryDarkMode](file:///d:/Developments/tslib/use/src/useTernaryDarkMode/useTernaryDarkMode.ts#L50-L55) function cycles through: system → dark → light → system
- Built on top of [useMediaQuery](useMediaQuery.md) and [useLocalStorage](useLocalStorage.md)