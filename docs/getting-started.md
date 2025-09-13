# Getting Started

## Installation

To install @woby/use in your project:

```bash
npm install @woby/use
```

or with yarn:

```bash
yarn add @woby/use
```

or with pnpm:

```bash
pnpm add @woby/use
```

## Basic Usage

Import any hook you need directly from the package:

```javascript
import { useToggle, useCounter, useLocalStorage } from '@woby/use';

function MyComponent() {
  const [value, toggle] = useToggle(false);
  const { count, increment, decrement } = useCounter(0);
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <div>
      <p>Toggle value: {() => $$(value) ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
      
      <p>Count: {() => $$(count)}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name" 
      />
    </div>
  );
}
```

## Framework Compatibility

The hooks in this library are designed to work with:
- React (16.8+)
- Voby (with appropriate JSX configuration)

## TypeScript Support

All hooks come with full TypeScript support and type definitions included.

## Reactive Patterns

@woby/use is built on top of Voby's reactive system. Here are the key patterns:

1. **Direct Observable Passing**: For simple display of observable values, use `{observable}`

2. **Computed Expressions**: For conditional rendering or transformations, use `{() => $$(observable) ? 'true' : 'false'}`

3. **Property Access**: When accessing properties of observable objects, use `{() => $$(observable).property}`

Example:

```javascript
import { $, $$ } from 'woby';
import { useCounter, useBoolean } from '@woby/use';

function MyComponent() {
  const { count, increment } = useCounter(0);
  const { value: isComplete } = useBoolean(false);
  
  // Direct observable passing
  const name = $('John');
  
  // Observable object
  const user = $({ firstName: 'John', lastName: 'Doe' });
  
  return (
    <div>
      {/* Direct observable passing */}
      <p>Name: {name}</p>
      
      {/* Computed expression */}
      <p>Count: {() => $$(count)}</p>
      <p>Status: {() => $$(isComplete) ? 'Complete' : 'Pending'}</p>
      
      {/* Property access on observable objects */}
      <p>Full Name: {() => $$(user).firstName + ' ' + $$(user).lastName}</p>
      
      <button onClick={increment}>Increment</button>
      <button onClick={() => isComplete(true)}>Mark Complete</button>
    </div>
  );
}
```

