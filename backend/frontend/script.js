let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('questionDisplay').value = transcript;
    };
}

document.getElementById('recordBtn').addEventListener('click', () => {
    if (recognition) {
        recognition.start();
    } else {
        alert("Speech recognition not supported in this browser.");
    }
});

async function getAnswer() {
    const question = document.getElementById('questionDisplay').value;
    const output = document.getElementById('answerOutput');

    if (!question) {
        output.innerText = "⚠️ Please ask a question first.";
        return;
    }

    output.innerText = "⏳ Generating answer...";
    try {
        const res = await fetch("http://localhost:5000/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question })
        });
        const data = await res.json();
        output.innerText = data.answer;
    } catch {
        output.innerText = "❌ Server error.";
    }
}
