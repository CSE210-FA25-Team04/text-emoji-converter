/**
 * Generation Bridge Translator!
 * Translates communication styles between Millennial, Gen Z, and Boomer generations
 * 
 */

'use strict';

// -------------------------------------------
// Different Configuration and Data
// -------------------------------------------

/**
 * Some starting patterns and rules for each generation combination
 * Structure: translations[fromGeneration][toGeneration] = { patterns, suffix }
 * MUST BE REPLACED BY LLM API!!!!!
 * @const {Object}
 */
const translations = {
  millennial: {
    genz: {
      patterns: [
        { from: /literally/gi, to: 'fr' },
        { from: /dying/gi, to: 'dead' },
        { from: /extra/gi, to: 'too much' },
        { from: /amazing/gi, to: 'bussin' },
        { from: /cool/gi, to: 'fire' },
        { from: /awesome/gi, to: 'slaps' },
        { from: /crazy/gi, to: 'wild' },
        { from: /😂/g, to: '💀' },
        { from: /💼/g, to: '💯' },
        { from: /I'm /gi, to: "I'm " }
      ],
      suffix: ' fr fr'
    },
    boomer: {
      patterns: [
        { from: /literally/gi, to: 'really' },
        { from: /extra/gi, to: 'excessive' },
        { from: /amazing/gi, to: 'wonderful' },
        { from: /cool/gi, to: 'neat' },
        { from: /awesome/gi, to: 'excellent' },
        { from: /😂/g, to: '😊' },
        { from: /💀/g, to: '😄' },
        { from: /💼/g, to: '📋' },
        { from: /no cap/gi, to: 'honestly' },
        { from: /fr fr/gi, to: 'really' }
      ]
    }
  },
  genz: {
    millennial: {
      patterns: [
        { from: /fr fr/gi, to: 'literally' },
        { from: /\bfr\b/gi, to: 'seriously' },
        { from: /no cap/gi, to: 'no lie' },
        { from: /bussin/gi, to: 'amazing' },
        { from: /slaps/gi, to: 'rocks' },
        { from: /fire/gi, to: 'awesome' },
        { from: /dead/gi, to: 'dying' },
        { from: /💀/g, to: '😂' },
        { from: /💯/g, to: '👍' }
      ]
    },
    boomer: {
      patterns: [
        { from: /fr fr/gi, to: 'really' },
        { from: /\bfr\b/gi, to: 'truly' },
        { from: /no cap/gi, to: 'honestly' },
        { from: /bussin/gi, to: 'excellent' },
        { from: /slaps/gi, to: 'is great' },
        { from: /fire/gi, to: 'wonderful' },
        { from: /dead/gi, to: 'laughing' },
        { from: /bruh/gi, to: 'buddy' },
        { from: /💀/g, to: '😊' },
        { from: /💯/g, to: '👍' },
        { from: /🔥/g, to: '⭐' }
      ]
    }
  },
  boomer: {
    millennial: {
      patterns: [
        { from: /the bee's knees/gi, to: 'amazing' },
        { from: /groovy/gi, to: 'cool' },
        { from: /excellent/gi, to: 'awesome' },
        { from: /wonderful/gi, to: 'great' },
        { from: /neat/gi, to: 'cool' },
        { from: /swell/gi, to: 'nice' },
        { from: /☎️/g, to: '📱' },
        { from: /📻/g, to: '💻' },
        { from: /📋/g, to: '💼' }
      ]
    },
    genz: {
      patterns: [
        { from: /the bee's knees/gi, to: 'bussin' },
        { from: /groovy/gi, to: 'fire' },
        { from: /excellent/gi, to: 'slaps' },
        { from: /wonderful/gi, to: 'fire' },
        { from: /neat/gi, to: 'cool' },
        { from: /honestly/gi, to: 'no cap' },
        { from: /really/gi, to: 'fr' },
        { from: /☎️/g, to: '📱' },
        { from: /📻/g, to: '💻' },
        { from: /😊/g, to: '💀' },
        { from: /👍/g, to: '💯' }
      ],
      suffix: ' fr'
    }
  }
};

/**
 * Emoji data organized by categories for the emoji picker
 * @const {Object}
 */
const emojiData = {
  smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '💀', '☠️'],
  gestures: ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁', '👅', '👄'],
  objects: ['💼', '📁', '📂', '📅', '📆', '📇', '📈', '📉', '📊', '📋', '📌', '📍', '📎', '📏', '📐', '✂️', '🗃', '🗄', '🗑', '🔒', '🔓', '🔏', '🔐', '🔑', '🗝', '🔨', '🪓', '⛏', '⚒', '🛠', '🗡', '⚔️', '🔫', '🏹', '🛡', '🔧', '🔩', '⚙️', '🗜', '⚖️', '🦯', '🔗', '⛓', '🧰', '🧲', '📱', '💻', '⌨️', '🖥', '🖨', '🖱', '🖲', '💽', '💾', '💿', '📀', '🧮', '🎥', '🎬', '📷', '📸', '📹', '📼', '🔍', '🔎', '🕯', '💡', '🔦', '🏮', '📔', '📕', '📖', '📗', '📘', '📙', '📚', '📓', '📒', '📃', '📜', '📄', '📰', '🗞', '📑', '🔖', '🏷'],
  symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅', '🈯', '💹', '❇️', '✳️', '❎', '🌐', '💠', '🔠', '🔡', '🔢', '🔣', '🔤', '🆗', '🆙', '🆒', '🆕', '🆓', '🔟', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫', '⚪', '🟤', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲', '▪️', '▫️', '◾', '◽', '◼️', '◻️', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛', '⬜', '🟫']
};

/**
 * Generation display labels mapping
 * @const {Object}
 */
const GENERATION_LABELS = {
  millennial: 'Millennial',
  genz: 'Gen Z',
  boomer: 'Boomer'
};

/**
 * Toast notification duration in milliseconds
 * @const {number}
 */
const TOAST_DURATION = 3000;
/**
 * Toast hide animation duration in milliseconds
 * @const {number}
 */
const TOAST_HIDE_DURATION = 250;

// -------------------------------------------
// Application State
// -------------------------------------------

/**
 * Application state object
 * Tracks the current emoji picker target
 */
const state = {
  /** @type {string|null} Current target for emoji insertion ('input' or null) */
  currentEmojiTarget: null
};

// -------------------------------------------
// DOM Elements
// -------------------------------------------
/**
 * Cache all DOM elements on initialization to avoid repeated queries
 * @const {Object}
 */
const elements = (typeof document !== 'undefined')
  ? {
      // Generation selectors
      fromGenSelect: document.getElementById('from-generation'),
      toGenSelect: document.getElementById('to-generation'),
      swapButton: document.querySelector('.swap-button'),

      // Main interaction elements
      translateBtn: document.getElementById('translate-btn'),
      inputText: document.getElementById('input-text'),
      outputText: document.getElementById('output-text'),

      // Badges
      inputBadge: document.getElementById('input-badge'),
      outputBadge: document.getElementById('output-badge'),

      // Character counters
      inputCount: document.getElementById('input-count'),
      outputCount: document.getElementById('output-count'),

      // Action buttons
      copyBtn: document.querySelector('.copy-btn'),
      clearBtn: document.querySelector('.clear-btn'),
      emojiBtn: document.querySelector('.emoji-btn'),

      // Example functionality
      exampleBtns: document.querySelectorAll('.example-btn'),
      toggleExamplesBtn: document.getElementById('toggle-examples'),
      examplesSection: document.getElementById('examples-section'),

      // Emoji picker elements
      emojiPicker: document.getElementById('emoji-picker'),
      emojiGrid: document.getElementById('emoji-grid'),
      categoryBtns: document.querySelectorAll('.category-btn'),
      closeEmojiPickerBtn: document.querySelector('.close-btn'),
      emojiPickerBackdrop: document.querySelector('.emoji-picker-backdrop'),

      // Toast notification
      toast: document.getElementById('toast')
    }
  : {};

// -------------------------------------------
// Core Translation Feature
// -------------------------------------------

// Comment - Must be replaced by backend team!
/**
 * Translates text from one generation's communication style to another
 * 
 *
 * Translates text between generational language styles (Millennial, Gen Z, Boomer).
 *
 * This function supports both **server** (Groq API) and **browser/local** (fallback) modes.
 *
 * @param {string} text - The input text to translate.
 * @param {'millennial'|'genz'|'boomer'} fromGen - Source generation style.
 * @param {'millennial'|'genz'|'boomer'} toGen - Target generation style.
 * @returns {Promise<string>} - The translated text.
 *
 * SECURITY NOTE:
 * - The Groq API call uses `process.env.GROQ_API_KEY`, which must be set server-side only.
 * - NEVER embed API keys in front-end code or client bundles.
 * - For production: implement a secure server route (e.g., POST /api/translate)
 *   that calls Groq privately and returns translation to the browser.
 *
 * BEHAVIOR:
 * - If API key is available → uses Groq model for natural generational translation.
 * - If no API key → uses local lookup map (for offline demos or dev environments).
 */

async function translateText(text, fromGen, toGen) {
  if (!text || !text.trim() || fromGen === toGen) return text.trim();

  fromGen = fromGen.toLowerCase();
  toGen = toGen.toLowerCase();

  // const genStyles = {
  //   genz: "Gen Z slang — compact, emoji-heavy, humor-driven, internet-native tone ",
  //   millennial: "Millennial tone — conversational, pop-culture infused, uses mild humor or memes, occasional emojis.",
  //   boomer: "Boomer tone — formal, respectful, structured sentences, avoids slang or abbreviations."
  // };

  try {
    if (typeof process !== "undefined" && process.env && process.env.GROQ_API_KEY) {
      const Groq = require("groq-sdk");
      const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

      const SYSTEM_PROMPT = (fromGen, toGen) => `
You are a generational translator that rewrites text from the ${fromGen.toUpperCase()} communication style 
into the ${toGen.toUpperCase()} communication style, preserving meaning and emotion.

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
- “Hello, how are you doing today?” → “yo wyd 💀😂”
- “Congratulations on your new job!” → “let’s gooo congrats 🔥👏”

Gen Z → Boomer:
- “ngl that was mid fr 💀” → “Honestly, that was quite average.”

Millennial → Gen Z:
- “Let’s hang out after class.” → “link up fr 🔥💀”

Gen Z → Millennial:
- “bro that was lit 🔥😭” → “That was actually awesome 😂”
`;

      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: SYSTEM_PROMPT(fromGen, toGen) }, // ✅ fix
          { role: "user", content: text }
        ],
        temperature: 0.8,
        max_tokens: 150
      });

      const reply = completion?.choices?.[0]?.message?.content?.trim();
      console.log("LLM Reply:", reply);
      if (reply) return reply;
    }
  } catch (err) {
    console.error("Groq translation failed, falling back:", err.message || err);
  }

  const translationMap = translations[fromGen]?.[toGen];
  if (!translationMap) return text;

  let result = text;
  if (translationMap.patterns) {
    translationMap.patterns.forEach(pattern => {
      result = result.replace(pattern.from, pattern.to);
    });
  }
  if (translationMap.suffix && !result.trim().endsWith(translationMap.suffix)) {
    result = `${result.trim()}${translationMap.suffix}`;
  }

  return result.trim();
}


