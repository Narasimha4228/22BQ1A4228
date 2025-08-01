/**
 * Logging middleware for capturing application events and errors
 */

type LogLevel = 'info' | 'warn' | 'error' | 'fatal';

interface LogEntry {
    stack: string;
    level: LogLevel;
    packageName: string;
    message: string;
    timestamp: string;
    metadata?: Record<string, unknown> | undefined;
}

/**
 * Formats a log message with consistent structure
 * @param packageName The package or module name
 * @param message The log message
 * @returns Formatted log message
 */
function formatLogMessage(packageName: string, message: string): string {
    return `[${new Date().toISOString()}] [${packageName}] ${message}`;
}

/**
 * Sends log entry to the test server with retry mechanism
 * @param logEntry The log entry to send
 * @param retryCount Number of retries attempted
 */
async function sendLogToServer(logEntry: LogEntry, retryCount = 0): Promise<void> {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000; // 1 second

    try {
        const response = await fetch('http://localhost:3000/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Log-Level': logEntry.level
            },
            body: JSON.stringify(logEntry),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.error(`Error sending log to server (attempt ${retryCount + 1}/${MAX_RETRIES}):`, error);
        
        if (retryCount < MAX_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return sendLogToServer(logEntry, retryCount + 1);
        }
        return; // Return void when max retries are exceeded
    }
}

/**
 * Log function that captures and sends application events to the test server
 * @param stack The stack trace or component stack
 * @param level The log level (info, warn, error, fatal)
 * @param package The package or module name
 * @param message The log message
 * @param metadata Optional metadata to include with the log
 */
function Log(
    stack: string, 
    level: LogLevel, 
    packageName: string, 
    message: string, 
    metadata?: Record<string, unknown>
): void {
    const logEntry: LogEntry = {
        stack,
        level,
        packageName,
        message,
        timestamp: new Date().toISOString(),
        ...(metadata && { metadata })
    };

    // Send log to server asynchronously
    sendLogToServer(logEntry);
    
    // Format message for console
    const formattedMessage = formatLogMessage(packageName, message);
    
    // Log to console for development purposes
    switch (level) {
        case 'info':
            console.log(formattedMessage);
            break;
        case 'warn':
            console.warn(formattedMessage);
            break;
        case 'error':
        case 'fatal':
            console.error(formattedMessage, '\nStack:', stack);
            break;
    }
}

// Export the Log function
module.exports = { Log };

