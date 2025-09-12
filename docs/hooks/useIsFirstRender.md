# useIsFirstRender

A hook that checks if it's the first render of a component.

## Usage

```javascript
import { useIsFirstRender } from '@woby/use';

function Component() {
  const isFirstRender = useIsFirstRender();

  return (
    <div>
      <p>
        {() => $$(isFirstRender) ? 'This is the first render' : 'This is a re-render'}
      </p>
    </div>
  );
}
```

## Parameters

This hook does not take any parameters.

## Return Value

Returns an observable boolean indicating if this is the first render.

## Examples

### Basic Usage

```javascript
import { $ } from 'woby';
import { useIsFirstRender } from '@woby/use';

function RenderTracker() {
  const isFirstRender = useIsFirstRender();
  const renderCount = $(0);

  // Increment render count on every render except the first
  useEffect(() => {
    if (!$$(isFirstRender)) {
      renderCount(c => c + 1);
    }
  });

  return (
    <div>
      <p>First render: {() => $$(isFirstRender) ? 'Yes' : 'No'}</p>
      <p>Re-render count: {renderCount}</p>
    </div>
  );
}
```

### Conditional Effects

```javascript
import { $ } from 'woby';
import { useIsFirstRender } from '@woby/use';

function ConditionalEffect() {
  const isFirstRender = useIsFirstRender();
  const data = $('Initial data');

  // Only run this effect on re-renders, not the first render
  useEffect(() => {
    if (!$$(isFirstRender)) {
      console.log('Component re-rendered with data:', $$(data));
    }
  });

  return (
    <div>
      <p>Data: {data}</p>
      <button onClick={() => data('Updated data')}>Update Data</button>
    </div>
  );
}
```