// -------------------------------------------
// Utility Functions
// -------------------------------------------
/**
 * Converts generation value to human-readable label
 * 
 * @param {string} value - Generation identifier ('millennial', 'genz', or 'boomer')
 * @returns {string} Human-readable label
 */
function getGenerationLabel(value) {
  return GENERATION_LABELS[value] || value;
}

// Export functions for unit testing and external usage.
// When this file is included in a browser via <script>, these exports
// are harmless because they only exist in module contexts.
export { translateText, getGenerationLabel };

/**
 * Updates the generation badge labels in the UI
 * Reflects current selected generations in input/output sections
 */
function updateBadges() {
  const fromGen = elements.fromGenSelect.value;
  const toGen = elements.toGenSelect.value;
  
  elements.inputBadge.textContent = getGenerationLabel(fromGen);
  elements.outputBadge.textContent = getGenerationLabel(toGen);
}

/**
 * Updates the character count display for input text
 * Also manages translate button state based on input presence
 */
function updateCharacterCount() {
  const text = elements.inputText.value;
  elements.inputCount.textContent = text.length;
  
  // Enable translate button only when there's text to translate
  elements.translateBtn.disabled = !text.trim();
}

/**
 * Displays a temporary toast notification
 * Automatically hides after TOAST_DURATION milliseconds
 * 
 * @param {string} message - Message to display in the toast
 * @param {boolean} [isError=false] - Whether this is an error message
 */
