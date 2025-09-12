# useMap

A hook that tracks state of a Map.

## Usage

```javascript
import { useMap } from '@woby/use';

function Component() {
  const [map, { set, remove, clear }] = useMap();

  return (
    <div>
      <button onClick={() => set('key1', 'value1')}>Set Key1</button>
      <button onClick={() => remove('key1')}>Remove Key1</button>
      <button onClick={clear}>Clear Map</button>
      <p>Map size: {() => $$(map).size}</p>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| initialValue | Iterable<[any, any]> | - | Optional initial value for the map |

## Return Value

Returns an array with the following elements:

| Index | Type | Description |
|-------|------|-------------|
| 0 | Observable<Map> | An observable Map |
| 1 | Object | An object containing utility functions |

The utility object contains:
- `set`: Function to set a key-value pair
- `remove`: Function to remove a key
- `clear`: Function to clear the map
- `initialize`: Function to initialize the map with new values

## Examples

### Basic Usage

```javascript
import { useMap } from '@woby/use';

function MapExample() {
  const [map, { set, remove, clear }] = useMap([
    ['key1', 'value1'],
    ['key2', 'value2']
  ]);

  return (
    <div>
      <button onClick={() => set('key3', 'value3')}>Add Key3</button>
      <button onClick={() => remove('key1')}>Remove Key1</button>
      <button onClick={clear}>Clear Map</button>
      
      <ul>
        {() => Array.from($$(map)).map(([key, value]) => (
          <li key={key}>{key}: {value}</li>
        ))}
      </ul>
    </div>
  );
}
```

### User Preferences

```javascript
import { useMap } from '@woby/use';

function UserPreferences() {
  const [preferences, { set, remove }] = useMap({
    theme: 'light',
    language: 'en',
    notifications: true
  });

  return (
    <div>
      <h3>User Preferences</h3>
      <button onClick={() => set('theme', 'dark')}>Switch to Dark Theme</button>
      <button onClick={() => set('notifications', false)}>Disable Notifications</button>
      
      <ul>
        {() => Array.from($$(preferences)).map(([key, value]) => (
          <li key={key}>
            {key}: {String(value)}
            <button onClick={() => remove(key)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```