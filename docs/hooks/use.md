# use

A hook that converts a value or observable into an observable with optional cloning and default value support.

## Import

```typescript
import { use } from '@woby/use'
```

## Usage

```tsx
import { use } from '@woby/use'

// With a primitive value
const observableNumber = use(42)
console.log($$(observableNumber)) // 42

// With an existing observable
const existingObservable = $(42)
const sameObservable = use(existingObservable) // Returns existingObservable

// With cloning
const clonedObservable = use(existingObservable, $$(existingObservable), { clone: true }) // Creates a new observable

// With an object
const obj = { name: 'John', age: 30 }
const observableObj = use(obj)

// With an object and cloning
const clonedObj = use(obj, $$(obj), { clone: true }) // Creates a new observable with a cloned object

// With default value
const observableWithDefault = use(undefined, 'default')
console.log($$(observableWithDefault)) // 'default'

// With makeNew option
const newObservable = use(42, undefined, { makeNew: true }) // Creates a new observable even for primitives
```

## Parameters

| Name         | Type                    | Description                                                                 |
|--------------|-------------------------|-----------------------------------------------------------------------------|
| val          | ObservableMaybe<T> \| T \| undefined | The value or observable to convert                               |
| def          | ObservableMaybe<T> \| T \| undefined | Default value to use if the primary value is undefined           |
| options      | object (optional)       | Options object with clone and makeNew properties                            |
| options.clone| boolean (optional)      | If true, creates a new observable with a cloned value                       |
| options.makeNew| boolean (optional)    | If true, creates a new observable even for primitives                       |

## Return Value

Returns an observable containing the value:

- If input is already an observable and options.clone is false: returns the same observable
- If input is already an observable and options.clone is true: returns a new observable with cloned value
- If input is a plain value: returns a new observable containing that value
- If input is null/undefined: returns an observable containing null or the default value

## Examples

### Basic Usage

```tsx
import { use } from '@woby/use'

function MyComponent() {
  // Create an observable from a primitive value
  const count = use(0)
  
  // Create an observable from an existing observable (no change)
  const existingObservable = $(42)
  const sameObservable = use(existingObservable)
  
  // Create a new observable from an existing one (clone)
  const clonedObservable = use(existingObservable, $$(existingObservable), { clone: true })
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Existing: {sameObservable}</p>
      <p>Cloned: {clonedObservable}</p>
    </div>
  )
}
```

### Working with Objects

```tsx
import { use } from '@woby/use'

function ObjectExample() {
  const obj = { name: 'John', age: 30 }
  
  // Create an observable from an object
  const observableObj = use(obj)
  
  // Create an observable with a cloned object
  const clonedObj = use(obj, $$(obj), { clone: true })
  
  return (
    <div>
      <p>Name: {() => $$(observableObj).name}</p>
      <p>Age: {() => $$(observableObj).age}</p>
    </div>
  )
}
```

### Using Default Values

```tsx
import { use } from '@woby/use'

function DefaultValueExample() {
  // Use a default value when the primary value is undefined
  const value = use(undefined, 'default')
  
  return (
    <div>
      <p>Value: {value}</p>
    </div>
  )
}
```

### Using Options

```tsx
import { use } from '@woby/use'

function OptionsExample() {
  const existingObservable = $(42)
  
  // Create a new observable from an existing one (clone)
  const clonedObservable = use(existingObservable, $$(existingObservable), { clone: true })
  
  // Create a new observable even for primitives
  const newObservable = use(42, undefined, { makeNew: true })
  
  return (
    <div>
      <p>Cloned: {clonedObservable}</p>
      <p>New: {newObservable}</p>
    </div>
  )
}
```

## API Reference

```typescript
function use<T>(
  val: ObservableMaybe<T | undefined> | T | undefined, 
  def?: ObservableMaybe<T | undefined> | T | undefined,
  options?: { clone?: boolean, makeNew?: boolean }
): Observable<T>
```

## Notes

- This hook ensures you always work with an observable, regardless of whether the input is already an observable or a plain value
- The `options.clone` parameter is useful when you want to create a new observable with a cloned value even if the input is already an observable
- The `options.makeNew` parameter is useful when you want to create a new observable even for primitives
- The `def` parameter provides a way to specify a default value when the primary value is undefined
- When `options.clone` is true and the value is an object, the object is cloned using the library's clone function to prevent reference sharing