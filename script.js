const GEMINI_KEY = "AIzaSyDI6KT4o0tu1OyltNM-hQxSZfOr2t3Ib1E";

function addMessage(text, sender = "bot") {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.innerHTML = text.replace(/\n/g, "<br>");
  document.getElementById("messages").appendChild(div);
  div.scrollIntoView({behavior: "smooth"});
}

async function send() {
  const input = document.getElementById("input");
  const msg = input.value.trim();
  if (!msg) return;
  addMessage(msg, "user");
  input.value = "";

  addMessage("टाइप कर रहा हूँ...", "bot");

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Tu VidyapurtiGPT hai। बहुत सरल हिंदी में जवाब दे। 
        हर जवाब के अंत में: ★ Fact-Check: Reliable/Partially True/False + source
        User: ${msg}` }]}]
      })
    });
    const data = await res.json();
    const reply = data.candidates[0].content.parts[0].text;
    document.querySelector("#messages .message:last-child").innerHTML = reply.replace(/\n/g, "<br>");
  } catch(e) {
    document.querySelector("#messages .message:last-child").innerHTML = "Network issue ho gaya, dobara try karo!";
  }
}

document.getElementById("send").onclick = send;
document.getElementById("input").addEventListener("keypress", e => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
});

// Sidebar navigation
document.querySelectorAll("nav a").forEach(a => {
  a.onclick = () => {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.querySelectorAll("nav a").forEach(link => link.classList.remove("active"));
    document.getElementById(a.dataset.page + "-page").classList.add("active");
    a.classList.add("active");
  }
});
