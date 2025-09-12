# useCopyToClipboard

A hook that copies text to the clipboard.

## Usage

```javascript
import { useCopyToClipboard } from '@woby/use';

function Component() {
  const [copied, copy] = useCopyToClipboard();

  return (
    <div>
      <button onClick={() => copy('Text to copy')}>
        {() => $$(copied) ? 'Copied!' : 'Copy to clipboard'}
      </button>
    </div>
  );
}
```

## Parameters

This hook does not take any parameters.

## Return Value

Returns an array with the following elements:

| Index | Type | Description |
|-------|------|-------------|
| 0 | Observable<boolean> | An observable boolean indicating if text was copied |
| 1 | Function | A function to copy text to the clipboard |
| 2 | Function | A function to reset the copied state |

## Examples

### Basic Usage

```javascript
import { useCopyToClipboard } from '@woby/use';

function CopyExample() {
  const [copied, copy] = useCopyToClipboard();

  return (
    <div>
      <p>Click the button to copy text</p>
      <button onClick={() => copy('Hello, world!')}>
        {() => $$(copied) ? 'Copied!' : 'Copy Text'}
      </button>
    </div>
  );
}
```

### Copy Dynamic Content

```javascript
import { $ } from 'woby';
import { useCopyToClipboard } from '@woby/use';

function DynamicCopy() {
  const [copied, copy] = useCopyToClipboard();
  const textToCopy = $('Hello, dynamic world!');

  return (
    <div>
      <input value={textToCopy} onChange={(e) => textToCopy(e.target.value)} />
      <button onClick={() => copy($$(textToCopy))}>
        {() => $$(copied) ? 'Copied!' : 'Copy Input Text'}
      </button>
    </div>
  );
}
```