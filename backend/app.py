from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/ask", methods=["POST"])
def ask_question():
    data = request.json
    question = data.get("question", "")
    context = data.get("context", "")

    prompt = f"""
    You are an AI interview coach. Answer the following interview question clearly and concisely.
    Question: {question}
    Context (if any): {context}
    Provide a structured answer with examples.
    """

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.5
    )

    return jsonify({"answer": response.choices[0].message.content})

if __name__ == "__main__":
    app.run(debug=True)
