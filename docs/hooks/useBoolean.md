# useBoolean

A hook for managing boolean state with utility functions.

## Usage

```javascript
import { useBoolean } from '@woby/use';

function BooleanToggle() {
  const { value, toggle, setTrue, setFalse } = useBoolean(false);
  
  return (
    <div>
      <p>Value: {() => value() ? 'TRUE' : 'FALSE'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Set True</button>
      <button onClick={setFalse}>Set False</button>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| defaultValue | ObservableMaybe&lt;boolean&gt; | false | The initial boolean value (can be an observable or plain boolean) |

## Return Value

Returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| value | Observable&lt;boolean&gt; | The current boolean value as an observable |
| toggle | function | Toggles the boolean value |
| setTrue | function | Sets the boolean value to true |
| setFalse | function | Sets the boolean value to false |

## Example

```javascript
import { useBoolean } from '@woby/use';

function Modal() {
  const { value, toggle, setFalse } = useBoolean(false);
  
  return (
    <div>
      <button onClick={toggle}>Open Modal</button>
      
      {() => value() && (
        <div className="modal">
          <p>Modal content</p>
          <button onClick={setFalse}>Close</button>
        </div>
      )}
    </div>
  );
}
```