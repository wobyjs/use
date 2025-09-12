# useDebounce

A hook that debounces a value or function.

## Usage

```javascript
import { $ } from 'woby';
import { useDebounce } from '@woby/use';

function Component() {
  const value = $('');
  const debouncedValue = useDebounce(value, 500);

  return (
    <div>
      <input value={value} onChange={(e) => value(e.target.value)} />
      <p>Value: {value}</p>
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| value | any | - | The value to debounce |
| delay | number | - | The delay in milliseconds |

## Return Value

Returns the debounced value.

## Examples

### Search Input with Debouncing

```javascript
import { $ } from 'woby';
import { useDebounce } from '@woby/use';

function SearchComponent() {
  const searchQuery = $('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  // This will only run when the debounced value changes
  useEffect(() => {
    if ($$(debouncedQuery)) {
      console.log('Searching for:', $$(debouncedQuery));
      // Perform search operation
    }
  }, [$$(debouncedQuery)]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => searchQuery(e.target.value)}
      />
      <p>Searching for: {debouncedQuery}</p>
    </div>
  );
}
```

### Form Validation with Debouncing

```javascript
import { $ } from 'woby';
import { useDebounce } from '@woby/use';

function FormValidation() {
  const email = $('');
  const debouncedEmail = useDebounce(email, 500);
  const isValid = $(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid(emailRegex.test($$(debouncedEmail)));
  }, [$$(debouncedEmail)]);

  return (
    <div>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => email(e.target.value)}
      />
      <p style={{ color: () => $$(isValid) ? 'green' : 'red' }}>
        {() => $$(isValid) ? 'Valid email' : 'Invalid email'}
      </p>
    </div>
  );
}
```