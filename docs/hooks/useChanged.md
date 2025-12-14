# useChanged

A hook that tracks changes to a value and provides utilities to detect when it changes.

## Usage

```javascript
import { useChanged } from '@woby/use';

function MyComponent() {
  const [count, setCount] = useState(0);
  const { value, previousValue, diff } = useChanged(count);
  
  const handleChange = () => {
    setCount(count + 1);
    // Call diff() to check if value changed and update previousValue
    if (diff()) {
      console.log(`Value changed from ${previousValue()} to ${value()}`);
    }
  };
  
  return (
    <div>
      <p>Current: {value()}</p>
      <p>Previous: {previousValue()}</p>
      <button onClick={handleChange}>Increment</button>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| val | ObservableMaybe&lt;T&gt; | The value to track for changes. Can be an observable or a plain value. |

## Return Value

Returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| value | Observable&lt;T&gt; | The current value as an observable |
| previousValue | Observable&lt;T&gt; | The previous value as an observable |
| changed | Observable&lt;number&gt; | A counter tracking how many times the value has changed |
| diff | function | A function that checks if the current value differs from the previous value and updates the previous value if they do |

## Example

```javascript
import { useChanged } from '@woby/use';

function FormComponent() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const { value, previousValue, diff } = useChanged(formData);
  
  const handleInputChange = (field, newValue) => {
    setFormData(prev => ({ ...prev, [field]: newValue }));
    
    // Check if the form data has changed
    if (diff()) {
      console.log('Form data changed:', previousValue(), '->', value());
    }
  };
  
  return (
    <form>
      <input 
        value={formData.name} 
        onChange={e => handleInputChange('name', e.target.value)} 
        placeholder="Name"
      />
      <input 
        value={formData.email} 
        onChange={e => handleInputChange('email', e.target.value)} 
        placeholder="Email"
      />
    </form>
  );
}
```