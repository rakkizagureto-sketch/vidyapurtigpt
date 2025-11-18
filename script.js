const API_KEY = "AIzaSyDI6KT4o0tu1OyltNM-hQxSZfOr2t3Ib1E";  // ← Tera key

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  // Add user message
  addMessage(message, "user-message");
  input.value = "";

  // Show typing...
  const typing = addMessage("टाइप कर रहा हूँ...", "bot-message");
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Tu VidyapurtiGPT hai - भारत का पहला मुफ्त AI विज्ञान गुरु। 
          हमेशा बहुत सरल हिंदी में जवाब दे, जैसे 10 साल के बच्चे या किसान को समझा रहे हो।
          हर जवाब के अंत में लिखना: ★ Fact-Check: Reliable / Partially True / False + source
          User: ${message}` }]
        }]
      })
    });

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;

    // Remove typing, add real reply
    typing.innerHTML = reply.replace(/\n/g, "<br>");
  } catch (e) {
    typing.innerHTML = "Sorry bhai, internet slow hai... dobara try karo!";
  }
}

function addMessage(text, className) {
  const div = document.createElement("div");
  div.className = `message ${className}`;
  div.innerHTML = text.replace(/\n/g, "<br>");
  document.getElementById("chat-messages").appendChild(div);
  div.scrollIntoView({ behavior: "smooth" });
  return div;
}

// Enter key se bhi send ho
document.getElementById("user-input").addEventListener("keypress", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

document.getElementById("send-btn").addEventListener("click", sendMessage);
