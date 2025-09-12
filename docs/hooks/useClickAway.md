# useClickAway

A hook that detects clicks outside of a specified element.

This hook adds an event listener to the document that triggers a callback when a click occurs outside of the specified element. It's useful for implementing dropdowns, modals, and other UI components that should close when clicking elsewhere.

## Usage

```tsx
import { useClickAway } from '@woby/use'

const MyComponent = () => {
  const dropdownRef = $(null)
  const [isOpen, setIsOpen] = useState(false)
  
  useClickAway(dropdownRef, () => setIsOpen(false))
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Dropdown</button>
      {isOpen && (
        <div ref={dropdownRef}>
          <p>Dropdown content</p>
        </div>
      )}
    </div>
  )
}
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| ref | `Observable<T>` | An observable containing a reference to the element |
| clickEvent | `() => void` | The callback function to execute when clicking outside |

## Return Value

`void`

## Example

```tsx
const dropdownRef = $(null)
const closeDropdown = () => setIsOpen(false)

useClickAway(dropdownRef, closeDropdown)

return (
  <div ref={dropdownRef}>
    {/* dropdown content */}
  </div>
)
```

## ClickAwayWrapper Component

The package also exports a `ClickAwayWrapper` component that provides the same functionality as a wrapper component.

### Props

| Prop | Type | Description |
| ---- | ---- | ----------- |
| clickEvent | `() => void` | The callback function to execute when clicking outside |
| children | `ReactNode` | The child elements |

### Example

```tsx
<ClickAwayWrapper clickEvent={() => console.log('Clicked outside!')}>
  <div>Click inside me!</div>
</ClickAwayWrapper>
```