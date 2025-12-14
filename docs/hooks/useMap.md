# useMap

A hook that tracks state of a Map-like object.

## Usage

```javascript
import { useMap } from '@woby/use';

function Component() {
  const [map, { set, remove, reset }] = useMap();

  return (
    <div>
      <button onClick={() => set('key1', 'value1')}>Set Key1</button>
      <button onClick={() => remove('key1')}>Remove Key1</button>
      <button onClick={reset}>Clear Map</button>
      <p>Map entries: {() => JSON.stringify($$(map))}</p>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| initialState | MapOrEntries | {} | Optional initial value for the map (can be a Map, array of entries, or object) |

## Return Value

Returns an array with the following elements:

| Index | Type | Description |
|-------|------|-------------|
| 0 | Observable&lt;Object&gt; | An observable object representing the map |
| 1 | Object | An object containing utility functions |

The utility object contains:
- `set`: Function to set a key-value pair
- `setAll`: Function to set multiple key-value pairs
- `remove`: Function to remove a key
- `reset`: Function to clear the map
- `entries`: Function to get entries as an array

## Examples

### Basic Usage

```javascript
import { useMap } from '@woby/use';

function MapExample() {
  const [map, { set, remove, reset, setAll }] = useMap({
    'key1': 'value1',
    'key2': 'value2'
  });

  return (
    <div>
      <button onClick={() => set('key3', 'value3')}>Add Key3</button>
      <button onClick={() => remove('key1')}>Remove Key1</button>
      <button onClick={reset}>Clear Map</button>
      <button onClick={() => setAll({ 'newKey': 'newValue' })}>Replace All</button>
      
      <ul>
        {() => Object.entries($$(map)).map(([key, value]) => (
          <li key={key}>{key}: {String(value)}</li>
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
        {() => Object.entries($$(preferences)).map(([key, value]) => (
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