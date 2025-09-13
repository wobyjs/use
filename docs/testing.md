# Testing with verifies

This project now uses the `verifies` testing framework instead of `@woby/jasmine`.

## Overview

The `verifies` testing framework is a lightweight, browser-based testing framework designed for use with the Woby ecosystem. It provides a simple API for writing and running tests.

## Writing Tests

Tests are written using the `test` and `expect` functions imported from `verifies`:

```typescript
import { test, expect } from 'verifies'

test('my test suite', () => {
  test('should pass', () => {
    expect(1 + 1).toBe(2)
  })
  
  test('should handle async operations', async () => {
    const result = await someAsyncFunction()
    expect(result).toBe('expected value')
  })
})
```

## Running Tests

To run tests, use the following command:

```bash
pnpm test
```

This will build the test files and start a local server where you can view the test results in your browser.

## Test Structure

Tests are organized in a hierarchical structure:
- Top-level `test()` calls define test suites
- Nested `test()` calls define sub-suites or individual tests
- `expect()` calls define assertions

## Assertions

The `expect` function provides various assertion methods:

- `toBe(value)` - Checks strict equality
- `toEqual(value)` - Checks deep equality
- `not.toBe(value)` - Checks strict inequality
- `not.toEqual(value)` - Checks deep inequality

## Mocking and Spying

Verifies provides utilities for mocking and spying:

```typescript
import { fn, spyOn } from 'verifies'

// Create a mock function
const mockFn = fn()

// Spy on an object method
const obj = { method: () => 'original' }
const spy = spyOn(obj, 'method')
```

## Browser Testing

Since verifies is designed for browser testing, you can interact with DOM elements in your tests:

```typescript
import { render, fireEvent } from 'verifies'

test('component test', async () => {
  const { screen } = await render(<MyComponent />)
  const button = screen.getByText('Click me')
  fireEvent.click(button)
  // Add assertions here
})
```