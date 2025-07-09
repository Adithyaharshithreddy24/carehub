from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)

# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY") or "AIzaSyCGQp0Qv7AF1S1YG2OqzB-A8l9e9Je8fec"
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel("gemini-2.0-flash")

MENTAL_HEALTH_KEYWORDS = [
    "anxious", "anxiety", "stress", "depression", "lonely", "panic", "sad", "mental",
    "overwhelmed", "tired", "unmotivated", "burnout", "insomnia", "fear", "emotions",
    "hopeless", "helpless", "calm", "cope", "breathing", "relax", "worried", "feeling",
    "mental health", "mood", "down", "low", "self-care", "therapy", "mindfulness","alone","story","stories","frustration"
]

def is_relevant(message):
    return any(keyword in message.lower() for keyword in MENTAL_HEALTH_KEYWORDS)

def build_prompt(user_message, history=None):
    system_prompt = (
        "You are CareHub, a supportive mental health chatbot. "
        "Be friendly, empathetic, and calm. Do not give medical advice."
    )
    history_text = ""
    if history:
        for turn in history[-5:]:
            history_text += f"User: {turn['user']}\nBot: {turn['bot']}\n"
    return f"{system_prompt}\n\n{history_text}User: {user_message}\nBot:"

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        user_message = data.get("message", "")
        chat_history = data.get("history", [])

        print("User said:", user_message)

        if not is_relevant(user_message):
            return jsonify({"response": "Out of context."})

        prompt = build_prompt(user_message, chat_history)
        print("Prompt:\n", prompt)

        response = model.generate_content(prompt)
        reply = response.text.strip()

        return jsonify({"response": reply})
    except Exception as e:
        print("Error:", e)
        return jsonify({"response": "Oops! Something went wrong."}), 500

@app.route("/", methods=["GET"])
def home():
    return "CareHub is running."

if __name__ == "__main__":
    app.run(debug=True)
