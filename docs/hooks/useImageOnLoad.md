# useImageOnLoad

A hook that handles image loading events.

## Usage

```javascript
import { useImageOnLoad } from '@woby/use';

function Component() {
  const { onLoad, onError } = useImageOnLoad();

  return (
    <div>
      <img
        src="image.jpg"
        onLoad={onLoad}
        onError={onError}
        alt="Example"
      />
    </div>
  );
}
```

## Parameters

This hook does not take any parameters.

## Return Value

Returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| onLoad | Function | Function to call when image loads successfully |
| onError | Function | Function to call when image fails to load |

## Examples

### Basic Usage

```javascript
import { $ } from 'woby';
import { useImageOnLoad } from '@woby/use';

function ImageLoader() {
  const { onLoad, onError } = useImageOnLoad();
  const loading = $('Loading...');
  
  const handleLoad = () => {
    onLoad();
    loading('Image loaded successfully!');
  };
  
  const handleError = () => {
    onError();
    loading('Failed to load image');
  };

  return (
    <div>
      <img
        src="https://example.com/image.jpg"
        onLoad={handleLoad}
        onError={handleError}
        alt="Example"
        style={{ maxWidth: '100%' }}
      />
      <p>{loading}</p>
    </div>
  );
}
```