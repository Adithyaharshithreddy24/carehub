const chatbox = document.getElementById("chatbox");
const form = document.getElementById("chat-form");
const messageInput = document.getElementById("message");

let chatHistory = [];

function appendMessage(sender, text) {
    const msg = document.createElement("p");
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatbox.appendChild(msg);
    chatbox.scrollTop = chatbox.scrollHeight;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (!message) return;

    appendMessage("You", message);
    messageInput.value = "";

    try {
        const res = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, history: chatHistory })
        });

        const data = await res.json();
        appendMessage("Bot", data.response);

        chatHistory.push({ user: message, bot: data.response });
    } catch (err) {
        appendMessage("Bot", "Oops! Something went wrong.");
        console.error(err);
    }
});
