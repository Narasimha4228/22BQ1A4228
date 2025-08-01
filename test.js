// Required for fetch in Node.js
const fetch = require('node-fetch');

// Function to send a log
async function sendLog(stack, level, packageName, message, metadata = null) {
    const logEntry = {
        stack,
        level,
        packageName,
        message,
        timestamp: new Date().toISOString(),
        ...(metadata && { metadata })
    };

    try {
        const response = await fetch('http://localhost:3000/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logEntry)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Log sent successfully: [${level}] ${message}`);
        return data;
    } catch (error) {
        console.error('Failed to send log:', error.message);
    }
}

async function runTests() {
    console.log('Testing Logging System...\n');

    // Test info level
    await sendLog("TestComponent", "info", "TestApp", "This is an info message");

    // Test warning level
    await sendLog("TestComponent", "warn", "TestApp", "This is a warning message");

    // Test error level
    await sendLog("TestComponent", "error", "TestApp", "This is an error message");

    // Test fatal level
    await sendLog("TestComponent", "fatal", "TestApp", "This is a fatal error message");

    // Test with metadata
    await sendLog("TestComponent", "error", "TestApp", "Error with metadata", {
        errorCode: "TEST_001",
        timestamp: new Date().toISOString(),
        details: {
            action: "test",
            status: "failed"
        }
    });
}

// Run all tests
runTests().catch(console.error);
