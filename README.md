# 22BQ1A4228
# Logging Middleware

A TypeScript-based logging middleware that captures and logs application events, errors, and debug information.

## Features

- Log levels: info, warn, error, fatal
- Captures stack traces
- Sends logs to a test server
- Console output for development
- Timestamp for each log entry

## Usage

```typescript
import { Log } from './src/loggingMiddleware';

// Example usage:
Log("MyComponent", "info", "MyPackage", "Operation completed successfully");
Log("DatabaseLayer", "error", "Database", "Failed to connect to database");
```

## Log Levels

- `info`: General informational messages
- `warn`: Warning messages that don't stop execution
- `error`: Error messages for recoverable errors
- `fatal`: Critical errors that may stop execution

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

## License

MIT
