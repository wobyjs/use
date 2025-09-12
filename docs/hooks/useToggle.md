# useToggle

A hook for toggling between two values, commonly used for boolean states.

## Usage

```javascript
import { useToggle } from '@woby/use';

function Toggle() {
  const [value, toggle] = useToggle(false);
  
  return (
    <div>
      <p>Value: {value ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| initialValue | boolean | false | The initial toggle value |
| nextValue | any | - | Optional next value to toggle to |

## Return Value

Returns an array with the following elements:

| Index | Type | Description |
|-------|------|-------------|
| 0 | any | The current value |
| 1 | function | Toggles between values |
| 2 | function | Sets value directly |

## Examples

### Basic Boolean Toggle

```javascript
import { useToggle } from '@woby/use';

function LightSwitch() {
  const [isOn, toggle] = useToggle(false);
  
  return (
    <div>
      <p>Light is {isOn ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Flip Switch</button>
    </div>
  );
}
```

### Toggle Between Two Values

```javascript
import { useToggle } from '@woby/use';

function ThemeToggle() {
  const [theme, toggleTheme] = useToggle('light', 'dark');
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

### Direct Value Setting

```javascript
import { useToggle } from '@woby/use';

function StatusIndicator() {
  const [status, toggle, setStatus] = useToggle('active', 'inactive');
  
  return (
    <div>
      <p>Status: {status}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setStatus('pending')}>Set to Pending</button>
    </div>
  );
}
```