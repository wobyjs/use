# useIsMounted

A hook that checks if a component is mounted.

## Usage

```javascript
import { useIsMounted } from '@woby/use';

function Component() {
  const isMounted = useIsMounted();

  return (
    <div>
      <p>
        {() => $$(isMounted) ? 'Component is mounted' : 'Component is not mounted'}
      </p>
    </div>
  );
}
```

## Parameters

This hook does not take any parameters.

## Return Value

Returns an observable boolean indicating if the component is mounted.

## Examples

### Basic Usage

```javascript
import { useIsMounted } from '@woby/use';

function MountStatus() {
  const isMounted = useIsMounted();

  return (
    <div>
      <p>
        {() => $$(isMounted) ? 'Component is currently mounted' : 'Component is not mounted'}
      </p>
    </div>
  );
}
```

### Safe State Updates

```javascript
import { $ } from 'woby';
import { useIsMounted } from '@woby/use';

function SafeAsyncComponent() {
  const isMounted = useIsMounted();
  const data = $('Loading...');

  useEffect(() => {
    // Simulate async operation
    setTimeout(() => {
      // Only update state if component is still mounted
      if ($$(isMounted)) {
        data('Data loaded successfully');
      }
    }, 2000);
  });

  return (
    <div>
      <p>{data}</p>
    </div>
  );
}
```