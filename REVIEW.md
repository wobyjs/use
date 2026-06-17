# Code Review: @woby/use

**Phase**: Shadow DOM support for useClickAway
**Review Date**: 2026-05-16
**Review Depth**: standard

---

## Findings Summary

| Severity | Count |
|----------|-------|
| Critical | 1 |
| Warning  | 3 |
| Info     | 2 |

---

## Critical

### C1: Test Infrastructure Broken — `@woby/chk/index.css` Unresolvable

**File**: `test/index.ts:3`

The test build fails with:
```
Failed to find monorepo root... cannot resolve import "@woby/chk/index.css"
```

The `vite.config.test.mts` builds the test bundle as a **library** (`lib.formats: ['es']`). Library mode externalizes all non-node dependencies and does not apply Vite's postcss/textcss processing. The `@woby/chk/index.css` import cannot be resolved because:

1. `@woby/chk` is a workspace: dependency — the symlink isn't resolved during library-mode builds
2. Library mode disables Vite's CSS handling pipeline

**Impact**: Full test suite cannot be run. No regression guard exists.

**Fix**: Either:
- Add the CSS to `rollupOptions.external` and copy it manually, OR
- Copy `index.css` from `@woby/chk/src/index.css` into the test directory and import it locally, OR
- Change the test build from library mode to application mode

---

## Warnings

### W1: Shadow DOM fix is correct but fragile

**File**: `src/useClickAway.tsx:37`

```ts
const actualTarget = event.composedPath?.()?.[0] || event.target
```

`composedPath()` returns an empty array in some edge cases (abort signal events, early return in some browsers). The optional chaining `?.[0]` returns `undefined` in that case, so the `|| event.target` fallback correctly handles it.

**Assessment**: Functionally correct. Mark as `// TODO: add test coverage for shadow DOM` if no integration test exists.

### W2: `//@ts-ignore` suppresses type safety

**File**: `src/useClickAway.tsx:34`

The `$$` call is suppressed. Verify that `$$` returns a known type at runtime — a type assertion or cast is preferable to `//@ts-ignore`.

### W3: `event` parameter is untyped

**File**: `src/useClickAway.tsx:33`

```ts
const handleClickOutside = (event) => { ... }
```

Should be typed as `MouseEvent` for correctness and IDE support.

### W4: ClickAwayWrapper spreads unknown props to div

**File**: `src/useClickAway.tsx:63`

```tsx
return <div ref={wrapperRef} {...props}>{children}</div>
```

Unknown/extra props are silently passed to the DOM element. Consider filtering or explicitly extracting known props.

---

## Info

### I1: No unit test for `useClickAway`

No `useClickAway.test.ts` exists. Given the shadow DOM fix, a test would prevent regression.

### I2: No integration test for shadow DOM behavior

The `composedPath()` fix should be covered by an integration test in a shadow root context.

---

## Changes Reviewed

### `src/useClickAway.tsx`

```diff
-            if (refs.length && !refs.some(el => el.contains(event.target)))
+            // Use composedPath()[0] to get the actual target inside shadow DOM
+            const actualTarget = event.composedPath?.()?.[0] || event.target
+            if (refs.length && !refs.some(el => el.contains(actualTarget)))
```

**Verdict**: The logic change is correct. `composedPath()` returns the actual event target within shadow DOM boundaries, falling back to `event.target` for regular DOM. The optional chaining handles the empty-array case.