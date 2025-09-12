# useComputedStyle

A hook that provides reactive access to an element's computed CSS styles.

This hook returns an observable containing the computed styles of a target element and automatically updates when the element's styles change. It allows you to filter styles by specifying patterns to match specific CSS properties.

## Usage

```tsx
import { useComputedStyle } from '@woby/use'

const MyComponent = () => {
  const elementRef = $(null)
  const styles = useComputedStyle(elementRef, ['color', 'background-color'])
  
  return (
    <div>
      <div ref={elementRef} style={{ color: 'red', backgroundColor: 'blue' }}>
        Styled element
      </div>
      <p>Color: {() => styles().color}</p>
      <p>Background: {() => styles().backgroundColor}</p>
    </div>
  )
}
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| target | `Observable<T>` | An observable containing a reference to the target HTML element |
| patterns | `CSSPropertyPattern[]` | An array of strings or RegExp patterns to filter which CSS properties to track (default: []) |

## Return Value

Returns an `Observable<{ [key: string]: string }>` containing the computed styles that match the specified patterns.

## Example

```tsx
const elementRef = $(null)
const styles = useComputedStyle(elementRef, ['color', 'background-color'])

return (
  <div>
    <div ref={elementRef} style={{ color: 'red', backgroundColor: 'blue' }}>
      Styled element
    </div>
    <p>Color: {() => styles().color}</p>
    <p>Background: {() => styles().backgroundColor}</p>
  </div>
)
```

## CSSPropertyPattern Type

The patterns parameter accepts an array of either:
- `string`: Exact match for a CSS property name
- `RegExp`: Regular expression to match CSS property names

## Use Cases

- Building style inspectors or dev tools
- Creating components that react to computed styles
- Implementing theme-aware components
- Building design systems that respond to CSS changes
- Creating accessibility tools that analyze contrast ratios

## Implementation Details

The hook uses the browser's `window.getComputedStyle()` API to retrieve the computed styles of the target element. It sets up a `MutationObserver` to detect changes to the element's style and class attributes, automatically updating the observable when changes occur.

The hook filters the computed styles based on the provided patterns, returning only the properties that match.

## Browser Support

The hook works in all modern browsers that support the `getComputedStyle` API and `MutationObserver`.

## See Also

- [getComputedStyle documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle)
- [MutationObserver documentation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [Woby documentation](https://github.com/vobyjs/woby) for more information about observables