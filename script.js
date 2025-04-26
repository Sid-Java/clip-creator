// API token configuration
const API_TOKEN = process.env.VITE_API_TOKEN || 'pyF1A4IevVb9VXCAfhmqIaHZIdZ5nasw';

async function createClip() {
    const content = document.getElementById('clipContent').value.trim();
    const resultContainer = document.getElementById('result');
    const errorContainer = document.getElementById('error');
    const createButton = document.getElementById('createClip');

    if (!content) {
        showError('Please enter some content for the clip.');
        return;
    }

    // Generate a random clip ID (16 characters)
    const clipId = generateRandomString(16);
    const apiUrl = `https://api.cl1p.net/${clipId}`;

    createButton.disabled = true;
    createButton.textContent = 'Creating...';

    try {
        console.log('Attempting to create clip at:', apiUrl);
        console.log('Using token:', API_TOKEN);
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
                'cl1papitoken': API_TOKEN,
                'Accept': 'text/plain, */*'
            },
            mode: 'no-cors', // Try with no-cors mode
            body: content
        });

        console.log('Response received:', response);
        console.log('Response status:', response.status);
        console.log('Response type:', response.type);

        // With no-cors mode, we won't get an ok status
        // Instead, check if we got a response at all
        if (response.type === 'opaque') {
            // Assume success if we got a response
            document.getElementById('clipLink').value = apiUrl;
            resultContainer.classList.remove('hidden');
            errorContainer.classList.add('hidden');
        } else {
            throw new Error(`Unexpected response type: ${response.type}`);
        }
    } catch (error) {
        console.error('Detailed error information:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Full error:', error);

        if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
            showError(`Connection error: Unable to reach cl1p.net API. 
                      Please check:\n
                      1. Your internet connection\n
                      2. Any ad-blockers or security software\n
                      3. Try refreshing the page`);
        } else {
            showError(`Error: ${error.message}\n\nPlease try again or check the console for more details.`);
        }
    } finally {
        createButton.disabled = false;
        createButton.textContent = 'Create Clip';
    }
}

function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function copyLink() {
    const linkInput = document.getElementById('clipLink');
    linkInput.select();
    document.execCommand('copy');
    
    const copyButton = document.querySelector('.link-container button');
    const originalText = copyButton.textContent;
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
        copyButton.textContent = originalText;
    }, 2000);
}

function showError(message) {
    const errorContainer = document.getElementById('error');
    errorContainer.querySelector('p').textContent = message;
    errorContainer.classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
} 