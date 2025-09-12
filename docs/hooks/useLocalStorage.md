# useLocalStorage

A hook for managing localStorage values with automatic synchronization across tabs.

## Usage

```javascript
import { useLocalStorage } from '@woby/use';

function UserProfile() {
  const [name, setName, removeName] = useLocalStorage('userName', '');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name}!</p>
      <button onClick={removeName}>Remove Name</button>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| key | string | required | The localStorage key |
| initialValue | any | undefined | The initial value if key doesn't exist |

## Return Value

Returns an array with the following elements:

| Index | Type | Description |
|-------|------|-------------|
| 0 | any | The current stored value |
| 1 | function | Sets the stored value |
| 2 | function | Removes the key from localStorage |

## Example

```javascript
import { useLocalStorage } from '@woby/use';

function Preferences() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [notifications, setNotifications] = useLocalStorage('notifications', true);
  
  return (
    <div>
      <label>
        Theme:
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      
      <label>
        Notifications:
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
      </label>
    </div>
  );
}
```

## Notes

- Values are automatically serialized/deserialized using JSON
- Changes are synchronized across browser tabs
- Handles serialization errors gracefully
- Works with all data types that can be JSON serialized