# useDocumentTitle

A hook that sets the document title.

## Usage

```javascript
import { useDocumentTitle } from '@woby/use';

function Component() {
  useDocumentTitle('My Page Title');

  return <div>Page content</div>;
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| title | string \| Observable<string> | - | The title to set for the document |

## Return Value

This hook does not return a value.

## Examples

### Basic Usage

```javascript
import { useDocumentTitle } from '@woby/use';

function Page() {
  useDocumentTitle('Home Page');

  return <div>Welcome to the home page</div>;
}
```

### Dynamic Title

```javascript
import { $ } from 'woby';
import { useDocumentTitle } from '@woby/use';

function DynamicTitlePage() {
  const pageTitle = $('Dynamic Page');

  useDocumentTitle(pageTitle);

  return (
    <div>
      <input
        value={pageTitle}
        onChange={(e) => pageTitle(e.target.value)}
        placeholder="Enter page title"
      />
      <p>Current title: {pageTitle}</p>
    </div>
  );
}
```

### Title with Page Number

```javascript
import { $ } from 'woby';
import { useDocumentTitle } from '@woby/use';

function PaginatedContent() {
  const pageNumber = $(1);
  const title = $(`Page ${$$(pageNumber)}`);

  useDocumentTitle(title);

  return (
    <div>
      <p>Current page: {pageNumber}</p>
      <button onClick={() => pageNumber(p => p + 1)}>Next Page</button>
      <button onClick={() => pageNumber(p => Math.max(1, p - 1))}>Previous Page</button>
    </div>
  );
}
```