function showToast(message, isError) {
  if (isError === undefined) isError = false;
  
  elements.toast.textContent = message;
  elements.toast.classList.remove('hidden', 'hiding');
  
  // Set toast styling based on message type
  if (isError) {
    elements.toast.style.background = 'var(--color-danger)';
    elements.toast.style.color = 'var(--color-text-primary)';
  } else {
    elements.toast.style.background = 'var(--color-amber)';
    elements.toast.style.color = 'var(--color-noir-black)';
  }
  
  // Auto-hide toast after duration
  setTimeout(function() {
    elements.toast.classList.add('hiding');
    setTimeout(function() {
      elements.toast.classList.add('hidden');
      elements.toast.classList.remove('hiding');
    }, TOAST_HIDE_DURATION);
  }, TOAST_DURATION);
}

/**
 * Smoothly scrolls to the translator section
 * Used when loading examples to focus user attention
 */
function scrollToTranslator() {
  const translatorSection = document.querySelector('.translator-section');
  if (translatorSection) {
    translatorSection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }
}

// -------------------------------------------
// Operations for Translation
// -------------------------------------------
/**
 * Performs the translation operation
 * Takes input text and translates it from source to target generation
 * Updates the output display with results
 */
async function performTranslation() {
  const text = elements.inputText.value;
  const fromGen = elements.fromGenSelect.value;
  const toGen = elements.toGenSelect.value;

  // Handle empty input case
  if (!text.trim()) {
    elements.outputText.innerHTML = '<p class="empty-state">Your decoded message will appear here...</p>';
    elements.outputCount.textContent = '0';
    elements.copyBtn.disabled = true;
    elements.translateBtn.disabled = true;
    return;
  }

  // Perform translation (translateText may be async when using server-side Groq)
  try {
    const translated = await translateText(text, fromGen, toGen);
    elements.outputText.textContent = translated;
    elements.outputCount.textContent = translated.length;
    elements.copyBtn.disabled = false;
    showToast('Message decoded! 🔍');
  } catch (err) {
    console.error('Translation failed:', err);
    showToast('Translation failed', true);
  }
}

