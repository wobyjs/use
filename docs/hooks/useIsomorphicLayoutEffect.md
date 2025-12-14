# useIsomorphicLayoutEffect

A hook that is currently an alias for useEffect.

## Usage

```javascript
import { useIsomorphicLayoutEffect } from '@woby/use';

function Component() {
  useIsomorphicLayoutEffect(() => {
    console.log('This runs as a useEffect');
  }, []);

  return <div>Component content</div>;
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| effect | EffectCallback | - | The effect function to run |
| deps | DependencyList | - | Optional array of dependencies |

## Return Value

This hook does not return a value.

## Examples

### Basic Usage

```javascript
import { $ } from 'woby';
import { useIsomorphicLayoutEffect } from '@woby/use';

function EffectComponent() {
  const elementRef = $();

  useIsomorphicLayoutEffect(() => {
    if ($$(elementRef)) {
      console.log('Element dimensions:', $$(elementRef).offsetWidth, $$(elementRef).offsetHeight);
    }
  }, [$$(elementRef)]);

  return (
    <div ref={elementRef}>
      <p>This component uses useEffect</p>
    </div>
  );
}
```

## Notes

- Currently this is just an alias for useEffect
- The implementation may change in the future to provide true isomorphic behavior
- For now, it functions identically to useEffect