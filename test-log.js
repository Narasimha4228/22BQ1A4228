// Test the logging functionality
const testLog = {
    level: "info",
    packageName: "TestApp",
    message: "Test message",
    stack: "TestComponent",
    timestamp: new Date().toISOString()
};

async function sendTestLog() {
    try {
        const response = await fetch('http://localhost:3000/logs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testLog)
        });

        const data = await response.json();
        console.log('Server response:', data);
    } catch (error) {
        console.error('Error sending log:', error);
    }
}

// Run the test
sendTestLog();
