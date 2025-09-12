# useGpsLocation

A hook that provides GPS location information using the browser's Geolocation API.

This hook tracks the user's current position and returns an observable location object and an error observable. The hook automatically updates the location as the user moves.

## Usage

```tsx
import { useGpsLocation } from '@woby/use'

const MyComponent = () => {
  const { location, error } = useGpsLocation()
  
  return (
    <div>
      {() => error() ? `Error: ${error()}` : 
        location() ? `Lat: ${location().latitude}, Lon: ${location().longitude}` : 
        'Getting location...'}
    </div>
  )
}
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | `GpsLocationOptions` | Configuration options for the geolocation API |
| options.enableHighAccuracy | `boolean` | Enable high accuracy mode (default: true) |
| options.timeout | `number` | Timeout for geolocation requests in milliseconds (default: 10000) |
| options.maximumAge | `number` | Maximum age of cached position in milliseconds (default: 0) |

## Return Value

Returns an object containing:

- `location`: An observable containing the current GPS coordinates or null
- `error`: An observable containing any error message or null

## Example

```tsx
const { location, error } = useGpsLocation()

return (
  <div>
    {() => error() ? `Error: ${error()}` : 
      location() ? `Lat: ${location().latitude}, Lon: ${location().longitude}` : 
      'Getting location...'}
  </div>
)
```

## GpsLocationOptions Interface

| Property | Type | Description |
| -------- | ---- | ----------- |
| enableHighAccuracy | `boolean` | Enable high accuracy mode for geolocation (default: true) |
| timeout | `number` | Timeout for geolocation requests in milliseconds (default: 10000) |
| maximumAge | `number` | Maximum age of cached position in milliseconds (default: 0) |

## GpsLocation Interface

| Property | Type | Description |
| -------- | ---- | ----------- |
| latitude | `number` | Latitude in decimal degrees |
| longitude | `number` | Longitude in decimal degrees |

## Browser Compatibility

This hook requires the browser's Geolocation API. It will return an error if the API is not supported by the user's browser.

## See Also

- [Geolocation API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)