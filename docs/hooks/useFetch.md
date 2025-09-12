# useFetch

A hook that fetches data from a URL.

## Usage

```javascript
import { useFetch } from '@woby/use';

function Component() {
  const { data, error, loading } = useFetch('https://api.example.com/data');

  return (
    <div>
      {() => {
        if ($$(loading)) return 'Loading...';
        if ($$(error)) return `Error: ${$$(error).message}`;
        return `Data: ${JSON.stringify($$(data))}`;
      }}
    </div>
  );
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| url | string | - | The URL to fetch data from |
| options | RequestInit | - | Optional fetch options |

## Return Value

Returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| data | Observable<any> | An observable containing the fetched data |
| error | Observable<Error \| null> | An observable containing any error that occurred |
| loading | Observable<boolean> | An observable indicating if the fetch is in progress |

## Examples

### Basic Usage

```javascript
import { useFetch } from '@woby/use';

function UserProfile({ userId }) {
  const { data, error, loading } = useFetch(`https://api.example.com/users/${userId}`);

  return (
    <div>
      {() => {
        if ($$(loading)) return 'Loading...';
        if ($$(error)) return `Error: ${$$(error).message}`;
        return (
          <div>
            <h2>{$$(data)?.name}</h2>
            <p>Email: {$$(data)?.email}</p>
          </div>
        );
      }}
    </div>
  );
}
```

### With Custom Options

```javascript
import { useFetch } from '@woby/use';

function PostList() {
  const { data, error, loading } = useFetch('https://api.example.com/posts', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer your-token-here'
    }
  });

  return (
    <div>
      {() => {
        if ($$(loading)) return 'Loading...';
        if ($$(error)) return `Error: ${$$(error).message}`;
        return (
          <ul>
            {$$(data)?.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        );
      }}
    </div>
  );
}
```