# useLocalStorage

A hook for managing localStorage values with automatic synchronization across tabs.

## Usage

```javascript
import { useLocalStorage } from '@woby/use';

function UserProfile() {
  // Basic usage
  const name = useLocalStorage('userName', '');

  // With options
  const removableName = useLocalStorage('userName', '', { removeOnNull: true });
  const readonlyName = useLocalStorage('userName', '', { readonly: true });

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => name(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name}!</p>
      <button onClick={() => removableName(null)}>Remove Name</button>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| key | string | required | The localStorage key |
| initialValue | ObservableMaybe&lt;T&gt; | undefined | The initial value if key doesn't exist |
| options | object | undefined | Configuration options |
| options.removeOnNull | boolean | false | If true, setting the value to null will remove the item from localStorage |
| options.readonly | boolean | false | If true, returns a readonly observable that can only read from localStorage |

## Return Value

Returns an Observable containing the stored value:

| Type | Description |
|------|-------------|
| Observable&lt;T&gt; | An observable containing the stored value (when readonly is false) |
| ObservableReadonly&lt;T&gt; | A readonly observable containing the stored value (when readonly is true) |

## Examples

### Basic Usage

```javascript
import { useLocalStorage } from '@woby/use';

function Preferences() {
  const theme = useLocalStorage('theme', 'light');
  const notifications = useLocalStorage('notifications', true);
  
  return (
    <div>
      <label>
        Theme:
        <select value={theme} onChange={(e) => theme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      
      <label>
        Notifications:
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => notifications(e.target.checked)}
        />
      </label>
    </div>
  );
}
```

### Using removeOnNull Option

```javascript
import { useLocalStorage } from '@woby/use';

function UserProfile() {
  const userName = useLocalStorage('userName', '', { removeOnNull: true });

  const clearName = () => {
    userName(null); // This will remove the item from localStorage
  };

  return (
    <div>
      <input
        type="text"
        value={userName}
        onChange={(e) => userName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={clearName}>Clear Name</button>
    </div>
  );
}
```

### Using readonly Option

```javascript
import { useLocalStorage } from '@woby/use';

function DisplayComponent() {
  // Readonly version - can only read from localStorage, cannot write
  const userName = useLocalStorage('userName', '', { readonly: true });

  return (
    <div>
      <p>Welcome, {userName}!</p>
    </div>
  );
}

function EditComponent() {
  // Writable version - can read and write to localStorage
  const userName = useLocalStorage('userName', '');

  return (
    <div>
      <input
        type="text"
        value={userName}
        onChange={(e) => userName(e.target.value)}
      />
    </div>
  );
}
```

## Notes

- Values are automatically serialized/deserialized using JSON
- Changes are synchronized across browser tabs
- Handles serialization errors gracefully
- Works with all data types that can be JSON serialized
- The returned value is an Observable that can be used directly in JSX
- When `removeOnNull` is true, setting the value to null removes the item from localStorage
- When `readonly` is true, returns a readonly observable that only reads from localStorage