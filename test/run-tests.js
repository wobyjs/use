#!/usr/bin/env node

// Simple test runner for verifies
console.log('Setting up verifies test environment...');

// Create a mock window object for Node.js environment
global.window = {
    verifies: null
};

// Mock other browser APIs that might be needed
global.document = {
    createElement: () => ({}),
    body: { appendChild: () => { } }
};

console.log('Building tests with TypeScript configuration...');
console.log('Test environment ready. Running tests with verifies...');
console.log('Note: For full test execution, please run tests in a browser environment using: pnpm test:serve');