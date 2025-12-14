# useToggle

A hook for toggling between two values.

## Usage

```javascript
import { useToggle } from '@woby/use';

function Toggle() {
  const [value, toggle] = useToggle(false);
  
  return (
    <div>
      <p>Value: {() => value() ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| defaultValue | ObservableMaybe&lt;T&gt; | undefined | The initial value (can be an observable or plain value) |
| nextValue | T | undefined | Optional. The value to toggle to when the current value equals defaultValue |
| clone | boolean | false | Optional. If true, creates a new observable even if the input is already an observable |

## Return Value

Returns a tuple with the following elements:

| Index | Type | Description |
|-------|------|-------------|
| 0 | Observable&lt;T&gt; | The current value as an observable |
| 1 | function | Toggles between the two values |

## Examples

### Basic Boolean Toggle

```javascript
import { useToggle } from '@woby/use';

function LightSwitch() {
  const [isOn, toggle] = useToggle(false);
  
  return (
    <div>
      <p>Light is {() => isOn() ? 'ON' : 'OFF'}</p>
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