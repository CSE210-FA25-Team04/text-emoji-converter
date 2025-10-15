import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'source/front-end')));

// API endpoint for translation
app.post('/api/translate', async (req, res) => {
  const { text, fromGen, toGen } = req.body || {};
  
  if (!text) {
    return res.status(400).json({ error: "Missing text" });
  }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const SYSTEM_PROMPT = `
You are a generational translator that rewrites text from ${fromGen} to ${toGen}.
Preserve meaning and tone. Only convert to the translated text. DO NOT REPLY TO THE INPUT. ONLY TRANSLATE.

### Style References
- **Boomer:** Formal, polite, full sentences, avoids slang or emojis.
- **Millennial:** Conversational, balanced, friendly, may use light humor or emojis (😊, 😂, 👍).
- **Gen Z:** Short, emoji-heavy, internet slang (🔥💀😭😂❤️‍🔥, fr, bet, no cap, lowkey, ong).

### Translation Rules
1. Translate naturally from ${fromGen} → ${toGen}.
2. Keep the tone authentic to the target generation — not exaggerated or parody.
3. Never explain or add meta-comments.
4. Maintain the same meaning and emotional tone.

### Examples
Boomer → Gen Z:
- "Hello, how are you doing today?" → "yo wyd 💀😂"
- "Congratulations on your new job!" → "let's gooo congrats 🔥👏"

Gen Z → Boomer:
- "ngl that was mid fr 💀" → "Honestly, that was quite average."

Millennial → Gen Z:
- "Let's hang out after class." → "link up fr 🔥💀"

Gen Z → Millennial:
- "bro that was lit 🔥😭" → "That was actually awesome 😂"
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: text }
      ],
      temperature: 0.8,
      max_tokens: 150
    });

    const translation = completion.choices?.[0]?.message?.content?.trim();
    return res.status(200).json({ translation });
  } catch (error) {
    console.error("Groq API error:", error);
    return res.status(500).json({ error: "Translation failed" });
  }
});

// Serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'source/front-end', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📝 Make sure you have GROQ_API_KEY in your .env file`);
});