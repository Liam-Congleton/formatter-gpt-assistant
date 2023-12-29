// Define handleButtonClick function here
document.getElementById("submit-button").addEventListener("click", handleButtonClick);

function handleButtonClick() {
    const inputText = document.getElementById('text-input').value;
    console.log('Submitted:', inputText);

    // Send the input text to the server
    fetch('/api/ask-gpt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputText }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data:', data);
        console.log('GPT-3 Response:', data.responseText);
        // Update the output box with the response
        document.getElementById('output-box').textContent = data.responseText;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

window.handleButtonClick = handleButtonClick;