/**
 * Swaps the source and target generation selections
 * Clears the output as the translation direction has changed
 */

function swapGenerations() {
  const temp = elements.fromGenSelect.value;
  elements.fromGenSelect.value = elements.toGenSelect.value;
  elements.toGenSelect.value = temp;
  
  updateBadges();
  
  // Clear output since translation direction changed
  elements.outputText.innerHTML = '<p class="empty-state">Your decoded message will appear here...</p>';
  elements.outputCount.textContent = '0';
  elements.copyBtn.disabled = true;
}

/**
 * Clears all input and output fields
 * Resets the application to initial state
 */
function clearInput() {
  elements.inputText.value = '';
  elements.outputText.innerHTML = '<p class="empty-state">Your decoded message will appear here...</p>';
  elements.outputCount.textContent = '0';
  elements.inputCount.textContent = '0';
  elements.copyBtn.disabled = true;
  elements.translateBtn.disabled = true;
  elements.inputText.focus();
}

// -------------------------------------------
// Clipboard Operation
// -------------------------------------------
/**
 * Copies the translated output text to the system clipboard
 * Falls back to legacy execCommand for older browsers
 * Provides user feedback via toast notification
 * 
 * @returns {Promise<void>}
 */
function copyToClipboard() {
  const text = elements.outputText.textContent;
  
  // Try modern clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(function() {
        showToast('Copied to clipboard! 📋');
      })
      .catch(function(err) {
        console.error('Clipboard write failed:', err);
        fallbackCopy(text);
      });
  } else {
    // Fallback for older browsers
    fallbackCopy(text);
  }
}

/**
 * Fallback clipboard copy implementation using execCommand
 * Used when modern Clipboard API is not available
 * 
 * @param {string} text - Text to copy to clipboard
 */
function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.select();
  
  try {
    document.execCommand('copy');
    showToast('Copied to clipboard! 📋');
  } catch (err) {
    console.error('Fallback copy failed:', err);
    showToast('Failed to copy text', true);
  }
  
  document.body.removeChild(textArea);
}

