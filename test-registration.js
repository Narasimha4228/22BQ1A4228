// Test registration request
const registrationData = {
    "email": "22BQ1A4228@vvit.net",
    "name": "Chilamkuri Narasimha Reddy",
    "mobileNo": "6281729272",
    "githubUsername": "Narasimha4228",
    "rollNo": "22Bq1a4228",
    "accessCode": "PnVBFV"
};

async function testRegistration() {
    try {
        const response = await fetch('http://localhost:3000/evaluation-service/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        });

        const data = await response.json();
        console.log('Registration Response:', data);
        
        if (data.clientId && data.clientSecret) {
            console.log('\nIMPORTANT: Save your client credentials:');
            console.log('Client ID:', data.clientId);
            console.log('Client Secret:', data.clientSecret);
        }
    } catch (error) {
        console.error('Error during registration:', error);
    }
}

// Run the test
testRegistration();
