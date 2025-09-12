# useIsomorphicLayoutEffect

A hook that uses useLayoutEffect in browser and useEffect on server.

## Usage

```javascript
import { useIsomorphicLayoutEffect } from '@woby/use';

function Component() {
  useIsomorphicLayoutEffect(() => {
    console.log('This runs at the appropriate time based on environment');
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

function LayoutEffectComponent() {
  const elementRef = $();

  useIsomorphicLayoutEffect(() => {
    if ($$(elementRef)) {
      console.log('Element dimensions:', $$(elementRef).offsetWidth, $$(elementRef).offsetHeight);
    }
  }, [$$(elementRef)]);

  return (
    <div ref={elementRef}>
      <p>This component uses isomorphic layout effect</p>
    </div>
  );
}
```

### DOM Measurements

```javascript
import { $ } from 'woby';
import { useIsomorphicLayoutEffect } from '@woby/use';

function MeasuredComponent() {
  const elementRef = $();
  const dimensions = $({ width: 0, height: 0 });

  useIsomorphicLayoutEffect(() => {
    if ($$(elementRef)) {
      dimensions({
        width: $$(elementRef).offsetWidth,
        height: $$(elementRef).offsetHeight
      });
    }
  }, [$$(elementRef)]);

  return (
    <div ref={elementRef} style={{ padding: '20px', border: '1px solid #000' }}>
      <p>Width: {() => $$(dimensions).width}px</p>
      <p>Height: {() => $$(dimensions).height}px</p>
    </div>
  );
}
```