// -------------------------------------------
// Example Functionality
// -------------------------------------------
/**
 * Loads a pre-defined example into the input field
 * Sets the appropriate source generation and prepares for translation
 * 
 * @param {string} text - Example text to load
 * @param {string} fromGen - Source generation for the example
 */
function loadExample(text, fromGen) {
  elements.fromGenSelect.value = fromGen;
  elements.inputText.value = text;
  updateBadges();
  updateCharacterCount();
  
  // Clear output - user needs to click translate button
  elements.outputText.innerHTML = '<p class="empty-state">Your decoded message will appear here...</p>';
  elements.outputCount.textContent = '0';
  elements.copyBtn.disabled = true;
  
  // Scroll to translator for better UX
  scrollToTranslator();
}

/**
 * Toggles the visibility of the examples section
 * Updates button text to reflect current state
 */
function toggleExamples() {
  const isHidden = elements.examplesSection.classList.contains('hidden');
  
  if (isHidden) {
    elements.examplesSection.classList.remove('hidden');
    elements.toggleExamplesBtn.textContent = 'Hide Case Examples';
  } else {
    elements.examplesSection.classList.add('hidden');
    elements.toggleExamplesBtn.textContent = 'Show Case Examples';
  }
}

// -------------------------------------------
// Emoji Picker Functionality
// -------------------------------------------
/**
 * Opens the emoji picker modal
 * Sets the target for emoji insertion and loads default category
 * 
 * @param {string} target - Target identifier for emoji insertion ('input')
 */
function openEmojiPicker(target) {
  state.currentEmojiTarget = target;
  elements.emojiPicker.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  
  // Load default emoji category
  loadEmojiCategory('smileys');
}

/**
 * Closes the emoji picker modal
 * Restores body scroll and clears the insertion target
 */
function closeEmojiPicker() {
  elements.emojiPicker.classList.add('hidden');
  document.body.style.overflow = '';
  state.currentEmojiTarget = null;
}

/**
 * Loads and displays emojis for a specific category
 * Renders emoji buttons in the grid and updates active category indicator
 * 
 * @param {string} category - Category name ('smileys', 'gestures', 'objects', 'symbols')
 */
