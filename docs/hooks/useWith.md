# useWith

A hook that allows you to use an observable value with a callback function that is called whenever the value changes.

## Usage

```javascript
import { useWith } from '@woby/use';

function MyComponent() {
  const [data, setData] = useState({ name: 'John', age: 30 });
  
  useWith(data, (unwrappedData) => {
    console.log('Data changed:', unwrappedData);
    // Perform side effects when data changes
  });
  
  return (
    <div>
      <p>Name: {data.name}</p>
      <p>Age: {data.age}</p>
      <button onClick={() => setData({...data, age: data.age + 1})}>
        Increase Age
      </button>
    </div>
  );
}
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| obj | ObservableMaybe&lt;T&gt; | The observable or plain value to watch for changes |
| func | function | The callback function to execute when the value changes. Receives the unwrapped value as a parameter |

## Return Value

This hook does not return a value. It's designed to perform side effects when the observed value changes.

## Example

```javascript
import { useWith } from '@woby/use';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Fetch user data when userId changes
  useWith(userId, async (id) => {
    if (id) {
      setLoading(true);
      try {
        const userData = await fetchUserById(id);
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    }
  });
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No user selected</div>;
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}
```