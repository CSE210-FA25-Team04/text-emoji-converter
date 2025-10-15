import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import Groq from 'groq-sdk';
import path from 'path';
import { fileURLToPath } from 'url';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'source/front-end')));

// Transform endpoint
app.post('/api/transform', async (req, res) => {
  try {
    const { text, mode } = req.body;

    if (!text || !mode) {
      return res.status(400).json({ error: 'Text and mode are required' });
    }

    let systemPrompt;
    if (mode === 'text-to-emoji') {
      systemPrompt = `Convert the following text to emojis. Replace words with appropriate emojis where possible. Keep the structure readable. Examples:
- "I love pizza" → "I ❤️ 🍕"
- "Good morning sunshine" → "Good 🌅 ☀️"
- "Happy birthday" → "😊 🎂"`;
    } else {
      systemPrompt = `Convert emojis to descriptive text. Replace emojis with their meaning in simple words. Examples:
- "I ❤️ 🍕" → "I love pizza"
- "😊 🎂" → "happy birthday"
- "🌧️☔" → "rain umbrella"`;
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.3,
      max_tokens: 150,
    });

    const result = completion.choices[0]?.message?.content?.trim();
    res.json({ result: result || text });

  } catch (error) {
    console.error('Transform error:', error);
    res.status(500).json({ error: 'Transform failed' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'source/front-end/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
