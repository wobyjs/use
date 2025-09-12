# useMediaQuery

A hook that tracks media query matches.

## Usage

```javascript
import { useMediaQuery } from '@woby/use';

function Component() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div>
      <p>
        {() => $$(isMobile) ? 'Mobile view' : 'Desktop view'}
      </p>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| query | string | - | The media query string to match |

## Return Value

Returns an observable boolean indicating if the media query matches.

## Examples

### Basic Usage

```javascript
import { useMediaQuery } from '@woby/use';

function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');

  return (
    <div>
      <p>
        {() => {
          if ($$(isMobile)) return 'Mobile device';
          if ($$(isTablet)) return 'Tablet device';
          if ($$(isDesktop)) return 'Desktop device';
          return 'Unknown device';
        }}
      </p>
    </div>
  );
}
```

### Theme Switching

```javascript
import { useMediaQuery } from '@woby/use';

function ThemeSwitcher() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div style={{
      backgroundColor: () => $$(prefersDark) ? '#333' : '#fff',
      color: () => $$(prefersDark) ? '#fff' : '#000',
      padding: '20px'
    }}>
      <p>
        {() => $$(prefersDark) ? 'Dark theme preferred' : 'Light theme preferred'}
      </p>
    </div>
  );
}
```