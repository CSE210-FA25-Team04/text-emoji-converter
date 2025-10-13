📘 README.md
# 🚀 Groq SDK (Node.js)

A minimal Node.js project demonstrating how to use the **Groq SDK** to interact with Groq language models.

---

## 🧩 Requirements

| Tool | Purpose | Download |
|------|----------|-----------|
| **[Node.js (LTS)](https://nodejs.org/en/download)** | JavaScript runtime used to execute the app | |
| **npm** (comes with Node.js) | Package manager for installing dependencies | |
| **Groq SDK** | Library for accessing Groq models | `npm install groq-sdk` |

Verify your installation:
```powershell
node -v
npm -v

## ⚙️ Installation

Clone or download this repository.

Install dependencies:

npm install groq-sdk

## 🔑 Set Your API Key
Option 1 — Temporary (only for this session)
$env:GROQ_API_KEY = "gsk_your_actual_key_here"

Option 2 — Permanent (for all PowerShell sessions)
setx GROQ_API_KEY "gsk_your_actual_key_here"


Then reopen PowerShell and verify:

echo $env:GROQ_API_KEY

## 🧠 Example: index.js
const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: "You are a concise AI assistant.",
      },
      {
        role: "user",
        content: "Explain the importance of low latency LLMs.",
      },
    ],
  });

  console.log(completion.choices[0].message.content);
}

main();


Run it:

node .\index.js

## 🧩 Troubleshooting
Issue	Fix
GroqError: The GROQ_API_KEY environment variable is missing	Set $env:GROQ_API_KEY or restart terminal
npm : not recognized	Reinstall Node.js and ensure “Add to PATH” is checked
BadRequestError: model_decommissioned	Use a current model like llama-3.1-8b-instant or llama-3.3-70b-versatile