# useIntersectionObserver

A hook that observes element intersections using the Intersection Observer API.

## Usage

```javascript
import { $ } from 'woby';
import { useIntersectionObserver } from '@woby/use';

function Component() {
  const elementRef = $();
  const entry = useIntersectionObserver(elementRef);

  return (
    <div>
      <div ref={elementRef} style={{ height: '100px', backgroundColor: 'lightblue' }}>
        {() => $$(entry)?.isIntersecting ? 'Visible!' : 'Not visible'}
      </div>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| elementRef | Observable<T> \| T | - | A reference to the HTML element to observe |
| options | IntersectionObserverInit | - | Optional Intersection Observer options |

## Return Value

Returns an observable IntersectionObserverEntry or null.

## Examples

### Basic Usage

```javascript
import { $ } from 'woby';
import { useIntersectionObserver } from '@woby/use';

function VisibilityDetector() {
  const elementRef = $();
  const entry = useIntersectionObserver(elementRef);

  return (
    <div>
      <div style={{ height: '100vh', backgroundColor: 'lightgray' }}>
        Scroll down to see the target element
      </div>
      <div
        ref={elementRef}
        style={{
          height: '200px',
          backgroundColor: () => $$(entry)?.isIntersecting ? 'lightgreen' : 'lightcoral',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {() => $$(entry)?.isIntersecting ? 'I am visible!' : 'I am not visible'}
      </div>
    </div>
  );
}
```

### Lazy Loading Images

```javascript
import { $ } from 'woby';
import { useIntersectionObserver } from '@woby/use';

function LazyImage({ src, alt }) {
  const imgRef = $();
  const entry = useIntersectionObserver(imgRef, { threshold: 0.1 });
  const loadedSrc = $(src);

  useEffect(() => {
    if ($$(entry)?.isIntersecting) {
      loadedSrc(src);
    }
  }, [$$(entry)?.isIntersecting]);

  return (
    <img
      ref={imgRef}
      src={() => $$(entry)?.isIntersecting ? $$(loadedSrc) : ''}
      alt={alt}
      style={{ maxWidth: '100%' }}
    />
  );
}
```