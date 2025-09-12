# useDarkMode

A hook for managing dark mode state with system preference detection.

## Usage

```javascript
import { useDarkMode } from '@woby/use';

function DarkModeToggle() {
  const [darkMode, toggle, setDarkMode] = useDarkMode();
  
  return (
    <div>
      <p>Dark mode is {darkMode ? 'enabled' : 'disabled'}</p>
      <button onClick={toggle}>
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| initialValue | boolean | undefined | Optional initial value (defaults to system preference) |

## Return Value

Returns an array with the following elements:

| Index | Type | Description |
|-------|------|-------------|
| 0 | boolean | The current dark mode state |
| 1 | function | Toggles dark mode |
| 2 | function | Sets dark mode directly |

## Example

```javascript
import { useDarkMode } from '@woby/use';

function App() {
  const [darkMode] = useDarkMode();
  
  return (
    <div className={darkMode ? 'dark-theme' : 'light-theme'}>
      <header>
        <h1>My App</h1>
        <DarkModeToggle />
      </header>
      <main>
        <p>Content here...</p>
      </main>
    </div>
  );
}

function DarkModeToggle() {
  const [darkMode, toggle] = useDarkMode();
  
  return (
    <button onClick={toggle}>
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
```

## Features

- Automatically detects system dark mode preference
- Persists user preference in localStorage
- Synchronizes changes across tabs
- Respects user's system settings by default
- Works with CSS variables or class-based theming