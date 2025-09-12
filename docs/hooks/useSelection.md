# useSelection

A hook that provides reactive access to the browser's Selection API.

This hook returns observables for all selection properties and automatically updates them when the text selection changes. It's useful for building rich text editors or other applications that need to track text selection.

## Usage

```tsx
import { useSelection } from '@woby/use'

const MyComponent = () => {
  const { isCollapsed, type } = useSelection()
  
  return (
    <div>
      <p>Selection type: {type}</p>
      <p>Is collapsed: {() => isCollapsed() ? 'Yes' : 'No'}</p>
    </div>
  )
}
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| element | `ObservableMaybe<HTMLElement>` | Optional element to listen for selection changes on (defaults to document) |

## Return Value

Returns an object containing:

- `selection`: The raw Selection object
- `anchorNode`: An observable containing the anchor node
- `anchorOffset`: An observable containing the anchor offset
- `focusNode`: An observable containing the focus node
- `focusOffset`: An observable containing the focus offset
- `isCollapsed`: An observable boolean indicating if the selection is collapsed
- `rangeCount`: An observable number indicating the number of ranges
- `type`: An observable string indicating the selection type
- `ranges`: An observable array containing the selection ranges

## Example

```tsx
const { isCollapsed, type } = useSelection()

return (
  <div>
    <p>Selection type: {type}</p>
    <p>Is collapsed: {() => isCollapsed() ? 'Yes' : 'No'}</p>
  </div>
)
```

## Selection Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| anchorNode | `Observable<Node | null>` | The node where the selection starts |
| anchorOffset | `Observable<number>` | The offset within the anchor node where the selection starts |
| focusNode | `Observable<Node | null>` | The node where the selection ends |
| focusOffset | `Observable<number>` | The offset within the focus node where the selection ends |
| isCollapsed | `Observable<boolean>` | Whether the selection is collapsed (single cursor) |
| rangeCount | `Observable<number>` | The number of ranges in the selection |
| type | `Observable<string>` | The type of selection ('None', 'Caret', or 'Range') |
| ranges | `Observable<Range[]>` | Array of Range objects representing the selection |

## Use Cases

- Building rich text editors
- Creating custom text selection tools
- Implementing context menus based on text selection
- Tracking user text interaction for analytics
- Building annotation tools

## Implementation Details

The hook listens for the 'selectionchange' event on either the provided element or the document. When the selection changes, it updates all the observables with the current selection values.

The hook provides access to the raw Selection object as well as individual observable properties for each selection attribute.

## Browser Support

The Selection API is supported in all modern browsers. The hook will work in any environment where the Selection API is available.

## See Also

- [Selection API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Selection)
- [Woby documentation](https://github.com/vobyjs/woby) for more information about observables