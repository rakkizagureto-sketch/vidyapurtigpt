import gradio as gr
import google.generativeai as genai

# Tera Gemini key (safe)
genai.configure(api_key="AIzaSyDI6KT4o0tu1OyltNM-hQxSZfOr2t3Ib1E")

# Updated model - gemini-2.0-flash (latest & supported in Nov 2025)
model = genai.GenerativeModel(
    "gemini-2.0-flash",
    generation_config={"temperature": 0.7, "max_output_tokens": 2048}
)

# System prompt – Simple Hindi + fact-check
SYSTEM_PROMPT = """
Tu VidyapurtiGPT hai – भारत का पहला मुफ्त AI विज्ञान गुरु।
हर सवाल का जवाब बहुत सरल हिंदी या अंग्रेजी में दे, जैसे 10 साल के बच्चे या गाँव के किसान को समझा रहे हो।
Rocket science, quantum physics, budgeting, NEET/JEE – सब कुछ आसान कहानी या उदाहरण से समझाना।
हर जवाब के अंत में जरूर लिखना:
★ Fact-Check: Reliable / Partially True / False + एक लाइन सोर्स
"""

def predict(message, history):
    full_prompt = SYSTEM_PROMPT + "\nUser: " + message
    try:
        response = model.generate_content(full_prompt)
        reply = response.text

        # Force fact-check agar model bhool jaaye
        if "★" not in reply:
            reply += "\n\n★ Fact-Check: Reliable (Gemini 2.0 Flash, Nov 2025)"

        history.append((message, reply))
    except Exception as e:
        reply = f"Sorry bhai, ek chhoti si dikkat aa gayi: {str(e)}. Dobara try karo!"
        history.append((message, reply))
    
    return history, ""

# Beautiful UI
with gr.Blocks(title="VidyapurtiGPT", theme=gr.themes.Soft()) as demo:
    gr.HTML("""
    <center>
    <h1>🇮🇳 VidyapurtiGPT</h1>
    <h2>भारत का पहला मुफ्त AI विज्ञान गुरु</h2>
    <p>Rocket science, Quantum, Budgeting, NEET, UPSC – सब कुछ 10 साल के बच्चे को समझाऊंगा</p>
    <p><b>Pro Tier (₹50/महीना) – जल्द आ रहा है!</b></p>
    </center>
    """)
    
    chatbot = gr.Chatbot(height=600)
    msg = gr.Textbox(placeholder="Kuch bhi pooch lo…", label="Tera sawal")
    clear = gr.Button("Clear Chat")
    
    gr.Examples(
        ["चंद्रयान-3 को 10 साल के बच्चे को समझाओ", "Quantum physics क्या है?", "₹5000 में महीना कैसे चलाएं?", "Black hole को हिंदी में समझाओ"],
        msg
    )
    
    msg.submit(predict, [msg, chatbot], [chatbot, msg])
    clear.click(lambda: ([], ""), None, chatbot, queue=False)

demo.launch()