function loadEmojiCategory(category) {
  const emojis = emojiData[category] || [];
  
  // Clear existing emoji grid
  elements.emojiGrid.innerHTML = '';
  
  // Create button for each emoji in category
  emojis.forEach(function(emoji) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'emoji-btn-item';
    button.textContent = emoji;
    button.setAttribute('aria-label', 'Insert ' + emoji);
    
    // Bind click handler for emoji insertion
    button.addEventListener('click', function() {
      insertEmoji(emoji);
    });
    
    elements.emojiGrid.appendChild(button);
  });
  
  // Update active category button styling
  elements.categoryBtns.forEach(function(btn) {
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

/**
 * Inserts an emoji at the current cursor position in the input field
 * Maintains cursor position after insertion and updates character count
 * 
 * @param {string} emoji - Emoji character to insert
 */
function insertEmoji(emoji) {
  if (state.currentEmojiTarget === 'input') {
    const start = elements.inputText.selectionStart;
    const end = elements.inputText.selectionEnd;
    const text = elements.inputText.value;
    
    // Insert emoji at cursor position
    elements.inputText.value = text.substring(0, start) + emoji + text.substring(end);
    
    // Set cursor position after inserted emoji
    const newPosition = start + emoji.length;
    elements.inputText.setSelectionRange(newPosition, newPosition);
    elements.inputText.focus();
    
    updateCharacterCount();
  }
  
  closeEmojiPicker();
}

// -------------------------------------------
// Event Handlers
// -------------------------------------------
/**
 * Handler for generation selection changes
 * Resets output when user changes translation parameters
 */
function handleGenerationChange() {
  updateBadges();
  // Clear output when changing generations - user must re-translate
  elements.outputText.innerHTML = '<p class="empty-state">Your decoded message will appear here...</p>';
  elements.outputCount.textContent = '0';
  elements.copyBtn.disabled = true;
}

/**
 * Handler for example button clicks
 * Extracts example data and loads it into the application
 * 
 * @param {Event} event - Click event
 */
function handleExampleClick(event) {
  const button = event.currentTarget;
  const text = button.dataset.text;
  const fromGen = button.dataset.from;
  
  if (text && fromGen) {
    loadExample(text, fromGen);
  }
}

/**
 * Handler for category button clicks in emoji picker
 * Loads the selected emoji category
 * 
 * @param {Event} event - Click event
 */
function handleCategoryClick(event) {
  const button = event.currentTarget;
  const category = button.dataset.category;
  
  if (category) {
    loadEmojiCategory(category);
  }
}

/**
 * Global keyboard event handler
 * Implements keyboard shortcuts for improved accessibility
 * 
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyboardShortcuts(event) {
  // Escape key: Close emoji picker
  if (event.key === 'Escape' && !elements.emojiPicker.classList.contains('hidden')) {
    closeEmojiPicker();
    return;
  }
  
  // Ctrl/Cmd + K: Open emoji picker (when focused on input)
  if ((event.ctrlKey || event.metaKey) && event.key === 'k' && 
      document.activeElement === elements.inputText) {
    event.preventDefault();
    openEmojiPicker('input');
    return;
  }
  
  // Enter key: Translate (when focused on input with text)
  if (event.key === 'Enter' && 
      document.activeElement === elements.inputText && 
      elements.inputText.value.trim()) {
    event.preventDefault();
    performTranslation();
    return;
  }
}

// -------------------------------------------
// An Event Listener
// -------------------------------------------
/**
 * Registers all event listeners for the application
 */
function registerEventListeners() {
  // Generation selection changes
  elements.fromGenSelect.addEventListener('change', handleGenerationChange);
  elements.toGenSelect.addEventListener('change', handleGenerationChange);
  
  // Main action buttons
  elements.swapButton.addEventListener('click', swapGenerations);
  elements.translateBtn.addEventListener('click', performTranslation);
  elements.copyBtn.addEventListener('click', copyToClipboard);
  elements.clearBtn.addEventListener('click', clearInput);
  
  // Input field changes
  elements.inputText.addEventListener('input', updateCharacterCount);
  
  // Emoji picker controls
  elements.emojiBtn.addEventListener('click', function() {
    openEmojiPicker('input');
  });
  elements.closeEmojiPickerBtn.addEventListener('click', closeEmojiPicker);
  elements.emojiPickerBackdrop.addEventListener('click', closeEmojiPicker);
  
  // Emoji category buttons
  elements.categoryBtns.forEach(function(btn) {
    btn.addEventListener('click', handleCategoryClick);
  });
  
  // Example functionality
  elements.exampleBtns.forEach(function(btn) {
    btn.addEventListener('click', handleExampleClick);
  });
  elements.toggleExamplesBtn.addEventListener('click', toggleExamples);
  
  // Global keyboard shortcuts
  document.addEventListener('keydown', handleKeyboardShortcuts);
}

// -------------------------------------------
// Main Initialization
// -------------------------------------------
/**
 * Initializes the application
 * Sets up initial UI state and registers all event listeners
 * Called when DOM is fully loaded
 */
function initializeApp() {
  // Validate that all required elements exist
  const requiredElements = [
    'fromGenSelect', 'toGenSelect', 'swapButton', 'translateBtn',
    'inputText', 'outputText', 'inputBadge', 'outputBadge',
    'inputCount', 'outputCount', 'copyBtn', 'clearBtn', 'emojiBtn',
    'toggleExamplesBtn', 'examplesSection', 'emojiPicker', 'emojiGrid',
    'closeEmojiPickerBtn', 'emojiPickerBackdrop', 'toast'
  ];
  
  const missingElements = requiredElements.filter(function(key) {
    return !elements[key];
  });
  
  if (missingElements.length > 0) {
    console.error('Missing required DOM elements:', missingElements);
    return;
  }
  
  // Set initial UI state
  updateBadges();
  updateCharacterCount();
  
  // Register all event listeners
  registerEventListeners();
  
  console.log('Generation Translator initialized successfully');
}

// -------------------------------------------
// Entry Point
// -------------------------------------------
/**
 * Entry point - Initialize app when DOM is ready
 * Uses DOMContentLoaded to ensure all elements are available
 */
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    // DOM is already loaded
    initializeApp();
  }
}