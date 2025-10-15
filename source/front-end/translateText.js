// ------------------------------------------------------------
//  translateText.js
//  Generational translator (Boomer, Millennial, Gen Z)
//  — Frontend API client
// ------------------------------------------------------------

async function translateText(text, fromGen, toGen) {
  if (!text || !text.trim() || fromGen === toGen) return text.trim();

  fromGen = fromGen.toLowerCase();
  toGen = toGen.toLowerCase();

  try {
    console.log("🧠 Making API request for translation...");
    
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        fromGen: fromGen,
        toGen: toGen
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const translation = data.translation;
    
    console.log("🗣️ API Reply:", translation);
    if (translation) return translation;
    
  } catch (err) {
    console.error("❌ API translation failed:", err.message || err);
  }

  // Fallback to original text if API fails
  return text.trim();
}

export { translateText };
