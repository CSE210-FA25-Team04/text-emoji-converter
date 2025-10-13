const Groq = require("groq-sdk");

const groq = new Groq({apiKey: "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" });

const SYSTEM_PROMPT = `
You are a bilingual translator that switches automatically between two styles:

1. **Plain English** - clear, direct, neutral language.
2. **Gen Z Emoji Slang** - short, emoji-heavy, trendy phrasing.

### Behavior
- If the input already contains many emojis or slang (🔥💀😂❤️‍🔥, etc.), interpret it as Gen Z text and translate it **to plain English**.
- Otherwise, treat it as plain English and translate it **to Gen Z emoji slang**.
- Always return only the translated text, never explanations or prefixes.

### Examples
Plain → Gen Z:
- Food is spicy → 🍔 is 🔥  
- I love dancing → I ❤️ 🕺  
- That exam was difficult → That test 💀

Gen Z → Plain:
- 🍔 is 🔥 → The food is spicy.  
- I ❤️ 🕺 → I love dancing.  
- That test 💀 → That exam was difficult.
`;


async function main() {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
        role: "system",
        content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: "I am happy",
        },
      ],
      model: "llama-3.1-8b-instant",
    })
    .then((chatCompletion) => {
      process.stdout.write(chatCompletion.choices[0]?.message?.content || "");
    });
}

main();