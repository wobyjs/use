# useBoolean

A hook specifically designed for managing boolean state with additional utility functions.

## Usage

```javascript
import { useBoolean } from '@woby/use';

function BooleanToggle() {
  const [value, toggle, setValue] = useBoolean(false);
  
  return (
    <div>
      <p>Value: {value ? 'TRUE' : 'FALSE'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setValue(true)}>Set True</button>
      <button onClick={() => setValue(false)}>Set False</button>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| initialValue | boolean | false | The initial boolean value |

## Return Value

Returns an array with the following elements:

| Index | Type | Description |
|-------|------|-------------|
| 0 | boolean | The current boolean value |
| 1 | function | Toggles the boolean value |
| 2 | function | Sets the boolean value directly |

## Example

```javascript
import { useBoolean } from '@woby/use';

function Modal() {
  const [isOpen, toggle, setIsOpen] = useBoolean(false);
  
  return (
    <div>
      <button onClick={toggle}>Open Modal</button>
      
      {isOpen && (
        <div className="modal">
          <p>Modal content</p>
          <button onClick={toggle}>Close</button>
        </div>
      )}
    </div>
  );
}
```