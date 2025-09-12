# Contributing

We welcome contributions to @woby/use! Here's how you can help:

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/use.git`
3. Create a branch for your feature: `git checkout -b feature/your-feature-name`
4. Install dependencies: `pnpm install`

## Development Workflow

### Running the Development Server

```bash
pnpm dev
```

This starts the development server with hot reloading.

### Building

```bash
pnpm build
```

This builds the library for distribution.

### Testing

```bash
pnpm test
```

Run tests to ensure your changes don't break existing functionality.

## Adding New Hooks

1. Create a new directory in `src/` with your hook name
2. Implement your hook in `src/hook-name/hook-name.ts`
3. Create a demo file in `src/hook-name/hook-name.demo.tsx`
4. Add tests in `src/hook-name/hook-name.test.ts`
5. Export your hook in `src/index.tsx`

### Hook Implementation Guidelines

- Keep hooks focused on a single responsibility
- Provide TypeScript typings
- Include JSDoc comments for all public APIs
- Follow React hooks conventions
- Handle edge cases gracefully
- Minimize dependencies

### Demo Guidelines

- Create a self-contained example component
- Demonstrate primary use cases
- Include interactive elements when appropriate
- Keep examples simple and clear

### Testing Guidelines

- Write unit tests for all functionality
- Test edge cases and error conditions
- Use descriptive test names
- Follow existing test patterns in the codebase

## Code Style

- Follow the existing code style in the project
- Use TypeScript for all new code
- Ensure 100% TypeScript strict compliance
- Write JSDoc for all public APIs

## Submitting Changes

1. Commit your changes: `git commit -am "Add new feature"`
2. Push to your fork: `git push origin feature/your-feature-name`
3. Create a pull request from your fork to the main repository

## Reporting Issues

- Use the GitHub issue tracker
- Include a clear description of the problem
- Provide steps to reproduce
- Include code examples when relevant
- Specify your environment (browser, Node version, etc.)