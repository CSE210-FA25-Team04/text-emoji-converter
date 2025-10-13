import re, requests

OLLAMA_API = "http://localhost:11434/api/chat"

SYSTEM_PROMPT = """
You are a bilingual translator that switches automatically between two styles:

1. **Plain English** – clear, direct, neutral language.
2. **Gen Z Emoji Slang** – short, emoji-heavy, trendy phrasing.

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

"""

def is_emoji_input(text):
    emoji_pattern = re.compile("[\U00010000-\U0010ffff]", flags=re.UNICODE)
    return bool(emoji_pattern.search(text))

def select_model(text):
    # For now use mistral for both, but you can change this later
    return "mistral"

def get_mode(text):
    if is_emoji_input(text):
        return "to_plain"
    return "to_genz"

user_input = input("Enter text: ")
model = select_model(user_input)
mode = get_mode(user_input)
print(f"Using model: {model} | Mode: {mode}")

r = requests.post(OLLAMA_API, json={
    "model": model,
    "messages": [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": f"{mode}: {user_input}"}
    ],
    "stream": False
})
print("Response:", r.json()["message"]["content"])
