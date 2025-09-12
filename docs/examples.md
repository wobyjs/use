# Examples

## Basic Usage

Here are some examples of how to use the hooks in your applications.

### Counter Component

```jsx
import { useCounter } from '@woby/use';

function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Dark Mode Toggle

```jsx
import { useDarkMode } from '@woby/use';

function DarkModeToggle() {
  const { darkmode, toggle } = useDarkMode();

  return (
    <button onClick={toggle}>
      {() => $$(darkmode) ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
}
```

### Local Storage

```jsx
import { useLocalStorage } from '@woby/use';

function UserProfile() {
  const [name, setName] = useLocalStorage('userName', '');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

### Window Size

```jsx
import { useWindowSize } from '@woby/use';

function WindowSize() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window Width: {width}px</p>
      <p>Window Height: {height}px</p>
    </div>
  );
}
```

### Copy to Clipboard

```jsx
import { useCopyToClipboard } from '@woby/use';

function CopyText() {
  const [copied, copy] = useCopyToClipboard();

  const textToCopy = "Hello, world!";

  return (
    <div>
      <p>{textToCopy}</p>
      <button onClick={() => copy(textToCopy)}>
        {() => $$(copied) ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
}
```

### Toggle Component

```jsx
import { useToggle } from '@woby/use';

function ToggleSwitch() {
  const [value, toggle] = useToggle(false);

  return (
    <div>
      <p>Toggle value: {() => $$(value) ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => value(true)}>Set ON</button>
      <button onClick={() => value(false)}>Set OFF</button>
    </div>
  );
}
```

### Boolean State Management

```jsx
import { useBoolean } from '@woby/use';

function BooleanExample() {
  const { value, setTrue, setFalse, toggle } = useBoolean(false);

  return (
    <div>
      <p>Boolean value: {() => $$(value) ? 'TRUE' : 'FALSE'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={setTrue}>Set True</button>
      <button onClick={setFalse}>Set False</button>
    </div>
  );
}
```

### Debounced Search

```jsx
import { $ } from 'woby';
import { useDebounce } from '@woby/use';

function SearchComponent() {
  const searchQuery = $('');
  const debouncedQuery = useDebounce(searchQuery, 500);

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => searchQuery(e.target.value)}
        placeholder="Search..."
      />
      <p>Debounced query: {debouncedQuery}</p>
    </div>
  );
}
```

### Interval Counter

```jsx
import { useInterval } from '@woby/use';

function IntervalCounter() {
  const count = $(0);
  
  useInterval(() => {
    count(c => c + 1);
  }, 1000);

  return <p>Count: {count}</p>;
}
```

## Advanced Examples

### Custom Hook Composition

```jsx
import { $, $$ } from 'woby';
import { useCounter, useBoolean } from '@woby/use';

function useTimer() {
  const { count, increment, reset: resetCounter } = useCounter(0);
  const { value: isRunning, setTrue, setFalse, toggle } = useBoolean(false);
  
  useInterval(() => {
    if ($$(isRunning)) {
      increment();
    }
  }, 1000);

  const reset = () => {
    resetCounter();
    setFalse();
  };

  return {
    count,
    isRunning,
    start: setTrue,
    stop: setFalse,
    toggle,
    reset
  };
}

function Timer() {
  const { count, isRunning, start, stop, toggle, reset } = useTimer();

  return (
    <div>
      <p>Time: {count}</p>
      <p>Status: {() => $$(isRunning) ? 'Running' : 'Stopped'}</p>
      <button onClick={toggle}>Toggle</button>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Form Validation with Local Storage

```jsx
import { useLocalStorage, useBoolean } from '@woby/use';

function FormWithValidation() {
  const [email, setEmail] = useLocalStorage('userEmail', '');
  const { value: isValid, setTrue, setFalse } = useBoolean(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (validateEmail(value)) {
      setTrue();
    } else {
      setFalse();
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <p style={{ color: () => $$(isValid) ? 'green' : 'red' }}>
        {() => $$(isValid) ? 'Valid email' : 'Invalid email'}
      </p>
    </div>
  );
}
```

## Framework Interoperability

Note: The React/Voby bridge hooks mentioned in older documentation (useVoby, useReact, useOby, useStore) are currently not implemented in this version of the library. Please refer to the demo folder for current usage patterns.