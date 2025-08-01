const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Log-Level');
    res.header('Access-Control-Allow-Methods', 'POST');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Endpoint to receive logs
app.post('/logs', (req, res) => {
    const logEntry = req.body;
    console.log('\nReceived log entry:');
    console.log('Level:', logEntry.level);
    console.log('Package:', logEntry.packageName);
    console.log('Message:', logEntry.message);
    console.log('Stack:', logEntry.stack);
    console.log('Timestamp:', logEntry.timestamp);
    if (logEntry.metadata) {
        console.log('Metadata:', JSON.stringify(logEntry.metadata, null, 2));
    }
    console.log('-------------------');
    
    // Send success response
    res.status(200).json({ message: 'Log received successfully' });
});

// Start server
app.listen(port, () => {
    console.log(`Log server listening at http://localhost:${port}`);
    console.log('Ready to receive logs...\n');
});
