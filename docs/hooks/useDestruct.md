# useDestruct

A custom hook that allows you to destructure properties from an object or elements from an array. Regardless of whether the source is a plain value or an Observable, all destructured properties/elements will be returned as ObservableReadonly instances.

## Usage

```tsx
import { useDestruct } from '@woby/use'

// Destructuring from a plain object
const { name, age } = useDestruct({ name: 'Alice', age: 30 }, 'name', 'age')
// name is ObservableReadonly<string>, age is ObservableReadonly<number>
// Access values: name(), age()

// Destructuring from an Observable object
const user = $<{ name: string, age: number }>({ name: 'Bob', age: 25 })
const { name: nameObs, age: ageObs } = useDestruct(user, 'name', 'age')
// nameObs is ObservableReadonly<string>, ageObs is ObservableReadonly<number>
// Access values: nameObs(), ageObs()
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| o | `Observable<TInput> | TInput` | The object or array to destructure, or an Observable containing it |
| keys | `...(keyof TInput)[]` | Optional. The specific keys (for objects) or indices (for arrays) to destructure. If not provided, all properties/elements will be destructured |

## Return Value

Returns `DestructuredResult<TInput>` - an object or array containing the destructured properties or elements, each wrapped in an `ObservableReadonly`.

## Examples

### Destructuring from a plain object

```tsx
const { name, age } = useDestruct({ name: 'Alice', age: 30 }, 'name', 'age')
// name is ObservableReadonly<string>, age is ObservableReadonly<number>
// Access values: name(), age()
```

### Destructuring from an Observable object

```tsx
const user = $<{ name: string, age: number }>({ name: 'Bob', age: 25 })
const { name: nameObs, age: ageObs } = useDestruct(user, 'name', 'age')
// nameObs is ObservableReadonly<string>, ageObs is ObservableReadonly<number>
// Access values: nameObs(), ageObs()
```

### Destructuring all properties from an Observable object

```tsx
const settings = $<{ theme: string, notifications: boolean }>({ theme: 'dark', notifications: true })
const { theme, notifications } = useDestruct(settings)
// theme is ObservableReadonly<string>, notifications is ObservableReadonly<boolean>
```

### Destructuring from a plain array

```tsx
const [first, second] = useDestruct(['apple', 'banana', 'cherry'], 0, 1)
// first is ObservableReadonly<string>, second is ObservableReadonly<string>
```

### Destructuring from an Observable array

```tsx
const items = $<string[]>(['item1', 'item2'])
const [item1Obs, item2Obs] = useDestruct(items, 0, 1)
// item1Obs is ObservableReadonly<string>, item2Obs is ObservableReadonly<string>
```

### Handling properties that are already Observables within an Observable object

```tsx
const complexState = $<{ counter: Observable<number>, status: string }>({ counter: $(0), status: 'active' })
const { counter, status } = useDestruct(complexState)
// counter is ObservableReadonly<Observable<number>> (the original observable is wrapped in a new ObservableReadonly)
// status is ObservableReadonly<string>
```