# Object

A set of utilities for working with objects and observables in Woby.

The Object module provides functions for cloning, assigning, and manipulating objects with observable properties. It includes utilities for deep and shallow cloning, property assignment with various options, and unwrapping observable values.

## Functions

### assign

Copy properties from a source object to a target object with various options.

```tsx
import { assign } from '@woby/use'

const target = { name: $('John'), age: $(30) }
const source = { name: 'Jane', active: $(true) }

// Basic assignment
assign(target, source)

// Assignment with options
assign(target, source, {
  condition: 'new', // Only assign new properties
  copyByRef: true,  // Assign by reference
  track: true       // Track source observables
})
```

### clone

Creates a shallow or deep clone of an object, preserving observable properties.

```tsx
import { clone } from '@woby/use'

const original = { name: 'John', age: 30, active: $(true) }

// Shallow clone
const shallowClone = clone(original)

// Deep clone
const deepClone = clone(original, true)
```

### make

Make every property of an object observable.

```tsx
import { make } from '@woby/use'

const obj = { name: 'John', age: 30 }

// Make properties observable
const observableObj = make(obj)
```

### $$$ (Triple Dollar)

Object props resolver, 1 level. Unwraps observable properties of an object to get their current values.

```tsx
import { $$$ } from '@woby/use'

const obj = { name: $('John'), age: $(30) }

// Unwrap all properties
const unwrapped = $$$(obj)
// unwrapped = { name: 'John', age: 30 }

// Unwrap specific properties
const partial = $$$(obj, 'name')
// partial = { name: 'John' }
```

### $$$$ (Quad Dollar)

Object props deep resolver. Deeply unwraps observable properties of an object to get their current values.

```tsx
import { $$$$ } from '@woby/use'

const obj = { user: $({ name: $('John'), age: $(30) }), active: $(true) }

// Deep unwrap all properties
const unwrapped = $$$$(obj)
// unwrapped = { user: { name: 'John', age: 30 }, active: true }

// Deep unwrap specific properties
const partial = $$$$(obj, 'user')
// partial = { user: { name: 'John', age: 30 } }
```

## Types

### AssignOptions

Options for the assign function:

| Property | Type | Description |
| -------- | ---- | ----------- |
| copyByRef | `boolean` | If true, assign by reference. If false, perform a deep assign by value. Default: true |
| condition | `'new' \| 'old' \| 'all' \| 'empty'` | Copy methods. Default: 'all' |
| keepTargetNoObservable | `boolean` | If true, keep target properties as non-observable. Default: false |
| track | `boolean` | Track source observables with useEffect. Default: false |
| merge | `Array<keyof T>` | Keys to merge instead of replace |

### Observant

Makes every property of an object observable:

```typescript
type Observant<T> = T extends object
  ? { [K in keyof T]: T[K] extends Function ? T[K] :
      T[K] extends ObservableMaybe<infer U> ? Observable<U> : Observable<T[K]> } 
  : T
```

### Unobservant

Unwraps observable properties of an object:

```typescript
type Unobservant<T> = T extends object
  ? { [K in keyof T]: T[K] extends ObservableMaybe<infer U> ? NonNullable<U> : T[K] }
  : T
```

## Use Cases

- Cloning objects with observable properties
- Merging objects with different assignment strategies
- Converting plain objects to observable objects
- Extracting current values from observable objects
- Building complex state management systems
- Creating immutable updates to observable objects

## Implementation Details

The Object module provides utilities for working with objects that contain observable properties. It handles both shallow and deep operations while preserving the observable nature of properties.

Key features:
- Deep and shallow cloning with observable preservation
- Flexible property assignment with multiple strategies
- Recursive unwrapping of nested observable objects
- Type-safe operations with comprehensive TypeScript support

## See Also

- [Woby documentation](https://github.com/wobyjs/woby) for more information about observables
- [Object.assign() documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)